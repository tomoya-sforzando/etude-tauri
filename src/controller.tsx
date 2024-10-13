import { createSignal, createContext, useContext } from "solid-js";

const PlayerContext = createContext();

export function PlayerProvider(props) {
  const [paused, setPaused] = createSignal(props.paused || false),
    store = [
      paused,
      {
        pause() {
          setPaused(true);
        }
      }
    ];

  return (
    <PlayerContext.Provider value={store}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() { return useContext(PlayerContext); }