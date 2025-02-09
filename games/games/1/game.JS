// اختيار العناصر
const pauseButton = document.querySelector('.control-button.pause');
const resumeButton = document.querySelector('.control-button.resume');
const restartButton = document.querySelector('.control-button.restart');

// متغيرات جديدة لإدارة الحالة
let gamePaused = false;

// وظيفة توقف اللعبة مؤقتًا
function pauseGame() {
    if (!gameRunning) return;
    gamePaused = true;
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'flex';
    cancelAnimationFrame(requestID); // إيقاف حلقة اللعبة
}

// وظيفة استئناف اللعبة
function resumeGame() {
    if (!gameRunning) return;
    gamePaused = false;
    pauseButton.style.display = 'flex';
    resumeButton.style.display = 'none';
    gameLoop(); // استئناف حلقة اللعبة
}

// وظيفة إعادة تشغيل اللعبة
function restartGame() {
    endScreen.style.display = 'none';
    startGame(); // إعادة تشغيل اللعبة
}

// تعديل حلقة اللعبة لتشمل الحالة المؤقتة
let requestID; // لمعرفة الرسم الحالي
function gameLoop() {
    if (gamePaused || !gameRunning) return;
    requestID = requestAnimationFrame(gameLoop);

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
}

// ضبط الشاشة في وضع العرض
function adjustCanvasForLandscape() {
    if (window.innerHeight > window.innerWidth) {
        canvas.width = window.innerHeight;
        canvas.height = window.innerWidth;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

adjustCanvasForLandscape();
window.addEventListener('resize', adjustCanvasForLandscape);