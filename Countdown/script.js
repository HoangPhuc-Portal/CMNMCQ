// ==================== QUẢN LÝ NHẠC NỀN ====================
const bgMusic = document.getElementById("backgroundMusic");
const musicControl = document.getElementById("musicControl");
let isMusicPlaying = false;

// Thiết lập âm lượng
bgMusic.volume = 0.8;

// Xử lý lỗi load nhạc
bgMusic.addEventListener("error", (e) => {
  console.error("❌ Lỗi load nhạc nền:", e);
  console.log(
    "Không thể tải file nhạc. Vui lòng kiểm tra đường dẫn: audio/nhac-nen.mp3",
  );
  musicControl.style.display = "none"; // Ẩn nút điều khiển nếu không có nhạc
});

bgMusic.addEventListener("loadeddata", () => {
  console.log("✅ Nhạc nền đã load thành công");
  console.log("⏱️ Thời lượng nhạc:", bgMusic.duration, "giây");
});

// Hàm phát nhạc (cần tương tác người dùng)
function playMusic() {
  bgMusic
    .play()
    .then(() => {
      isMusicPlaying = true;
      musicControl.textContent = "🔊";
      musicControl.classList.remove("muted");
      console.log("🎵 Nhạc đang phát");
    })
    .catch((error) => {
      console.log("⚠️ Nhạc cần tương tác người dùng để phát:", error);
    });
}

// Hàm tắt nhạc
function pauseMusic() {
  bgMusic.pause();
  isMusicPlaying = false;
  musicControl.textContent = "🔇";
  musicControl.classList.add("muted");
  console.log("🔇 Nhạc đã tắt");
}

// Xử lý nút điều khiển nhạc
musicControl.addEventListener("click", () => {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

// Tự động phát nhạc khi trang load (cần tương tác người dùng)
window.addEventListener("load", () => {
  // Thử phát nhạc tự động
  playMusic();

  // Nếu không phát được, thêm listener cho lần click đầu tiên
  const startMusicOnInteraction = () => {
    if (!isMusicPlaying) {
      playMusic();
    }
    document.removeEventListener("click", startMusicOnInteraction);
  };

  document.addEventListener("click", startMusicOnInteraction);
});

// ==================== TẠO HIỆU ỨNG SAO NHẤP NHÁY ====================
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 200; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 2 + "s";
  starsContainer.appendChild(star);
}

// ==================== TẠO HIỆU ỨNG PARTICLES ====================
const particlesContainer = document.getElementById("particles");
const particleColors = ["gold", "red", "white"];

function createParticle() {
  const particle = document.createElement("div");
  particle.className =
    "particle " +
    particleColors[Math.floor(Math.random() * particleColors.length)];

  const size = Math.random() * 15 + 5;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  particle.style.setProperty("--x-move", (Math.random() - 0.5) * 200 + "px");
  particle.style.animationDuration = Math.random() * 2 + 2 + "s";

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 4000);
}

setInterval(createParticle, 100);

// ==================== HIỆU ỨNG TUYẾT RƠI ====================
const snowContainer = document.getElementById("snow");

function createSnow() {
  const snow = document.createElement("div");
  snow.className = "snow";
  snow.style.left = Math.random() * 100 + "%";
  snow.style.setProperty("--x-move", (Math.random() - 0.5) * 100 + "px");
  snow.style.animationDuration = Math.random() * 3 + 4 + "s";
  snow.style.animationDelay = Math.random() * 2 + "s";

  snowContainer.appendChild(snow);

  setTimeout(() => {
    snow.remove();
  }, 6000);
}

setInterval(createSnow, 200);

// ==================== MƯA ẢNH ====================
const imageRainContainer = document.getElementById("imageRain");
// Đường dẫn ảnh - bạn có thể thay đổi theo ảnh của bạn
const images = [
  "../img/q1.jpg",
  "../img/q2.jpg",
  "../img/q3.jpg",
  "../img/q4.jpg",
  "../img/q5.jpg",
];

function createFallingImage() {
  const img = document.createElement("img");
  img.className = "falling-image";
  img.src = images[Math.floor(Math.random() * images.length)];

  // Xử lý lỗi nếu ảnh không load được
  img.onerror = function () {
    this.style.display = "none";
  };

  img.style.left = Math.random() * 100 + "%";
  img.style.setProperty("--x-drift", (Math.random() - 0.5) * 100 + "px");
  img.style.setProperty("--rotate-angle", Math.random() * 360 + "deg");
  img.style.animationDuration = Math.random() * 4 + 6 + "s";
  img.style.animationDelay = Math.random() * 2 + "s";

  imageRainContainer.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 10000);
}

setInterval(createFallingImage, 1500);

// ==================== ĐẾM NGƯỢC ====================
let count = 3;
const countdownNumber = document.getElementById("countdownNumber");
const countdownContainer = document.getElementById("countdownContainer");
const card1 = document.getElementById("card1");
const particles = document.getElementById("particles");
const snow = document.getElementById("snow");

// Bắt đầu đếm ngược ngay khi trang load
window.addEventListener("load", () => {
  countdownContainer.style.display = "block";
  startCountdown();
});

function startCountdown() {
  const countdownInterval = setInterval(() => {
    if (count > 1) {
      countdownNumber.classList.add("fade-out");

      setTimeout(() => {
        count--;
        countdownNumber.textContent = count;
        countdownNumber.classList.remove("fade-out");
        countdownNumber.style.animation = "none";
        setTimeout(() => {
          countdownNumber.style.animation = "scaleIn 1s ease-out";
        }, 10);
      }, 500);
    } else {
      clearInterval(countdownInterval);
      setTimeout(() => {
        countdownNumber.classList.add("fade-out");
        setTimeout(() => {
          countdownNumber.textContent = "GO! 🎉";
          countdownNumber.classList.remove("fade-out");
          countdownNumber.style.fontSize = "150px";
          countdownNumber.style.animation = "scaleIn 1s ease-out";

          setTimeout(() => {
            countdownContainer.style.opacity = "0";
            particles.style.opacity = "0.3";
            snow.style.opacity = "0.3";

            setTimeout(() => {
              countdownContainer.style.display = "none";
              card1.classList.add("show");
            }, 1000);
          }, 1500);
        }, 500);
      }, 1000);
    }
  }, 1500);
}

// ==================== CHUYỂN THIỆP ====================
let currentCard = 1;
const totalCards = 7;

function showNextCard() {
  const current = document.getElementById(`card${currentCard}`);
  const next = document.getElementById(`card${currentCard + 1}`);

  if (!next) {
    return;
  }

  current.classList.add("flip-out");

  setTimeout(() => {
    current.classList.remove("show", "flip-out");
    currentCard++;

    next.classList.add("show", "flip-in");

    setTimeout(() => {
      next.classList.remove("flip-in");
    }, 800);
  }, 800);
}

// ==================== KẾT THÚC - CHUYỂN TRANG ====================
function finishJourney() {
  const card7 = document.getElementById("card7");

  card7.classList.add("flip-out");

  setTimeout(() => {
    // Thay đổi đường dẫn này theo trang bạn muốn chuyển đến
    window.location.href = "../Firework/firework.html";
  }, 800);
}
