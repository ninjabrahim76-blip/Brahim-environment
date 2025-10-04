document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && prefersDark)) {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️';
    }
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            toggleBtn.textContent = '🌙';
        }
    });

    // Entrance animation for .animate elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // Video play button logic
    const playBtn = document.getElementById('videoPlayBtn');
    const thumb = document.getElementById('videoThumb');
    const frame = document.getElementById('videoFrame');
    if (playBtn && thumb && frame) {
        playBtn.addEventListener('click', () => {
            thumb.style.display = 'none';
            frame.style.display = 'block';
        });
    }

    // Video fallback logic
    const mainVideo = document.getElementById('mainVideo');
    const videoFallback = document.getElementById('videoFallback');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    if (mainVideo) {
        mainVideo.onerror = function() {
            mainVideo.style.display = 'none';
            if (videoFallback) videoFallback.style.display = 'flex';
        };
        // YouTube iframe doesn't trigger onerror, so use a timeout as a basic check
        setTimeout(() => {
            if (mainVideo && mainVideo.contentWindow == null && videoFallback) {
                mainVideo.style.display = 'none';
                videoFallback.style.display = 'flex';
            }
        }, 3000);
    }
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            window.open('https://www.youtube.com/watch?v=2Vv-BfVoq4g', '_blank');
        });
    }
});
