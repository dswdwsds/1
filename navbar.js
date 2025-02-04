// وظيفة للتحقق من وجود العناصر وإعادة المحاولة إذا لزم الأمر
function initializeElements() {
    // عنصر تبديل الثيم
    document.addEventListener("DOMContentLoaded", function () {
        const themeToggle = document.getElementById("themeToggle");
        const themeIcon = document.getElementById("themeIcon");
    
        if (!themeToggle || !themeIcon) {
            console.log("لم يتم العثور على الزر أو الأيقونة.");
            return;
        }
    
        // مسارات SVG للأيقونات
        const sunIcon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z";
        const moonIcon = "M12 2C7.03 2 3 6.03 3 12s4.03 10 9 10 9-4.03 9-10-4.03-10-9-10z";
    
        // استرجاع الوضع المخزن
        let isDarkMode = localStorage.getItem("theme") === "dark";
    
        function updateTheme() {
            if (isDarkMode) {
                document.body.classList.add("dark-mode");
                document.body.classList.remove("light-mode");
                themeIcon.setAttribute("d", moonIcon);
            } else {
                document.body.classList.add("light-mode");
                document.body.classList.remove("dark-mode");
                themeIcon.setAttribute("d", sunIcon);
            }
        }
    
        // تحديث المظهر عند تحميل الصفحة
        updateTheme();
    
        themeToggle.addEventListener("click", function () {
            isDarkMode = !isDarkMode; // تبديل الوضع
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
            updateTheme();
        });
    });
    

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
