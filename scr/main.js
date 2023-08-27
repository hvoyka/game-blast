import "./assets/style.css";

import { config } from "./config.js";
import { Player } from "./classes/Player";
import { Projectile } from "./classes/Projectile";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const player = new Player(centerX, centerY, 30, "blue");

const projectiles = [];

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(c);
  projectiles.forEach((projectile) => {
    projectile.update(c);
  });
}

addEventListener("click", (event) => {
  const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
  const projectile = new Projectile(centerX, centerY, 5, "red", velocity);
  projectiles.push(projectile);
});

animate();
