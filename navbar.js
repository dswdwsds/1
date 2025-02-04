// وظيفة للتحقق من وجود العناصر وإعادة المحاولة إذا لزم الأمر
function initializeElements() {
    document.addEventListener("DOMContentLoaded", function () {
        const themeToggle = document.getElementById("themeToggle");
        const themePath = document.getElementById("themePath");
    
        if (!themeToggle || !themePath) {
            console.log("لم يتم العثور على الزر أو الأيقونة.");
            return;
        }
    
        // مسارات SVG لأيقونات الشمس والقمر
        const sunIcon = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z";
        const moonIcon = "M12 2C9 2 6 5 6 8s3 6 6 6 6-3 6-6-3-6-6-6z";
    
        // استرجاع الوضع المخزن من localStorage
        let isDarkMode = localStorage.getItem("theme") === "dark";
    
        function updateTheme() {
            if (isDarkMode) {
                document.body.classList.add("dark-mode");
                document.body.classList.remove("light-mode");
                themePath.setAttribute("d", moonIcon); // تغيير الأيقونة للقمر
            } else {
                document.body.classList.add("light-mode");
                document.body.classList.remove("dark-mode");
                themePath.setAttribute("d", sunIcon); // تغيير الأيقونة للشمس
            }
        }
    
        // تحديث الأيقونة عند تحميل الصفحة
        updateTheme();
    
        // عند الضغط على الزر، يتم التبديل بين الوضعين
        themeToggle.addEventListener("click", function () {
            isDarkMode = !isDarkMode;
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
