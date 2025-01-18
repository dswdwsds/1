// وظيفة للتحقق من وجود الزر
function initializeMenuButton() {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    if (menuBtn && sidebar) {
        // إضافة حدث عند الضغط على الزر
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active'); // فتح أو غلق القائمة
        });
        console.log("تم العثور على الزر وتفعيله.");
    } else {
        console.log("لم يتم العثور على الزر. سيتم المحاولة مرة أخرى بعد 5 ثوانٍ...");
        setTimeout(initializeMenuButton, 5000); // المحاولة مرة أخرى بعد 5 ثوانٍ
    }
}

// استدعاء الوظيفة لأول مرة
initializeMenuButton();
