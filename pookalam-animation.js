// Pookalam Drawing Animation Engine
class PookalamAnimator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.animationStep = 0;
        this.maxSteps = 1000;
        this.colors = [
            '#ff0080', '#00ffff', '#ffff00', '#ff8000', 
            '#8000ff', '#00ff80', '#ff4080', '#80ff00'
        ];
        this.isDrawing = true;
    }

    // Draw animated pookalam patterns
    drawPookalam() {
        if (!this.isDrawing || this.animationStep > this.maxSteps) return;

        const step = this.animationStep;
        const progress = step / this.maxSteps;

        // Clear with trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw multiple layers of pookalam
        for (let layer = 0; layer < 8; layer++) {
            const layerProgress = Math.max(0, progress - layer * 0.1);
            if (layerProgress <= 0) continue;

            this.drawPookalamLayer(layer, layerProgress);
        }

        this.animationStep += 2;
        requestAnimationFrame(() => this.drawPookalam());
    }

    drawPookalamLayer(layer, progress) {
        const radius = 30 + layer * 25;
        const petals = 8 + layer * 4;
        const angleStep = (Math.PI * 2) / petals;
        const color = this.colors[layer % this.colors.length];

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3 - layer * 0.2;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 10;

        for (let i = 0; i < petals * progress; i++) {
            const angle = i * angleStep;
            const x1 = this.centerX + Math.cos(angle) * radius;
            const y1 = this.centerY + Math.sin(angle) * radius;
            
            // Draw petal patterns
            this.drawPetal(x1, y1, angle, radius * 0.6, color);
            
            // Draw connecting lines
            if (i > 0) {
                const prevAngle = (i - 1) * angleStep;
                const x2 = this.centerX + Math.cos(prevAngle) * radius;
                const y2 = this.centerY + Math.sin(prevAngle) * radius;
                
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();
            }
        }

        // Draw center mandala
        if (progress > 0.5) {
            this.drawCenterMandala(progress, color);
        }
    }

    drawPetal(x, y, angle, size, color) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size * 0.3, size * 0.1, 0, 0, Math.PI * 2);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Add gradient fill
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3);
        gradient.addColorStop(0, color + '80');
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawCenterMandala(progress, color) {
        const centerProgress = (progress - 0.5) * 2;
        const spokes = 16;
        const spokeLength = 40 * centerProgress;

        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = '#ffffff';
        this.ctx.shadowBlur = 15;

        for (let i = 0; i < spokes * centerProgress; i++) {
            const angle = (i * Math.PI * 2) / spokes;
            const x = this.centerX + Math.cos(angle) * spokeLength;
            const y = this.centerY + Math.sin(angle) * spokeLength;

            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();

            // Draw end circles
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }

    startAnimation() {
        this.animationStep = 0;
        this.isDrawing = true;
        this.drawPookalam();
    }

    stopAnimation() {
        this.isDrawing = false;
    }
}

// Text Animation Engine
class NeonTextAnimator {
    constructor() {
        this.nameElement = document.getElementById('animatedName');
        this.messageElement = document.getElementById('animatedMessage');
    }

    async animateText(name) {
        // Animate name first
        await this.typewriterEffect(this.nameElement, name, 100);
        
        // Add special effects to name
        this.addNeonEffects(this.nameElement);
        
        // Animate message
        await this.typewriterEffect(this.messageElement, 'wishes you a Happy Onam! 🌺', 50);
        
        // Show traditional elements
        setTimeout(() => {
            const traditional = document.getElementById('traditionalElements');
            traditional.style.opacity = '1';
        }, 1000);
    }

    typewriterEffect(element, text, delay) {
        return new Promise((resolve) => {
            element.innerHTML = '';
            let i = 0;
            
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    
                    // Add cursor effect
                    if (i === text.length - 1) {
                        element.innerHTML += '<span class="cursor">|</span>';
                    }
                    
                    i++;
                } else {
                    // Remove cursor
                    element.innerHTML = text;
                    clearInterval(timer);
                    resolve();
                }
            }, delay);
        });
    }

    addNeonEffects(element) {
        // Add rainbow gradient to name
        const colors = ['#ff0080', '#00ffff', '#ffff00', '#ff8000'];
        let colorIndex = 0;
        
        setInterval(() => {
            const color = colors[colorIndex % colors.length];
            element.style.color = color;
            element.style.textShadow = `
                0 0 10px ${color},
                0 0 20px ${color},
                0 0 30px ${color},
                0 0 40px ${color}
            `;
            colorIndex++;
        }, 1000);
    }
}

// Main animation controller
async function startWishAnimation() {
    // Get name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const encodedName = urlParams.get('id');
    const name = encodedName ? decodeName(encodedName) : 'Someone Special';
    
    // Start pookalam animation
    const pookalamAnimator = new PookalamAnimator('pookalamCanvas');
    pookalamAnimator.startAnimation();
    
    // Wait a bit, then start text animation
    setTimeout(async () => {
        const textAnimator = new NeonTextAnimator();
        await textAnimator.animateText(name);
        
        // Update page title
        document.title = `${name}'s Magical Onam Wish ✨`;
    }, 2000);
}

// Add cursor blink animation
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);
