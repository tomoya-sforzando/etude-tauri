// Import styles.
import 'vidstack/player/styles/default/theme.css';
// Register elements.
import 'vidstack/player';
import 'vidstack/player/ui';
import 'vidstack/icons';

import styles from './player.module.css';

import { createEffect, createSignal, Match, onCleanup, onMount, Switch } from 'solid-js';
// import {
//   isHLSProvider,
//   type MediaCanPlayEvent,
//   type MediaProviderChangeEvent,
//   type MediaViewType,
// } from 'vidstack';
import type { MediaPlayerElement } from 'vidstack/elements';
// import { usePlayer } from './controller';

// import { AudioLayout } from './components/layouts/audio-layout';
// import { VideoLayout } from './components/layouts/video-layout';
// import { textTracks } from './tracks';

// import { desktopDir, join } from '@tauri-apps/api/path';
// import { convertFileSrc } from '@tauri-apps/api/core';
// import { setProperty } from 'solid-js/web';

// const desktopPath = await desktopDir();
// const filePath = await join(desktopPath, 'videos/20190825_183910.mp4');
// const videoUrl = convertFileSrc(filePath);


export function Player(props: { videoURL: any; position: any; isLast: boolean, paused: boolean}) {
  let player!: MediaPlayerElement,
    [src, setSrc] = createSignal('');
  let [position, setPosition] = createSignal({});
  // let [isPaused, setPaused] = createSignal(true);
    // [viewType, setViewType] = createSignal<MediaViewType>('unknown');

  // const [paused, {pause}] = usePlayer();
  // Initialize src.
  // changeSource('audio');

  // let url = ""

  onMount(async () => {
    console.log(props.videoURL);
    // const filePath = await join(desktopPath, props.videoURL);
    // setSrc(convertFileSrc(filePath))
    setSrc(props.videoURL);

    console.log(props.position);
    setPosition(props.position);

    // player.play();

    /**
     * You can add these tracks using HTML as well.
     *
     * @example
     * ```html
     * <media-provider>
     *   <track label="..." src="..." kind="..." srclang="..." default />
     *   <track label="..." src="..." kind="..." srclang="..." />
     * </media-provider>
     * ```
     */
    // for (const track of textTracks) player.textTracks.add(track);

    // onCleanup(
    //   // Subscribe to state updates.
    //   player.subscribe((state) => {
    //     setViewType(state.viewType);
    //     // console.log('is paused?', '->', state.paused);
    //     // console.log('is audio view?', '->', state.viewType === 'audio');
    //   }),
    // );
  });

  // createEffect( () => {
  //   console.log("effect")
  //   player.play();
  // })

  // function onProviderChange(event: MediaProviderChangeEvent) {
  //   const provider = event.detail;
  //   // We can configure provider's here.
  //   if (isHLSProvider(provider)) {
  //     provider.config = {};
  //   }
  // }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay(event: MediaCanPlayEvent) {
    // ...
    // if(!props.paused) {
    //   player.play();
    // }

  }

  // function changeSource(type: string) {
  //   switch (type) {
  //     case 'audio':
  //       setSrc('https://files.vidstack.io/sprite-fight/audio.mp3');
  //       break;
  //     case 'video':
  //       setSrc(url);
  //       // setSrc(src());
  //       // player.play()
  //       // setSrc('https://files.vidstack.io/sprite-fight/720p.mp4');
  //       break;
  //     case 'hls':
  //       setSrc('https://files.vidstack.io/sprite-fight/hls/stream.m3u8');
  //       break;
  //     case 'youtube':
  //       setSrc('youtube/_cMxraX_5RE');
  //       break;
  //     case 'vimeo':
  //       setSrc('vimeo/640499893');
  //       break;
  //   }
  // }


  // player.addEventListener('ended', () => {
  //   if (props.isLast) {
  //     pause
  //   }
  // });

  return (
    <>
      <media-player
        class={styles.player}
        style={position()}
        // title="Sprite Fight"
        src={src()}
        // crossOrigin
        // playsInline
        // on:provider-change={onProviderChange}
        on:can-play={onCanPlay}
        ref={player}
        // autoPlay
      >
        <media-provider>
        </media-provider>
        {/* <media-provider>
          <media-poster
            class="vds-poster"
            src="https://files.vidstack.io/sprite-fight/poster.webp"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
        </media-provider> */}

        {/* Layouts */}
        {/* <Switch>
          <Match when={viewType() === 'audio'}>
            <AudioLayout />
          </Match>
          <Match when={viewType() === 'video'}> */}
            {/* <VideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" /> */}
          {/* </Match>
        </Switch> */}
      </media-player>

      {/* <div class={styles.srcButtons}>
        <button onClick={() => changeSource('audio')}>Audio</button>
        <button onClick={() => changeSource('video')}>Video</button>
        <button onClick={() => changeSource('hls')}>HLS</button>
        <button onClick={() => changeSource('youtube')}>YouTube</button>
        <button onClick={() => changeSource('Vimeo')}>Vimeo</button>
      </div> */}
    </>
  );
}