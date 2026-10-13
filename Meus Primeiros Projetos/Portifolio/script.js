/* =========================================================
   KAUÃ // CYBERPUNK PORTFOLIO
   JAVASCRIPT — INTERAÇÕES / ANIMAÇÕES / TERMINAL
   ========================================================= */

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

/* =========================================================
   1. BOOT SCREEN — funciona caso o HTML possua a tela
   ========================================================= */
const bootScreen = document.getElementById("bootScreen");
const bootProgress = document.getElementById("bootProgress");
const bootProfile = document.getElementById("bootProfile");
const bootProjects = document.getElementById("bootProjects");
const bootInterface = document.getElementById("bootInterface");

if (bootProgress) setTimeout(() => bootProgress.style.width = "100%", 100);
if (bootProfile) setTimeout(() => bootProfile.textContent = "[ OK ]", 600);
if (bootProjects) setTimeout(() => bootProjects.textContent = "[ OK ]", 1100);
if (bootInterface) setTimeout(() => bootInterface.textContent = "[ OK ]", 1600);
if (bootScreen) setTimeout(() => {
    bootScreen.style.opacity = "0";
    bootScreen.style.visibility = "hidden";
}, 2300);

/* =========================================================
   2. BINARY BACKGROUND
   ========================================================= */
const background = document.getElementById("binaryBackground");

if (background && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 150; i++) {
        const number = document.createElement("span");
        number.textContent = Math.random() > .5 ? "1" : "0";
        number.style.left = `${Math.random() * 100}%`;
        number.style.top = `${Math.random() * -100}px`;
        number.style.animationDuration = `${Math.random() * 6 + 7}s`;
        number.style.animationDelay = `${Math.random() * -8}s`;
        fragment.appendChild(number);
    }
    background.appendChild(fragment);
}

/* =========================================================
   NAVBAR — SCROLL SUPER SUAVE
   ========================================================= */

(function () {

    const navLinks = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    let scrolling = false;

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            if (scrolling) {
                return;
            }

            scrolling = true;

            const navbar = document.querySelector(".navbar");

            const offset = navbar
                ? navbar.offsetHeight + 8
                : 8;

            const startPosition = window.scrollY;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            const distance = targetPosition - startPosition;

            const duration = 1800;

            let startTime = null;

            function animateScroll(currentTime) {

                if (startTime === null) {
                    startTime = currentTime;
                }

                const elapsed = currentTime - startTime;

                let progress = elapsed / duration;

                if (progress > 1) {
                    progress = 1;
                }

                /*
                 * Easing suave:
                 * começa devagar
                 * acelera no meio
                 * desacelera no final
                 */

                const easing =
                    progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(
                            -2 * progress + 2,
                            3
                        ) / 2;

                window.scrollTo(
                    0,
                    startPosition + distance * easing
                );

                if (progress < 1) {

                    requestAnimationFrame(animateScroll);

                } else {

                    scrolling = false;

                }

            }

            requestAnimationFrame(animateScroll);

        });

    });

})();

/* =========================================================
   REVEAL — FADE SUAVE
   ========================================================= */

function initRevealAnimations() {

    const revealElements = document.querySelectorAll(
        ".section-header, " +
        ".header-certificado, " +
        ".card, " +
        ".skill, " +
        ".project-card, " +
        ".timeline-item, " +
        ".terminal, " +
        ".terminal-window, " +
        ".contact-links, " +
        ".certificado-item, " +
        ".profile-stats"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -5% 0px"
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initRevealAnimations
    );

} else {

    initRevealAnimations();

}
    /* ==========================================
       INTERSECTION OBSERVER
       ========================================== */

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;

                /* ==============================
                   DELAY AUTOMÁTICO DOS CARDS
                   ============================== */

                const parent = element.parentElement;

                if (parent) {

                    const animatedGroups = [
                        "skills-grid",
                        "projects-grid",
                        "profile-grid",
                        "certificados-grid",
                        "timeline",
                        "contact-links"
                    ];

                    const isAnimatedGroup =
                        animatedGroups.some(className =>
                            parent.classList.contains(className)
                        );

                    if (isAnimatedGroup) {

                        const siblings = [
                            ...parent.children
                        ];

                        const index =
                            siblings.indexOf(element);

                        if (index >= 0) {

                            element.style.transitionDelay =
                                `${Math.min(index * 0.10, 0.45)}s`;

                        }
                    }
                }


                /* ==============================
                   ATIVA A ANIMAÇÃO
                   ============================== */

                requestAnimationFrame(() => {
                    element.classList.add("active");
                });

                /* 
                   Depois que entrou na tela,
                   não precisa observar novamente.
                */

                observer.unobserve(element);

            });

        },
        {
            threshold: 0.10,
            rootMargin: "0px 0px -8% 0px"
        }
    );


    /* ==========================================
       OBSERVA TODOS OS ELEMENTOS
       ========================================== */

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });



/* =========================================================
   INICIAR DEPOIS DO HTML CARREGAR
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initRevealAnimations
    );

} else {

    initRevealAnimations();

}

/* =========================================================
   7. BOTÕES DE PROJETO EM DESENVOLVIMENTO
   ========================================================= */
document.querySelectorAll(".locked-action").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        button.textContent = "MISSION LOCKED // EM BREVE";
        setTimeout(() => button.textContent = "EM DESENVOLVIMENTO", 1800);
    });
});

