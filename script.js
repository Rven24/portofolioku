document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const fontSwitch = document.getElementById('font-switch');
    const body = document.body;

    const rightPanel = document.querySelector('.right-panel');
    const allContentSections = rightPanel.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('nav.main-nav a[href^="#"]'); // Ambil semua link navigasi
    const navListItems = document.querySelectorAll('nav.main-nav li'); // Ambil semua LI navigasi

    function showPage(pageId) {
        allContentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const targetSection = rightPanel.querySelector(pageId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'flex';
            if (targetSection.scrollHeight > targetSection.clientHeight) {
                targetSection.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    function setActiveNavLink(activeId) {
        navListItems.forEach(li => {
            li.classList.remove('active');
        });

        const activeLink = document.querySelector(`nav.main-nav a[href="${activeId}"]`);
        if (activeLink && activeLink.parentElement) { // Pastikan link dan parent LI ada
            activeLink.parentElement.classList.add('active');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(savedTheme + '-mode');
        themeSwitch.checked = (savedTheme === 'dark');
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    const savedFont = localStorage.getItem('font');
    if (savedFont === 'monospace') {
        body.classList.add('monospace-font');
        fontSwitch.checked = true;
    } else {
        fontSwitch.checked = false;
    }

    fontSwitch.addEventListener('change', () => {
        if (fontSwitch.checked) {
            body.classList.add('monospace-font');
            localStorage.setItem('font', 'monospace');
        } else {
            body.classList.remove('monospace-font');
            localStorage.setItem('font', 'default');
        }
    });

    navLinks.forEach(anchor => { 
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            showPage(targetId);
            setActiveNavLink(targetId);

            history.pushState(null, '', targetId);
        });
    });

    if (window.location.hash) {
        const initialHash = window.location.hash;
        showPage(initialHash);
        setActiveNavLink(initialHash);
    } else {
        showPage('#about-me');
        setActiveNavLink('#about-me');
        history.replaceState(null, '', '#about-me');
    }

    window.addEventListener('popstate', () => {
        if (window.location.hash) {
            const currentHash = window.location.hash;
            showPage(currentHash);
            setActiveNavLink(currentHash); 
        } else {
            showPage('#about-me');
            setActiveNavLink('#about-me');
        }
    });
});
