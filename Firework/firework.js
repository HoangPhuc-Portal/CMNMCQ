// ==================== ĐIỀU KHIỂN LUỒNG CHƯƠNG TRÌNH ====================
const introSection = document.getElementById("introSection");
const mainSection = document.getElementById("mainSection");
const countdownSection = document.getElementById("countdownSection");
const fireworksSection = document.getElementById("fireworksSection");

const introVideo = document.getElementById("introVideo");
const audioPlayer = document.getElementById("audioPlayer");
const countdownVideo = document.getElementById("countdownVideo");
const fireworkMusic = document.getElementById("fireworkMusic");

// Debug logs
console.log("🎆 Chương trình bắt đầu!");
console.log("📍 Bước 1: Đang phát video giới thiệu...");

// ==================== BƯỚC 1: VIDEO GIỚI THIỆU ====================
introVideo.addEventListener("error", (e) => {
  console.error("❌ Lỗi load video intro:", e);
  alert(
    "⚠️ Không tìm thấy video giới thiệu!\nĐường dẫn: video/2026.mp4\nVui lòng kiểm tra lại file.",
  );
});

introVideo.addEventListener("loadeddata", () => {
  console.log("✅ Video intro đã load thành công");
  console.log("⏱️ Thời lượng video:", introVideo.duration, "giây");
});

introVideo.addEventListener("ended", () => {
  console.log("✅ Video intro đã kết thúc");
  console.log("📍 Bước 2: Chuyển sang phần ảnh nền + carousel + audio");

  introSection.style.display = "none";
  mainSection.style.display = "block";

  setTimeout(() => {
    console.log("🎵 Bắt đầu phát audio...");
    audioPlayer.play().catch((e) => {
      console.error("❌ Lỗi tự động phát audio:", e);
      console.log(
        "ℹ️ Trình duyệt chặn autoplay. Người dùng cần click nút play.",
      );
    });
  }, 500);
});

// ==================== BƯỚC 2: AUDIO CHÚC MỪNG NĂM MỚI ====================
audioPlayer.addEventListener("error", (e) => {
  console.error("❌ Lỗi load audio:", e);
  alert(
    "⚠️ Không tìm thấy file audio!\nĐường dẫn: music/cmnm.mp3\nVui lòng kiểm tra lại file.",
  );
});

audioPlayer.addEventListener("loadeddata", () => {
  console.log("✅ Audio đã load thành công");
  console.log("⏱️ Thời lượng audio:", audioPlayer.duration, "giây");
});

audioPlayer.addEventListener("play", () => {
  console.log("▶️ Audio đang phát...");
});

audioPlayer.addEventListener("ended", () => {
  console.log("✅ Audio đã phát xong");
  console.log("📍 Bước 3: Chuyển sang video đếm ngược");

  mainSection.style.display = "none";
  countdownSection.style.display = "flex";

  setTimeout(() => {
    console.log("⏰ Bắt đầu video đếm ngược...");
    countdownVideo.play().catch((e) => {
      console.error("❌ Lỗi phát video đếm ngược:", e);
    });
  }, 300);
});

// ==================== BƯỚC 3: VIDEO ĐẾM NGƯỢC ====================
countdownVideo.addEventListener("error", (e) => {
  console.error("❌ Lỗi load video đếm ngược:", e);
  alert(
    "⚠️ Không tìm thấy video đếm ngược!\nĐường dẫn: video/dem nguoc.mp4\nVui lòng kiểm tra lại file.",
  );
});

countdownVideo.addEventListener("loadeddata", () => {
  console.log("✅ Video đếm ngược đã load thành công");
  console.log("⏱️ Thời lượng video:", countdownVideo.duration, "giây");
});

countdownVideo.addEventListener("play", () => {
  console.log("▶️ Video đếm ngược đang phát...");
});

