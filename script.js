// Add to existing script.js

// Enhanced preview update with animation
function updatePreview() {
    const name = document.getElementById('name').value.trim();
    const previewText = document.getElementById('preview-text');
    const generateBtn = document.getElementById('generateBtn');
    
    if (name) {
        // Add word art styling to preview
        previewText.innerHTML = `<span style="background: linear-gradient(45deg, #ff6b6b, #ffa500, #ffcc02, #32cd32); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700;">${name}</span> wishes you a Happy Onam! 🌺`;
        generateBtn.disabled = false;
        generateBtn.style.opacity = '1';
        generateBtn.style.transform = 'scale(1)';
    } else {
        previewText.textContent = "Your Name wishes you a Happy Onam! 🌺";
        generateBtn.disabled = true;
        generateBtn.style.opacity = '0.6';
        generateBtn.style.transform = 'scale(0.95)';
    }
}

// Enhanced wish generation with loading animation
function generateWish() {
    const name = document.getElementById('name').value.trim();
    const btnText = document.getElementById('btnText');
    
    if (!name) {
        showNotification('Please enter your name! 💫', 'error');
        return;
    }
    
    // Show loading
    btnText.innerHTML = '<span class="loading"></span> Creating magic...';
    
    setTimeout(() => {
        const encoded = encodeName(name);
        const wishUrl = `${window.location.origin}/wish.html?id=${encoded}`;
        
        document.getElementById('wishLink').value = wishUrl;
        document.getElementById('shareSection').style.display = 'block';
        document.getElementById('shareSection').scrollIntoView({ behavior: 'smooth' });
        
        // Add success animation
        document.getElementById('shareSection').classList.add('success-animation');
        
        btnText.innerHTML = '✅ Wish Created Successfully!';
        
        // Store creation count
        const createdCount = parseInt(localStorage.getItem('totalWishesCreated') || '0') + 1;
        localStorage.setItem('totalWishesCreated', createdCount);
        
        showNotification('Your magical wish is ready! 🎊', 'success');
    }, 1500);
}

// Enhanced wish loading with word art
function loadWish() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedName = urlParams.get('id');
    
    if (encodedName) {
        const name = decodeName(encodedName);
        const wishMessage = document.getElementById('wishMessage');
        
        // Create word art name
        const styledName = `<span style="
            background: linear-gradient(45deg, #ff6b6b, #ffa500, #ffcc02, #32cd32);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: nameGlow 2s ease-in-out infinite alternate;
        ">${name}</span>`;
        
        wishMessage.innerHTML = `${styledName} wishes you a Happy Onam! 🌺`;
        document.title = `${name}'s Onam Wish ✨`;
        
        // Add entrance animation
        wishMessage.style.opacity = '0';
        wishMessage.style.transform = 'translateY(30px)';
        setTimeout(() => {
            wishMessage.style.transition = 'all 1s ease-out';
            wishMessage.style.opacity = '1';
            wishMessage.style.transform = 'translateY(0)';
        }, 300);
        
    } else {
        document.getElementById('wishMessage').innerHTML = 'Happy Onam! 🌺';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : '#32cd32'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Add these functions to your existing script.js

// Enhanced name decoding (if not already present)
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

// Keep all your existing functions (encodeName, generateWish, etc.)
// Just make sure decodeName works properly
