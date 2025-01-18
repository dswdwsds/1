// تحديد الزر والقائمة
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

// عند الضغط على الزر
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active'); // إضافة/إزالة تأثير الأنيميشن للزر
    sidebar.classList.toggle('active'); // فتح أو غلق القائمة
});
