// وظيفة للتحقق من وجود العناصر وإعادة المحاولة إذا لزم الأمر
function initializeElements() {
// عنصر تبديل الثيم
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        // التبديل بين الثيمات
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        }
    });
} else {
    console.log("لم يتم العثور على themeToggle. سيتم المحاولة مرة أخرى بعد 5 ثوانٍ...");
    setTimeout(initializeElements, 1000); // إعادة المحاولة بعد 5 ثوانٍ
    return;
}

    // عنصر البحث
 // تحميل البيانات من ملف JSON
let articles = [];

fetch('قائمة الأنمي/قائمة الأنمي.json')
  .then(response => response.json())
  .then(data => {
    articles = data;  // حفظ البيانات في متغير
  })
  .catch(error => console.error('Error loading JSON:', error));

// دالة البحث
function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = articles.filter(article => {
        return article.title.toLowerCase().includes(query) || article.content.toLowerCase().includes(query);
    });

    displayResults(results);
}

// دالة لعرض النتائج
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = "";  // مسح النتائج القديمة

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>لا توجد نتائج</p>";
    } else {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.content}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    }
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
