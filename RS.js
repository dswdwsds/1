const historyKey = "browsingHistory";

// الحصول على السجل الموجود أو إنشاء سجل جديد
let history = JSON.parse(localStorage.getItem(historyKey)) || [];

// إضافة الصفحة الحالية إلى السجل
function addToHistory(pageName) {
    history.push(pageName);
    localStorage.setItem(historyKey, JSON.stringify(history));
}

// عرض السجل في الصفحة إذا كان هناك قائمة لعرضه
function displayHistory() {
    const historyList = document.getElementById("history-list");
    if (historyList) {
        historyList.innerHTML = ""; // تفريغ القائمة

        if (history.length === 0) {
            historyList.innerHTML = "<li>لا يوجد سجل حتى الآن</li>";
        } else {
            history.forEach((page) => {
                const listItem = document.createElement("li");
                listItem.textContent = page;
                historyList.appendChild(listItem);
            });
        }
    }
}

// مسح السجل
function clearHistory() {
    history = []; // إفراغ السجل في الذاكرة
    localStorage.removeItem(historyKey); // إزالة السجل من localStorage
    displayHistory(); // تحديث العرض
}

// عكس ترتيب السجل
function reverseHistory() {
    history.reverse(); // عكس ترتيب المصفوفة
    localStorage.setItem(historyKey, JSON.stringify(history)); // تحديث localStorage
    displayHistory(); // تحديث العرض
}

// إضافة الأحداث للزرين إذا كانا موجودين
const clearHistoryButton = document.getElementById("clear-history");
if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", clearHistory);
}

const reverseHistoryButton = document.getElementById("reverse-history");
if (reverseHistoryButton) {
    reverseHistoryButton.addEventListener("click", reverseHistory);
}

// عند تحميل الصفحة
const currentPage = document.title || "صفحة غير معنونة";
addToHistory(currentPage); // إضافة الصفحة الحالية إلى السجل
displayHistory(); // عرض السجل


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
            button.textContent = "إزالة الموقع";
            button.classList.add("saved");
            button.classList.remove("not-saved");
        } else {
            button.textContent = "حفظ الموقع";
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



