document.addEventListener('DOMContentLoaded', function () {
    // عناصر التحكم
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', function () {
            // التحقق من الوضع الحالي بناءً على وجود "dark-mode" في `body`
            if (document.body.classList.contains('dark-mode')) {
                // تغيير إلى الوضع الفاتح
                themeIcon.setAttribute('d', "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"); // أيقونة الشمس
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
            } else {
                // تغيير إلى الوضع المظلم
                themeIcon.setAttribute('d', "M12 2C7.03 2 3 6.03 3 12s4.03 10 9 10 9-4.03 9-10-4.03-10-9-10z"); // أيقونة القمر
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
            }
        });
    }
});