countdownVideo.addEventListener("ended", () => {
  console.log("✅ Video đếm ngược đã kết thúc");
  console.log("📍 Bước 4: Bắt đầu pháo hoa! 🎆");

  countdownSection.style.display = "none";
  fireworksSection.style.display = "block";

  // Phát nhạc nền pháo hoa
  setTimeout(() => {
    console.log("🎵 Bắt đầu phát nhạc nền pháo hoa...");
    fireworkMusic.play().catch((e) => {
      console.error("❌ Lỗi phát nhạc nền pháo hoa:", e);
    });
  }, 500);

  startFireworks();
});

// Xử lý lỗi nhạc nền pháo hoa
fireworkMusic.addEventListener("error", (e) => {
  console.error("❌ Lỗi load nhạc nền pháo hoa:", e);
  console.log("ℹ️ Đường dẫn: audio/firework-music.mp3");
});

fireworkMusic.addEventListener("loadeddata", () => {
  console.log("✅ Nhạc nền pháo hoa đã load thành công");
  console.log("⏱️ Thời lượng nhạc:", fireworkMusic.duration, "giây");
});

// ==================== MÃ PHÁO HOA ====================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let trails = [];
let snowflakes = [];
let isPaused = false;
let animationId;
let lastFireworkTime = 0;
let fireworkInterval = 1200;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class SnowFlake {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.drift = Math.random() * 0.5 - 0.25;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y += this.speed;
    this.x += this.drift;

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
  }
}

class Trail {
  constructor(x, y, targetX, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;
    this.speed = 4;
    this.reached = false;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) {
      this.reached = true;
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
  }
}

class Particle {
  constructor(x, y, color, angle, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
    this.speed = speed;
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
    this.alpha = 1;
    this.decay = Math.random() * 0.01 + 0.01;
    this.gravity = 0.1;
    this.friction = 0.97;
    this.size = Math.random() * 3 + 2;
    this.glow = Math.random() * 25 + 15;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.glow;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= this.decay;
  }
}

function createFirework(x, y) {
  const colorSets = [
    ["#FF1744", "#FF4569", "#FF6B8A", "#FFACBC", "#FFFFFF"],
    ["#FFD700", "#FFA500", "#FF8C00", "#FFFF00", "#FFFFFF"],
    ["#00E5FF", "#1E88E5", "#64B5F6", "#90CAF9", "#FFFFFF"],
    ["#00FF00", "#39FF14", "#7FFF00", "#ADFF2F", "#FFFFFF"],
    ["#FF00FF", "#E040FB", "#BA68C8", "#CE93D8", "#FFFFFF"],
    ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#FFFFFF"],
    ["#FFD93D", "#6BCF7F", "#4D96FF", "#FF6B9D", "#FFFFFF"],
  ];

  const colors = colorSets[Math.floor(Math.random() * colorSets.length)];
  const patterns = [
    "circle",
    "heart",
    "star",
    "spiral",
    "concentric",
    "ring",
    "burst",
    "double",
  ];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];

  createPattern(x, y, pattern, colors);
}

