// Twinkling starfield background, plus optional confetti burst and letter reveal.
(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- starfield ----------
    const stars = document.getElementById("stars");
    if (stars) {
        const ctx = stars.getContext("2d");
        let points = [];
        const resize = () => {
            stars.width = innerWidth * devicePixelRatio;
            stars.height = innerHeight * devicePixelRatio;
            points = Array.from({ length: Math.floor((innerWidth * innerHeight) / 4000) }, () => ({
                x: Math.random() * stars.width,
                y: Math.random() * stars.height,
                r: Math.random() * 1.4 * devicePixelRatio + 0.2,
                p: Math.random() * Math.PI * 2,
                s: 0.01 + Math.random() * 0.03
            }));
        };
        const draw = () => {
            ctx.clearRect(0, 0, stars.width, stars.height);
            for (const st of points) {
                st.p += st.s;
                ctx.globalAlpha = 0.3 + Math.abs(Math.sin(st.p)) * 0.7;
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
                ctx.fill();
            }
            if (!reduceMotion) requestAnimationFrame(draw);
        };
        addEventListener("resize", resize);
        resize();
        draw();
    }

    // ---------- letter-by-letter name reveal ----------
    const nameEl = document.querySelector(".name");
    if (nameEl) {
        const text = nameEl.textContent;
        nameEl.textContent = "";
        nameEl.setAttribute("aria-label", text);
        // Letters are grouped per word so a name never breaks mid-word.
        let i = 0;
        text.split(/\s+/).filter(Boolean).forEach((word, w) => {
            if (w > 0) nameEl.appendChild(document.createTextNode(" "));
            const wordEl = document.createElement("span");
            wordEl.className = "word";
            wordEl.setAttribute("aria-hidden", "true");
            [...word].forEach(ch => {
                const span = document.createElement("span");
                span.textContent = ch;
                span.style.animationDelay = (0.5 + i++ * 0.08) + "s";
                wordEl.appendChild(span);
            });
            nameEl.appendChild(wordEl);
        });
        document.documentElement.style.setProperty("--tagline-delay", (0.9 + i * 0.08) + "s");

        // Shrink the font until the longest word fits inside the card.
        const fit = () => {
            nameEl.style.fontSize = "";
            let size = parseFloat(getComputedStyle(nameEl).fontSize);
            const words = nameEl.querySelectorAll(".word");
            const tooWide = () => [...words].some(el => el.offsetWidth > nameEl.clientWidth);
            while (tooWide() && size > 16) {
                size -= 2;
                nameEl.style.fontSize = size + "px";
            }
        };
        fit();
        addEventListener("resize", fit);
    }

    // ---------- confetti / fireworks ----------
    const canvas = document.getElementById("confetti");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    const colors = ["#f7d774", "#ec4899", "#8b5cf6", "#22d3ee", "#ffffff", "#c9952b"];
    let pieces = [];

    const size = () => {
        canvas.width = innerWidth * devicePixelRatio;
        canvas.height = innerHeight * devicePixelRatio;
    };
    addEventListener("resize", size);
    size();

    const burst = (x, y, count) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (4 + Math.random() * 10) * devicePixelRatio;
            pieces.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 6 * devicePixelRatio,
                w: (6 + Math.random() * 6) * devicePixelRatio,
                h: (3 + Math.random() * 4) * devicePixelRatio,
                rot: Math.random() * Math.PI,
                vr: (Math.random() - 0.5) * 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 160 + Math.random() * 60
            });
        }
    };

    const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces = pieces.filter(p => p.life > 0 && p.y < canvas.height + 50);
        for (const p of pieces) {
            p.vy += 0.25 * devicePixelRatio;
            p.vx *= 0.99;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            p.life--;
            ctx.save();
            ctx.globalAlpha = Math.min(1, p.life / 40);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        }
        requestAnimationFrame(tick);
    };
    tick();

    const W = () => canvas.width, H = () => canvas.height;
    setTimeout(() => burst(W() / 2, H() * 0.4, 180), 400);
    setTimeout(() => burst(W() * 0.2, H() * 0.3, 100), 1100);
    setTimeout(() => burst(W() * 0.8, H() * 0.3, 100), 1500);
    addEventListener("click", e => burst(e.clientX * devicePixelRatio, e.clientY * devicePixelRatio, 80));
})();
