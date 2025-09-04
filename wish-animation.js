// Get name from URL and decode it
function getNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedName = urlParams.get('id');
    return encodedName ? decodeName(encodedName) : 'Someone Special';
}

// Simple but secure name decoding
function decodeName(encoded) {
    try {
        while (encoded.length % 4) {
            encoded += '=';
        }
        return atob(encoded);
    } catch (e) {
        return "Someone Special";
    }
}

// Typewriter effect for text
function typeWriter(element, text, speed = 100) {
    return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                resolve();
            }
        }, speed);
    });
}

// Main animation sequence
async function startAnimation() {
    const name = getNameFromURL();
    const nameElement = document.getElementById('nameText');
    const messageElement = document.getElementById('messageText');
    const actionContainer = document.getElementById('actionContainer');
    
    // Update page title
    document.title = `${name}'s Magical Onam Wish ✨`;
    
    // Wait for pookalam animation to complete (5 seconds)
    setTimeout(async () => {
        // Start name animation
        nameElement.classList.add('animate');
        await typeWriter(nameElement, name, 150);
        
        // Start message animation
        setTimeout(async () => {
            messageElement.classList.add('animate');
            await typeWriter(messageElement, 'wishes you a Happy Onam! 🌺', 80);
            
            // Show action container
            setTimeout(() => {
                actionContainer.style.opacity = '1';
            }, 1000);
            
        }, 1500);
    }, 5000);
}

// Visitor counter
function updateVisitorCount() {
    const urlParams = new URLSearchParams(window.location.search);
    const wishId = urlParams.get('id') || 'default';
    const visitorKey = `visitors_${wishId}`;
    
    const currentCount = parseInt(localStorage.getItem(visitorKey) || '0') + 1;
    localStorage.setItem(visitorKey, currentCount);
    
    document.getElementById('visitorCount').textContent = currentCount;
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    startAnimation();
    updateVisitorCount();
});

// Add some interactivity
document.addEventListener('click', (e) => {
    if (e.target.closest('.pookalam-svg')) {
        // Add a sparkle effect when clicked
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x - 10}px;
        top: ${y - 10}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #ffeb3b, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleEffect 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleEffect {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(2) rotate(180deg); opacity: 0; }
    }
`;
document.head.appendChild(style);
