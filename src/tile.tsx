import { createEffect, createSignal, For, onMount } from "solid-js";
import { Player } from "./player";

import { desktopDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/core';
import { readDir, watch, BaseDirectory } from "@tauri-apps/plugin-fs";
import type { MediaPlayerElement } from 'vidstack/elements';
import { PlayerProvider } from "./controller";

const desktopPath = await desktopDir();

export function Tile() {
    const [videos, setVideos] = createSignal([''])
    const gridLayout = [[1, 1], [2, 1], [6, 4], [10, 6]];
    const [numVideo, setNumVideo] = createSignal([0]);
    const [styleContainer, setStyleContainer] = createSignal([{}]);
    const [styleVideoPosition, setStyleVideoPosition] = createSignal([[{}]]);
    const [scene, setScene] = createSignal(2);

    let player: MediaPlayerElement;
    const videoTime = 20 * 1000; // ms

    const muteEnabled = false; // default: false
  
    const delayEnabled = true;
    const delayTime = 1750; // default: 2000ms
    const transitionTime = 3000; // Copy value to style `transition: opacity 3000ms`

    const [paused, setPaused] = createSignal([true]);

    async function getVideoUrls() {
        const entries = await readDir('videos', { baseDir: BaseDirectory.Desktop });
        const videoPaths = []
        for (let index = 0; index < entries.length; index++) {
            if (entries[index].name.endsWith(".mp4")) {
                console.log(entries[index].name);
                videoPaths.push(convertFileSrc(await join(desktopPath, 'videos/' + entries[index].name)))
            }
        }
        videoPaths.sort((a,b) => (a > b ? -1 : 1));
        console.log(videoPaths.slice(0, numVideo()[scene()]))
        setVideos(videoPaths.slice(0, numVideo()[scene()]))
    }

    async function setGridLayout() {
        await updateNumVideo();
        await updateStyleContainer();
        await updateStyleVideoPosition();
    }

    async function updateNumVideo() {
        let numVideo = gridLayout.map( (item) => item[0] * item[1]);
        console.log("numVideo", numVideo);
        setNumVideo(numVideo);
    };

    async function updateStyleContainer() {
        // Set video size
        let styleContainer = []
        for (const colRow of gridLayout) {
          let rectSize: number;
          let unit: string;
          if (
            window.parent.screen.width / colRow[0] <
            window.parent.screen.height / colRow[1]
          ) {
            rectSize = Math.floor((100 / colRow[0]) * 10) / 10;
            unit = 'vw';
          } else {
            rectSize = Math.floor((100 / colRow[1]) * 10) / 10;
            unit = 'vh';
          }

          styleContainer.push({
            'grid-template-columns':
              `${rectSize}${unit}` + ` ${rectSize}${unit}`.repeat(colRow[0] - 1),
            'grid-template-rows':
              `${rectSize}${unit}` + ` ${rectSize}${unit}`.repeat(colRow[1] - 1),
          });
        }
        setStyleContainer(styleContainer)
        console.log("styleContainer", styleContainer)
    }

    async function updateStyleVideoPosition() {
        // Set video position
        let styleVideoPosition = [];
        for (const colRow of gridLayout) {
          const tmpArray = [];
          for (let i = 1; i < colRow[1] + 1; i++) {
            for (let j = 1; j < colRow[0] + 1; j++) {
              tmpArray.push({
                'grid-column': j,
                'grid-row': i,
              });
            }
          }
          styleVideoPosition.push(tmpArray);
        }
        setStyleVideoPosition(styleVideoPosition)
        console.log("styleVideoPosition", styleVideoPosition)
    }

    function updateScene(isNew: boolean): void {
        if (isNew) {
            setScene(0);
        } else if (scene() === gridLayout.length - 1) {
            setScene(1);
        } else {
            setScene(scene() + 1);
        }
    }

    function playVideo() {
        console.log('playVideo');
        let tmpPaused = []
        for (let i = 0; i < numVideo()[scene()]; i++) {
          if (delayEnabled && numVideo()[scene()] > 24) { //24
            setInterval(() => {
                tmpPaused.push(false);
                console.log(tmpPaused)
                setPaused(tmpPaused);
            }, i * delayTime);
        //   } else {
        //     setPaused([false, false, false, false, false]);
          }
        }
    }

    let tmpPaused = [false];
    let videoNum = 0;
    setInterval(() => {
        if (tmpPaused.length < numVideo()[scene()]){
            tmpPaused.push(false);
            console.log(tmpPaused)
            setPaused(tmpPaused);
            videoNum++;
        } else {
            updateScene(false);
            tmpPaused = []
        }
        // setPaused(tmpPaused);
    }, (videoNum + 1) * delayTime);



    setGridLayout();

    onMount(async () => {
        getVideoUrls();
    });

    watch("videos", (event) => {
        console.log("file changed.", event);
        getVideoUrls();
        updateScene(true);
    }, {baseDir: BaseDirectory.Desktop});

    return (
        <div class="container" style={styleContainer()[scene()]}>
            <PlayerProvider paused={false}>
                <For each={videos()}>
                    {
                        (videoUrl, index) => <Player videoURL={videoUrl} position={styleVideoPosition()[scene()][index()]} isLast={false} paused={paused()[index()]}/>
                    }
                </For>
            </PlayerProvider>
        </div>
    )
}