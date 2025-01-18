// تحديد الزر والقائمة
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

// عند الضغط على الزر
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active'); // فتح أو غلق القائمة
});