function createPattern(x, y, pattern, colors) {
  const particleCount = 200;

  switch (pattern) {
    case "heart":
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 2;
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );
        const angle = Math.atan2(heartY, heartX);
        const speed = Math.random() * 4 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed));
      }
      break;

    case "star":
      const points = 5;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const pointIndex = Math.floor(i / (particleCount / points));
        const isOuter =
          i % (particleCount / points) < particleCount / (points * 2);
        const radius = isOuter ? 1 : 0.5;
        const starAngle = (pointIndex * Math.PI * 2) / points + angle * 0.2;
        const speed = (Math.random() * 3 + 2.5) * radius;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, starAngle, speed));
      }
      break;

    case "spiral":
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 6;
        const radius = t * 0.2;
        const angle = t;
        const speed = Math.random() * 4 + 2.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(
          new Particle(x, y, color, angle, speed * (1 + radius * 0.15)),
        );
      }
      break;

    case "concentric":
      const rings = 5;
      for (let ring = 0; ring < rings; ring++) {
        const ringParticles = Math.floor(particleCount / rings);
        const ringSpeed = 2.5 + ring * 1.2;
        for (let i = 0; i < ringParticles; i++) {
          const angle = (Math.PI * 2 * i) / ringParticles;
          const color = colors[ring % colors.length];
          particles.push(new Particle(x, y, color, angle, ringSpeed));
        }
      }
      break;

    case "ring":
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 2 + 4.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed));
      }
      break;

    case "burst":
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 8 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed));
      }
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 4;
        particles.push(new Particle(x, y, "#FFFFFF", angle, speed));
      }
      break;

    case "double":
      for (let i = 0; i < particleCount / 2; i++) {
        const angle = (Math.PI * 2 * i) / (particleCount / 2);
        const speed1 = Math.random() * 3 + 3;
        const speed2 = Math.random() * 3 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed1));
        particles.push(new Particle(x, y, color, angle, speed2));
      }
      break;

    default:
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 6 + 3.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, angle, speed));
      }
  }
}

function launchFirework() {
  const positions = ["left", "center", "right"];
  const position = positions[Math.floor(Math.random() * positions.length)];

  let startX, targetX;

  switch (position) {
    case "left":
      startX = Math.random() * (canvas.width * 0.2);
      targetX = Math.random() * (canvas.width * 0.35) + canvas.width * 0.1;
      break;
    case "right":
      startX = canvas.width - Math.random() * (canvas.width * 0.2);
      targetX =
        canvas.width -
        Math.random() * (canvas.width * 0.35) -
        canvas.width * 0.1;
      break;
    default:
      startX = canvas.width / 2 + (Math.random() - 0.5) * 200;
      targetX = canvas.width / 2 + (Math.random() - 0.5) * 300;
  }

  const startY = canvas.height;
  const targetY = Math.random() * (canvas.height * 0.4) + 100;

  const trailColors = [
    "#FF1744",
    "#FFD700",
    "#00E5FF",
    "#00FF00",
    "#FF00FF",
    "#FF6B6B",
    "#FFD93D",
    "#FFA500",
  ];
  const color = trailColors[Math.floor(Math.random() * trailColors.length)];

  trails.push(new Trail(startX, startY, targetX, targetY, color));
}

function animate(currentTime) {
  if (isPaused) return;

  ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((snow) => {
    snow.update();
    snow.draw();
  });

  trails = trails.filter((trail) => {
    trail.update();
    trail.draw();

    if (trail.reached) {
      createFirework(trail.targetX, trail.targetY);
      return false;
    }
    return true;
  });

  particles = particles.filter((particle) => {
    particle.update();
    particle.draw();
    return particle.alpha > 0;
  });

  if (currentTime - lastFireworkTime > fireworkInterval) {
    launchFirework();
    lastFireworkTime = currentTime;

    if (Math.random() > 0.7) {
      setTimeout(() => launchFirework(), 200);
    }
  }

  animationId = requestAnimationFrame(animate);
}

function startFireworks() {
  resizeCanvas();

  for (let i = 0; i < 150; i++) {
    snowflakes.push(new SnowFlake());
  }

  setTimeout(() => launchFirework(), 500);
  setTimeout(() => launchFirework(), 1000);
  setTimeout(() => launchFirework(), 1500);

  animate(0);
}

document.getElementById("pauseBtn").addEventListener("click", function () {
  isPaused = !isPaused;
  this.textContent = isPaused ? "▶ Tiếp tục" : "⏸ Tạm dừng";

  // Tạm dừng/tiếp tục cả nhạc nền
  if (isPaused) {
    fireworkMusic.pause();
  } else {
    fireworkMusic.play().catch((e) => console.error("Lỗi phát nhạc:", e));
    animationId = requestAnimationFrame(animate);
  }
});

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  createFirework(x, y);
});

console.log("✅ Script đã load hoàn tất!");
