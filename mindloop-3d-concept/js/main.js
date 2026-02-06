document.addEventListener('DOMContentLoaded', () => {
    // --- NEW: SIDEBAR TOGGLE LOGIC ---
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }

    const cards = document.querySelectorAll('.interactive-card');

    /*
        PERFORMANCE & UX NOTE:
        The following 3D tilt effect is visually engaging but can be performance-intensive
        on less powerful devices due to constant calculations and repaints. It also runs
        continuously on mouse movement, which may increase cognitive load or be distracting
        for some users. For some individuals, motion effects like this can also cause discomfort.

        For a production application, consider:
        1. Making this effect optional via a user settings panel ("Disable Motion Effects").
        2. Loading this script asynchronously to avoid blocking the initial page render.
    */
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3; // Max rotation 3 degrees
            const rotateY = ((x - centerX) / centerX) * 3;  // Max rotation 3 degrees

            card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.6s ease-in-out';
        });
    });
});