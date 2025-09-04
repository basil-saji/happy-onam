// Simple name encoding (basic, not cryptographically secure)
function encodeName(name) {
    return btoa(name).replace(/[+=\/]/g, '').substring(0, 8);
}

function decodeName(encoded) {
    try {
        // Add padding if needed
        while (encoded.length % 4) {
            encoded += '=';
        }
        return atob(encoded);
    } catch (e) {
        return "Someone";
    }
}

// Update preview as user types
function updatePreview() {
    const name = document.getElementById('name').value.trim();
    const previewText = document.getElementById('preview-text');
    const generateBtn = document.getElementById('generateBtn');
    
    if (name) {
        previewText.textContent = `${name} wishes you a Happy Onam! 🌺`;
        generateBtn.disabled = false;
    } else {
        previewText.textContent = "Your Name wishes you a Happy Onam! 🌺";
        generateBtn.disabled = true;
    }
}

// Generate wish link
function generateWish() {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert('Please enter your name!');
        return;
    }
    
    const encoded = encodeName(name);
    const wishUrl = `${window.location.origin}/wish.html?id=${encoded}`;
    
    document.getElementById('wishLink').value = wishUrl;
    document.getElementById('shareSection').style.display = 'block';
    
    // Store creation count in localStorage
    const createdCount = parseInt(localStorage.getItem('totalWishesCreated') || '0') + 1;
    localStorage.setItem('totalWishesCreated', createdCount);
    
    alert('Your wish link is ready! 🎉');
}

// Copy link to clipboard
function copyLink() {
    const linkInput = document.getElementById('wishLink');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        alert('Link copied to clipboard! 📋');
    } catch (err) {
        alert('Please copy the link manually');
    }
}

// Share to WhatsApp
function shareToWhatsApp() {
    const name = document.getElementById('name').value.trim();
    const link = document.getElementById('wishLink').value;
    const message = `${name} has sent you an Onam wish 👉 ${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Share to Facebook
function shareToFacebook() {
    const link = document.getElementById('wishLink').value;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(facebookUrl, '_blank');
}

// Load wish from URL parameter
function loadWish() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedName = urlParams.get('id');
    
    if (encodedName) {
        const name = decodeName(encodedName);
        const wishMessage = document.getElementById('wishMessage');
        wishMessage.textContent = `${name} wishes you a Happy Onam! 🌺`;
        document.title = `${name}'s Onam Wish`;
    } else {
        document.getElementById('wishMessage').textContent = 'Happy Onam! 🌺';
    }
}

// Simple visitor counter using localStorage
function incrementVisitor() {
    const urlParams = new URLSearchParams(window.location.search);
    const wishId = urlParams.get('id') || 'default';
    
    const visitorKey = `visitors_${wishId}`;
    const currentCount = parseInt(localStorage.getItem(visitorKey) || '0') + 1;
    localStorage.setItem(visitorKey, currentCount);
    
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement) {
        visitorCountElement.textContent = currentCount;
    }
}
