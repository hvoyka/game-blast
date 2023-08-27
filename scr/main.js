import "./assets/style.css";

import { config } from "./config.js";
import { Player } from "./classes/Player";
import { Projectile } from "./classes/Projectile";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const playerX = canvas.width / 2;
const playerY = canvas.height / 2;

const player = new Player(playerX, playerY, 30, "blue");

console.log("player ", player);

player.draw(c);

addEventListener("click", (event) => {
  const projectile = new Projectile(
    event.offsetX,
    event.offsetY,
    5,
    "red",
    null
  );
  projectile.draw(c);
});
