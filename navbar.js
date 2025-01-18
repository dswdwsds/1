document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', function () {
            if (themeIcon.getAttribute('d') === "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z") {
                themeIcon.setAttribute('d', "M12 2C7.03 2 3 6.03 3 12s4.03 10 9 10 9-4.03 9-10-4.03-10-9-10z");
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
            } else {
                themeIcon.setAttribute('d', "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8-3.59 8-8 8z");
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
            }
        });
    }

    // Search input functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            console.log('بحث عن: ', this.value.toLowerCase());
        });
    }

    // Sidebar toggle functionality
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});
