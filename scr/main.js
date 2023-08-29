import "./assets/style.css";

import { config } from "./config.js";
import { Player } from "./classes/Player";
import { Projectile } from "./classes/Projectile";
import { Enemy } from "./classes/Enemy";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const player = new Player(centerX, centerY, 30, "blue");
const projectiles = [];
const enemies = [];
let animationId;
let enemyIntervalId;

function spawnEnemies() {
  enemyIntervalId = setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;
    let x, y;

    if (Math.random() > 0.5) {
      x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() > 0.5 ? 0 - radius : canvas.height + radius;
    }

    const color = "green";
    const angle = Math.atan2(centerY - y, centerX - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, [1000]);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(c);

  projectiles.forEach((projectile, index) => {
    projectile.update(c);

    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.width
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    enemy.update(c);
    const distanceBetweenEnemyAndPlayer = Math.hypot(
      player.x - enemy.x,
      player.y - enemy.y
    );

    if (distanceBetweenEnemyAndPlayer - enemy.radius - player.radius < 1) {
      console.log("game over");
      cancelAnimationFrame(animationId);
      clearInterval(enemyIntervalId);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const distanceBetweenProjectileAndEnemy = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );
      if (
        distanceBetweenProjectileAndEnemy - enemy.radius - projectile.radius <
        1
      ) {
        setTimeout(() => {
          enemies.splice(enemyIndex, 1);
          projectiles.splice(projectileIndex, 1);
        }, 0);
      }
    });
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
spawnEnemies();
