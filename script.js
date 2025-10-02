const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let isNight = true;
let hue = 0;
let waveOffset = 0;
let meteors = [];

canvas.addEventListener('click', () => { isNight = !isNight });

const stars = Array.from({ length: 200 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height * 0.5,
  size: Math.random() * 1.5 + 0.5
}));

const sirius = { x: canvas.width * 0.7, y: canvas.height * 0.2, size: 4 };

const gemini = [
  { x: canvas.width * 0.3, y: canvas.height * 0.15 },
  { x: canvas.width * 0.32, y: canvas.height * 0.18 },
  { x: canvas.width * 0.34, y: canvas.height * 0.22 },
  { x: canvas.width * 0.36, y: canvas.height * 0.26 },
  { x: canvas.width * 0.38, y: canvas.height * 0.30 }
];

const clouds = Array.from({ length: 5 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height * 0.4,
  size: Math.random() * 40 + 60,
  speed: Math.random() * 0.5 + 0.2
}));

const bubbles = Array.from({ length: 15 }, () => ({
  x: Math.random() * canvas.width,
  y: canvas.height * 0.5 + Math.random() * canvas.height * 0.5,
  radius: Math.random() * 7 + 5,
  speed: Math.random() * 0.3 + 0.1,
  alpha: Math.random() * 0.3 + 0.2
}));

const starStones = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: canvas.height * 0.5 + Math.random() * canvas.height * 0.5,
  radius: Math.random() * 2 + 1,
  alpha: Math.random() * 0.5 + 0.3,
  flicker: Math.random() * 0.05 + 0.01
}));

function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    length: Math.random() * 100 + 50,
    speed: Math.random() * 4 + 2,
    alpha: 1
  });
}

setInterval(() => {
  if (isNight) spawnMeteor();
}, 1000);

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景
  ctx.fillStyle = isNight ? '#001020' : '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 太陽 or 月
  if (!isNight) {
    ctx.beginPath();
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 150, 1)';
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(canvas.width * 0.2, canvas.height * 0.2, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }

  // 雲（昼のみ）
  if (!isNight) {
    for (let cloud of clouds) {
      ctx.beginPath();
      ctx.ellipse(cloud.x, cloud.y, cloud.size, cloud.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
      cloud.x += cloud.speed;
      if (cloud.x - cloud.size > canvas.width) {
        cloud.x = -cloud.size;
        cloud.y = Math.random() * canvas.height * 0.4;
      }
    }
  }

  // 星（夜のみ）
  if (isNight) {
    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue}, 100%, 80%)`;
      ctx.fill();
    }
    hue = (hue + 0.5) % 360;

    // シリウス
    ctx.beginPath();
    ctx.arc(sirius.x, sirius.y, sirius.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 双子座
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < gemini.length; i++) {
      ctx.lineTo(gemini[i].x, gemini[i].y);
      ctx.beginPath();
      ctx.arc(gemini[i].x, gemini[i].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
    ctx.stroke();
  }

  // 海のグラデーション
  const seaGradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
  seaGradient.addColorStop(0, isNight ? '#003355' : '#00aaff');
  seaGradient.addColorStop(0.5, isNight ? '#001f3f' : '#0077aa');
  seaGradient.addColorStop(1, isNight ? '#000814' : '#003355');
  ctx.fillStyle = seaGradient;
  ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

  // 波
  ctx.beginPath();
  const waveHeight = 16;
  const waveLength = 80;
  ctx.moveTo(0, canvas.height * 0.5);
  for (let x = 0; x <= canvas.width; x += 5) {
    const y = canvas.height * 0.5 + Math.sin((x + waveOffset) / waveLength) * waveHeight;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();

  // 星石（昼夜共通）
  for (let stone of starStones) {
    ctx.beginPath();
    ctx.arc(stone.x, stone.y, stone.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${stone.alpha})`;
    ctx.fill();
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