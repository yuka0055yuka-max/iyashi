const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawScene() {
  ctx.fillStyle = '#001020';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();

  requestAnimationFrame(drawScene);
}

drawScene();

    stone.alpha += stone.flicker;
    if (stone.alpha > 1 || stone.alpha < 0.3) {
      stone.flicker *= -1;
    }
  }

  // シャボン玉（夜のみ）
  if (isNight) {
    for (let bubble of bubbles) {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.alpha})`;
      ctx.strokeStyle = `rgba(255, 255, 255, 0.3)`;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      bubble.y -= bubble.speed;
      if (bubble.y + bubble.radius < 0) {
        bubble.y = canvas.height;
      }
    }
  }

  // 流星群（夜のみ）
  if (isNight) {
    for (let meteor of meteors) {
      ctx.beginPath();
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(meteor.x - meteor.length, meteor.y + meteor.length * 0.5);
      ctx.strokeStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      meteor.x -= meteor.speed;
      meteor.y += meteor.speed * 0
            meteor.y += meteor.speed * 0.5;
      meteor.alpha -= 0.02;
    }
    meteors = meteors.filter(m => m.alpha > 0);
  }

  waveOffset += 1;
  requestAnimationFrame(drawScene);
}

drawScene();

     