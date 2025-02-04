// وظيفة للتحقق من وجود العناصر وإعادة المحاولة إذا لزم الأمر
function initializeElements() {
// عنصر تبديل الثيم
const themeToggle = document.getElementById('themeToggle');

// التحقق من وجود الثيم المحفوظ عند تحميل الصفحة
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
} else {
    console.log("لم يتم العثور على themeToggle. سيتم المحاولة مرة أخرى بعد 5 ثوانٍ...");
    setTimeout(initializeElements, 1000); // إعادة المحاولة بعد 5 ثوانٍ
}


    // عنصر البحث
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            let query = this.value.toLowerCase();
            console.log('بحث عن: ', query);
        });
    } else {
        console.log("لم يتم العثور على searchInput. سيتم المحاولة مرة أخرى بعد 5 ثوانٍ...");
        setTimeout(initializeElements, 1000); // إعادة المحاولة بعد 5 ثوانٍ
        return;
    }

    // عنصر القائمة الجانبية الموبيل
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active'); // فتح أو غلق القائمة
        });
    } else {
        console.log("لم يتم العثور على menu-btn أو sidebar. سيتم المحاولة مرة أخرى بعد 5 ثوانٍ...");
        setTimeout(initializeElements, 1000); // إعادة المحاولة بعد 5 ثوانٍ
        return;
    }

    console.log("تم العثور على جميع العناصر المطلوبة وتفعيل الأحداث.");
}

// استدعاء الوظيفة لأول مرة
initializeElements();
