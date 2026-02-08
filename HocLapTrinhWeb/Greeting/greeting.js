// Tạo các ngôi sao
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 30; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

// Tạo các trái tim bay
const heartsContainer = document.getElementById("hearts");
const heartEmojis = ["💕", "💖", "💗", "💓", "💝", "🌸", "🌺", "🎀"];

setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = Math.random() * 3 + 5 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}, 1000);

// Tạo các cánh hoa rơi
const petalsContainer = document.getElementById("petals");
const petalEmojis = ["🌸", "🌺", "🌼", "🌻"];

setInterval(() => {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.textContent =
    petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration = Math.random() * 5 + 8 + "s";
  petalsContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 10000);
}, 1500);

// Thêm hiệu ứng cho các ảnh xung quanh
const surroundImages = document.querySelectorAll(".surround-img");

surroundImages.forEach((img, index) => {
  // Thêm hiệu ứng lắc nhẹ liên tục
  setInterval(
    () => {
      img.style.animation = "none";
      setTimeout(() => {
        img.style.animation = "";
      }, 10);
    },
    5000 + index * 500,
  );
});

// Xử lý sự kiện
const giftBtn = document.getElementById("giftBtn");
const continueBtn = document.getElementById("continueBtn");

// Sự kiện click vào hộp quà
giftBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  giftBtn.style.transform = "scale(0.8) rotate(10deg)";
  setTimeout(() => {
    giftBtn.style.display = "none";
    continueBtn.style.display = "block";
  }, 500);
});

// Sự kiện click vào nút tiếp tục
continueBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  window.location.href = "../Countdown/countdown.html";
});

// Thiết lập âm lượng nhạc nền
const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.3;
