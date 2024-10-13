import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Player } from './player';
import { Tile } from "./tile";
import { Window } from "@tauri-apps/api/window";

function App() {
  return (
    <Tile />
  );
}

export default App;
