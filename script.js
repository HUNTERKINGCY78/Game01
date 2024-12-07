const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Ukuran canvas
canvas.width = 800;
canvas.height = 400;

// Warna blok dan pemain
const colors = {
  grass: '#228B22',
  dirt: '#8B4513',
  player: '#FFD700',
};

// Ukuran grid
const gridSize = 40;
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

// Simpan peta game
let map = [];

// Buat peta game awal
function generateMap() {
  for (let y = 0; y < rows; y++) {
    map[y] = [];
    for (let x = 0; x < cols; x++) {
      map[y][x] = y > 6 ? 'dirt' : 'grass'; // Grass di atas, dirt di bawah
    }
  }
}

// Gambar peta
function drawMap() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = colors[map[y][x]];
      ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
}

// Posisi pemain
let player = { x: 5, y: 5 };

// Gambar pemain
function drawPlayer() {
  ctx.fillStyle = colors.player;
  ctx.fillRect(player.x * gridSize, player.y * gridSize, gridSize, gridSize);
}

// Gerakan pemain
function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  // Pastikan pemain tidak keluar dari peta
  if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
    player.x = newX;
    player.y = newY;
  }
}

// Input keyboard
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      movePlayer(0, -1);
      break;
    case 'ArrowDown':
      movePlayer(0, 1);
      break;
    case 'ArrowLeft':
      movePlayer(-1, 0);
      break;
    case 'ArrowRight':
      movePlayer(1, 0);
      break;
  }
});

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

// Jalankan game
generateMap();
gameLoop();