/* =========================================================
   8. CERTIFICADOS — FULLSCREEN / ZOOM / PREV / NEXT
   ========================================================= */
const certificateItems = [...document.querySelectorAll("[data-certificate]")];
const certificateModal = document.getElementById("certificateModal");
const certificateImage = document.getElementById("certificateImage");
const certificateClose = document.getElementById("certificateClose");
const certificatePrev = document.getElementById("certificatePrev");
const certificateNext = document.getElementById("certificateNext");
const certificateZoomIn = document.getElementById("certificateZoomIn");
const certificateZoomOut = document.getElementById("certificateZoomOut");
const certificateReset = document.getElementById("certificateReset");
const certificateZoomLabel = document.getElementById("certificateZoom");
let certificateIndex = 0;
let certificateZoom = 1;

function updateCertificate() {
    if (!certificateImage || !certificateItems.length) return;
    certificateImage.src = certificateItems[certificateIndex].dataset.certificate;
    certificateZoom = 1;
    updateCertificateZoom();
}

function updateCertificateZoom() {
    if (!certificateImage) return;
    certificateImage.style.transform = `scale(${certificateZoom})`;
    certificateImage.style.transformOrigin = "center center";
    if (certificateZoomLabel) certificateZoomLabel.textContent = `${Math.round(certificateZoom * 100)}%`;
}

function openCertificate(index = 0) {
    if (!certificateModal || !certificateItems.length) return;
    certificateIndex = index;
    updateCertificate();
    certificateModal.classList.add("active");
    certificateModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function closeCertificate() {
    if (!certificateModal) return;
    certificateModal.classList.remove("active");
    certificateModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

certificateItems.forEach((item, index) => item.addEventListener("click", () => openCertificate(index)));
certificateClose?.addEventListener("click", closeCertificate);
certificatePrev?.addEventListener("click", () => { if (certificateItems.length) { certificateIndex = (certificateIndex - 1 + certificateItems.length) % certificateItems.length; updateCertificate(); } });
certificateNext?.addEventListener("click", () => { if (certificateItems.length) { certificateIndex = (certificateIndex + 1) % certificateItems.length; updateCertificate(); } });
certificateZoomIn?.addEventListener("click", () => { certificateZoom = Math.min(2.5, certificateZoom + .1); updateCertificateZoom(); });
certificateZoomOut?.addEventListener("click", () => { certificateZoom = Math.max(.6, certificateZoom - .1); updateCertificateZoom(); });
certificateReset?.addEventListener("click", () => { certificateZoom = 1; updateCertificateZoom(); });
certificateModal?.addEventListener("click", event => { if (event.target === certificateModal) closeCertificate(); });

/* =========================================================
   9. COPIAR E-MAIL
   ========================================================= */
const copyEmail = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");

copyEmail?.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText("devkauav@gmail.com");
        if (copyFeedback) copyFeedback.textContent = "✓ E-MAIL COPIADO";
        copyEmail.textContent = "COPIADO ✓";
        setTimeout(() => {
            if (copyFeedback) copyFeedback.textContent = "";
            copyEmail.textContent = "COPIAR";
        }, 2200);
    } catch {
        if (copyFeedback) copyFeedback.textContent = "Abra o e-mail manualmente.";
    }
});

/* =========================================================
   10. TÍTULO DINÂMICO DA ABA
   ========================================================= */
const defaultTitle = document.title;
document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "Volte ao portfólio // KAUÃ.DEV" : defaultTitle;
});

/* =========================================================
   11. TECLAS DO VISUALIZADOR
   ========================================================= */
document.addEventListener("keydown", event => {
    if (!certificateModal?.classList.contains("active")) return;
    if (event.key === "Escape") closeCertificate();
    if (event.key === "ArrowLeft") certificatePrev?.click();
    if (event.key === "ArrowRight") certificateNext?.click();
    if (event.key === "+") certificateZoomIn?.click();
    if (event.key === "-") certificateZoomOut?.click();
});

/* =========================================================
   12. CURSOR CYBERPUNK — desktop
   ========================================================= */
if (window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
    const cursor = document.createElement("div");
    cursor.className = "cyber-cursor";
    document.body.appendChild(cursor);
    window.addEventListener("pointermove", event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    }, { passive: true });
    document.querySelectorAll("a,button").forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
}

/* =========================================================
   NAVBAR — SCROLL SUPER SUAVE
   ========================================================= */

(function () {

    const navLinks = document.querySelectorAll(
        'nav a[href^="#"], header a[href^="#"]'
    );

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const startPosition = window.scrollY;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                80;

            const distance = targetPosition - startPosition;

            const duration = 1800;

            let startTime = null;

            function animateScroll(currentTime) {

                if (startTime === null) {
                    startTime = currentTime;
                }

                const elapsed = currentTime - startTime;

                let progress = elapsed / duration;

                if (progress > 1) {
                    progress = 1;
                }

                /*
                 * Movimento extremamente suave:
                 * começa devagar
                 * acelera no meio
                 * desacelera no final
                 */
                const easing =
                    progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(
                            -2 * progress + 2,
                            3
                        ) / 2;

                window.scrollTo(
                    0,
                    startPosition + distance * easing
                );

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }

            }

            requestAnimationFrame(animateScroll);

        });

    });

})();