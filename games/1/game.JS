// اختيار العناصر
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const endScreen = document.getElementById('endScreen');
const finalScoreElement = document.getElementById('finalScore');

// ضبط حجم الشاشة
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// متغيرات اللعبة
let player = { x: 50, y: canvas.height - 150, width: 50, height: 50, color: 'blue', speed: 10 };
let obstacles = [];
let obstacleSpeed = 5; // السرعة الأساسية للعقبات
let score = 0;
let gameRunning = false;

// متغيرات التحكم المستمر
let movingLeft = false;
let movingRight = false;

// رسم اللاعب
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// رسم العقبات
function drawObstacles() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }
}

// تحديث العقبات
function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].y > canvas.height) {
            // إزالة العقبة إذا خرجت من الشاشة
            obstacles.splice(i, 1);
            i--; // تصحيح المؤشر بعد الحذف
            score++;
        } else {
            // لتحريك العقبة نحو الأسفل
            obstacles[i].y += obstacleSpeed;

            // اكتشاف التصادم
            if (
                player.x < obstacles[i].x + obstacles[i].width &&
                player.x + player.width > obstacles[i].x &&
                player.y < obstacles[i].y + obstacles[i].height &&
                player.y + player.height > obstacles[i].y
            ) {
                endGame();
            }
        }
    }
}

// إنشاء عقبة جديدة
function createObstacle() {
    let width = Math.random() * 100 + 50;
    let x = Math.random() * (canvas.width - width);
    obstacles.push({ x: x, y: -50, width: width, height: 50 });
}

// عرض النتيجة
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`النقاط: ${score}`, 10, 30);
}

// إنهاء اللعبة
function endGame() {
    gameRunning = false;
    finalScoreElement.textContent = score;
    endScreen.style.display = 'flex';
}

// بدء اللعبة
function startGame() {
    startScreen.style.display = 'none';
    gameRunning = true;
    score = 0;
    obstacles = [];
    player.x = 50; // إعادة تعيين موقع اللاعب إلى نقطة البداية
    obstacleSpeed = 5; // إعادة تعيين سرعة العقبات
    gameLoop();
}

// إعادة تشغيل اللعبة
function restartGame() {
    endScreen.style.display = 'none';
    startGame(); // إعادة تشغيل اللعبة
}

// تحريك اللاعب إلى اليسار
function moveLeft() {
    if (!gameRunning) return;
    if (player.x > 0) {
        player.x -= player.speed;
    }
}

// تحريك اللاعب إلى اليمين
function moveRight() {
    if (!gameRunning) return;
    if (player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

// بدء التحرك المستمر إلى اليسار
function startMoveLeft() {
    movingLeft = true;
}

// بدء التحرك المستمر إلى اليمين
function startMoveRight() {
    movingRight = true;
}

// إيقاف التحكم المستمر
function stopMove() {
    movingLeft = false;
    movingRight = false;
}

// حلقة اللعبة
function gameLoop() {
    if (!gameRunning) return;

    // زيادة صعوبة اللعبة مع مرور الوقت (بطئ)
    obstacleSpeed = 5 + Math.floor(score / 20); // زيادة السرعة كل 20 نقطة
    const obstacleProbability = 0.02 + score * 0.0005; // زيادة احتمالية ظهور العقبات ببطء

    // التحكم المستمر
    if (movingLeft) moveLeft();
    if (movingRight) moveRight();

    // مسح الشاشة
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // الرسم
    drawPlayer();
    drawObstacles();
    drawScore();

    // التحديث
    updateObstacles();

    // إنشاء عقبة جديدة بشكل دوري
    if (Math.random() < obstacleProbability) {
        createObstacle();
    }

    requestAnimationFrame(gameLoop);
}

// إضافة مستمع للأحداث
document.addEventListener('keydown', function (e) {
    if (!gameRunning) return;
    if (e.key === 'ArrowRight') movingRight = true;
    else if (e.key === 'ArrowLeft') movingLeft = true;
});

document.addEventListener('keyup', function () {
    movingLeft = false;
    movingRight = false;
});

// دعم اللمس للهواتف المحمولة
canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;

    if (touchX < canvas.width / 2) {
        startMoveLeft();
    } else {
        startMoveRight();
    }
});

canvas.addEventListener('touchend', function () {
    stopMove();
});