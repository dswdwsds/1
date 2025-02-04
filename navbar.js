// وظيفة للتحقق من وجود العناصر وإعادة المحاولة إذا لزم الأمر
function initializeElements() {
// عنصر تبديل الثيم
const themeToggle = document.getElementById('themeToggle');

// دالة لتطبيق الثيم بناءً على التخزين المحلي
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        // إذا لم يكن هناك ثيم محفوظ، يمكن تعيين الثيم الافتراضي
        document.body.classList.add('light-mode'); // أو 'dark-mode' حسب الرغبة
    }
}

// تطبيق الثيم عند تحميل الصفحة
applyTheme();

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        // التبديل بين الثيمات
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            // حفظ الثيم في localStorage
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            // حفظ الثيم في localStorage
            localStorage.setItem('theme', 'dark-mode');
        }
    });
} else {
    console.log("لم يتم العثور على themeToggle. سيتم المحاولة مرة أخرى بعد 5 ثوانٍ...");
    setTimeout(initializeElements, 1000); // إعادة المحاولة بعد 5 ثوانٍ
    return;
}


/// تحميل البيانات من ملف JSON
fetch('navbar/قائمة الأنمي/قائمة الأنمي.json')
.then(response => response.json())
.then(data => {
    const animeData = data;

    // العنصر الذي يحتوي على القائمة
    const animeListContainer = document.getElementById('animeList');
    const searchInput = document.getElementById('searchInput');

    // دالة لعرض الأنميات بناءً على النص المدخل في البحث
    function displayAnimeList(filteredData) {
        animeListContainer.innerHTML = ''; // إفراغ المحتوى القديم
        filteredData.forEach(item => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('search-item');
            animeItem.innerHTML = `<strong>${item.name}</strong>`;
            animeListContainer.appendChild(animeItem);
        });
    }

    // عرض جميع الأنميات عند تحميل الصفحة
    displayAnimeList(animeData);

    // إضافة مستمع للبحث
    searchInput.addEventListener('input', function () {
        let query = this.value.toLowerCase(); // الحصول على النص المدخل وتحويله إلى حروف صغيرة

        // تصفية الأنميات بناءً على النص المدخل
        const filteredAnime = animeData.filter(item => 
            item.name.toLowerCase().includes(query)
        );

        // عرض الأنميات المصفاة
        displayAnimeList(filteredAnime);
    });
})
.catch(error => console.error('خطأ في تحميل ملف الأنمي:', error));



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
