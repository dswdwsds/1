document.addEventListener('DOMContentLoaded', function () {
    // تحديد الزر والقائمة
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    // تحقق من وجود العناصر قبل إضافة الحدث
    if (menuBtn && sidebar) {
        // عند الضغط على الزر
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active'); // فتح أو غلق القائمة
        });
    }
});
