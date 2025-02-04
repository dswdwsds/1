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


// تحميل البيانات من ملف JSON
fetch('https://abdo12249.github.io/1/navbar/%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D9%84%D8%A3%D9%86%D9%85%D9%8A/%D9%82%D8%A7%D8%A6%D9%85%D8%A9%20%D8%A7%D9%84%D8%A3%D9%86%D9%85%D9%8A.json')
    .then(response => response.json())
    .then(data => {
        const animeData = data;

        // العنصر الذي يحتوي على القائمة
        const animeListContainer = document.getElementById('animeList');
        const searchInput = document.getElementById('searchInput');

        // دالة لعرض الأنميات بناءً على النص المدخل في البحث
        function displayAnimeList(filteredData) {
            animeListContainer.innerHTML = ''; // إفراغ المحتوى القديم
            if (filteredData.length === 0) {
                animeListContainer.innerHTML = '<p>لم يتم العثور على نتائج.</p>'; // رسالة إذا لم يتم العثور على نتائج
            } else {
                filteredData.forEach(item => {
                    const animeItem = document.createElement('div');
                    animeItem.classList.add('search-item');
                    animeItem.innerHTML = `<strong>${item.name}</strong>`;
                    
                    // إضافة حدث عند الضغط على اسم الأنمي
                    animeItem.addEventListener('click', function() {
                        // توجيه المستخدم إلى صفحة الأنمي باستخدام الرابط المخزن في الـ JSON
                        window.location.href = item.link;
                    });

                    animeListContainer.appendChild(animeItem);
                });
            }
        }

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


// تفضيلت 

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = {
        url: window.location.href,
        title: document.title // اسم الموقع الحالي
    };

    let savedSites = localStorage.getItem("savedSites") ? JSON.parse(localStorage.getItem("savedSites")) : [];

    function updateButtonState() {
        let button = document.getElementById("saveButton");
        if (!button) return;

        let isSaved = savedSites.some(site => site.url === currentPage.url);

        if (isSaved) {
            button.textContent = "إزالة من للمفضل";
            button.classList.add("saved");
            button.classList.remove("not-saved");
        } else {
            button.textContent = "اضافة للمفضل ";
            button.classList.add("not-saved");
            button.classList.remove("saved");
        }
    }

    function toggleLink() {
        let index = savedSites.findIndex(site => site.url === currentPage.url);

        if (index === -1) {
            savedSites.push(currentPage); // إضافة الموقع
        } else {
            savedSites.splice(index, 1); // إزالة الموقع
        }

        localStorage.setItem("savedSites", JSON.stringify(savedSites));
        updateButtonState();
    }

    function loadLinks() {
        let list = document.getElementById("linksList");
        if (!list) return;

        let savedSites = localStorage.getItem("savedSites") ? JSON.parse(localStorage.getItem("savedSites")) : [];
        list.innerHTML = "";

        savedSites.forEach(site => {
            let listItem = document.createElement("li");
            let anchor = document.createElement("a");
            anchor.href = site.url;
            anchor.textContent = site.title;
            anchor.target = "_blank"; // فتح الرابط في نافذة جديدة

            listItem.appendChild(anchor);
            list.appendChild(listItem);
        });
    }

    function clearLinks() {
        localStorage.removeItem("savedSites");
        loadLinks();
    }

    // إذا كان الزر موجودًا في الصفحة، قم بتحديث حالته
    if (document.getElementById("saveButton")) {
        updateButtonState();
        document.getElementById("saveButton").addEventListener("click", toggleLink);
    }

    // إذا كان هناك قائمة للروابط المحفوظة، قم بتحميلها
    if (document.getElementById("linksList")) {
        loadLinks();
        let clearButton = document.getElementById("clearButton");
        if (clearButton) clearButton.addEventListener("click", clearLinks);
    }
});
