const historyKey = "browsingHistory";

// الحصول على السجل الموجود أو إنشاء سجل جديد
let history = JSON.parse(localStorage.getItem(historyKey)) || [];

// إضافة الصفحة الحالية إلى السجل (مع تجنب التكرار)
function addToHistory(pageName, pageURL = window.location.href) {
    // تحقق إذا كانت الصفحة مكررة بالفعل (حسب الرابط)
    const exists = history.some(entry => entry.url === pageURL);
    if (!exists) {
        history.push({ name: pageName, url: pageURL });
        localStorage.setItem(historyKey, JSON.stringify(history));
    }
}

// عرض السجل في الصفحة
function displayHistory() {
    const historyList = document.getElementById("history-list");
    if (historyList) {
        historyList.innerHTML = ""; // تفريغ القائمة

        if (history.length === 0) {
            historyList.innerHTML = "<li>لا يوجد سجل حتى الآن</li>";
        } else {
            history.forEach((entry) => {
                const listItem = document.createElement("li");

                const link = document.createElement("a");
                link.href = entry.url;
                link.textContent = entry.name;
                link.style.textDecoration = "none";
                link.style.color = "#007bff"; // لون رابط أزرق

                // فتح الرابط في نفس الصفحة أو نافذة جديدة (حسب رغبتك)
                link.target = "_self";

                listItem.appendChild(link);
                historyList.appendChild(listItem);
            });
        }
    }
}

// مسح السجل
function clearHistory() {
    history = [];
    localStorage.removeItem(historyKey);
    displayHistory();
}

// عكس ترتيب السجل
function reverseHistory() {
    history.reverse();
    localStorage.setItem(historyKey, JSON.stringify(history));
    displayHistory();
}

// ربط الأزرار بالوظائف
const clearHistoryButton = document.getElementById("clear-history");
if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", clearHistory);
}

const reverseHistoryButton = document.getElementById("reverse-history");
if (reverseHistoryButton) {
    reverseHistoryButton.addEventListener("click", reverseHistory);
}

// عند تحميل الصفحة: أضفها للسجل ثم اعرض السجل
const currentPage = document.title || "صفحة غير معنونة";
addToHistory(currentPage, window.location.href);
displayHistory();
