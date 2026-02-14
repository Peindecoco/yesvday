const envelope = document.getElementById("envelope");
const envelopeStage = document.getElementById("envelopeStage");
const flowerStage = document.getElementById("flowerStage");
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let pieces = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeConfetti(amount = 220) {
  const colors = ["#ff4f87", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ffffff"];
  pieces = Array.from({ length: amount }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height,
    size: 5 + Math.random() * 8,
    speedY: 1.8 + Math.random() * 4,
    speedX: -2 + Math.random() * 4,
    tilt: Math.random() * Math.PI,
    spin: 0.02 + Math.random() * 0.08,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.tilt += piece.spin;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(Math.sin(piece.tilt));
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
    ctx.restore();
  });

  pieces = pieces.filter((piece) => piece.y < canvas.height + 30);

  if (pieces.length > 0) {
    animationFrame = requestAnimationFrame(drawConfetti);
  } else {
    cancelAnimationFrame(animationFrame);
  }
}

function revealMessage() {
  envelopeStage.classList.add("hidden");
  setTimeout(() => {
    envelopeStage.classList.add("collapsed");
  }, 520);
  setTimeout(() => {
    flowerStage.classList.remove("hidden");
  }, 480);
}

envelope.addEventListener("click", () => {
  if (envelope.classList.contains("open")) return;

  envelope.classList.add("open");
  makeConfetti();
  drawConfetti();
  setTimeout(revealMessage, 900);
});

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
