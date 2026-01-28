// Configuration - Update this with your API endpoint
// For production, update this to your actual API URL (e.g., 'https://api.useafter.ai')
// For local development, use 'http://localhost:8000'
// Note: The API endpoint stores signup data in Azure Table Storage when configured with STORAGE_BACKEND=azure_tables
const API_BASE_URL = 'https://api.useafter.ai'; // Update with your actual API URL

// DOM Elements
const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const successState = document.getElementById('successState');
const errorState = document.getElementById('errorState');
const formState = form.closest('.card');

// Form fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const orgNameInput = document.getElementById('orgName');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const orgNameError = document.getElementById('orgNameError');
const errorMessage = document.getElementById('errorMessage');

// Success elements
const apiKeyDisplay = document.getElementById('apiKeyDisplay');
const copyBtn = document.getElementById('copyBtn');
const retryBtn = document.getElementById('retryBtn');

// Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    orgNameError.textContent = '';
    
    // Validate name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    }
    
    // Validate email
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate organization name
    if (!orgNameInput.value.trim()) {
        orgNameError.textContent = 'Organization name is required';
        isValid = false;
    }
    
    return isValid;
}

// Show loading state
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Creating Account...';
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Create Account';
    }
}

// Show success state
function showSuccess(apiKey, tenantId) {
    form.style.display = 'none';
    errorState.style.display = 'none';
    successState.style.display = 'block';
    apiKeyDisplay.textContent = apiKey;
    
    // Scroll to top of card
    formState.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show error state
function showError(message) {
    form.style.display = 'none';
    successState.style.display = 'none';
    errorState.style.display = 'block';
    errorMessage.textContent = message || 'An unexpected error occurred. Please try again.';
    
    // Scroll to top of card
    formState.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show form (for retry)
function showForm() {
    form.style.display = 'flex';
    errorState.style.display = 'none';
    successState.style.display = 'none';
    
    // Clear form
    form.reset();
    nameError.textContent = '';
    emailError.textContent = '';
    orgNameError.textContent = '';
}

// Copy API key to clipboard
async function copyApiKey() {
    const apiKey = apiKeyDisplay.textContent;
    
    try {
        await navigator.clipboard.writeText(apiKey);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        copyBtn.style.color = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.color = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback: select text
        const range = document.createRange();
        range.selectNode(apiKeyDisplay);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        
        try {
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            
            // Visual feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            copyBtn.style.color = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.color = '';
            }, 2000);
        } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
        }
    }
}

// Submit form
async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Set loading state
    setLoading(true);
    
    // Prepare request data
    // Note: The API endpoint stores this data in Azure Table Storage when STORAGE_BACKEND=azure_tables
    const requestData = {
        email: emailInput.value.trim(),
        org_name: orgNameInput.value.trim(),
        name: nameInput.value.trim() || undefined  // Optional field for personalization
    };
    
    try {
        // Make API request
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            // Handle API errors
            const errorMsg = data.detail || data.message || 'Failed to create account. Please try again.';
            throw new Error(errorMsg);
        }
        
        // Success - show API key
        setLoading(false);
        showSuccess(data.api_key, data.tenant_id);
        
    } catch (error) {
        setLoading(false);
        
        // Handle network errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('Network error. Please check your connection and try again.');
        } else {
            showError(error.message);
        }
        
        console.error('Signup error:', error);
    }
}

// Event Listeners
form.addEventListener('submit', handleSubmit);
copyBtn.addEventListener('click', copyApiKey);
retryBtn.addEventListener('click', showForm);

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
    } else {
        nameError.textContent = '';
    }
});

emailInput.addEventListener('blur', () => {
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

orgNameInput.addEventListener('blur', () => {
    if (!orgNameInput.value.trim()) {
        orgNameError.textContent = 'Organization name is required';
    } else {
        orgNameError.textContent = '';
    }
});

// Clear errors on input
nameInput.addEventListener('input', () => {
    if (nameError.textContent) {
        nameError.textContent = '';
    }
});

emailInput.addEventListener('input', () => {
    if (emailError.textContent) {
        emailError.textContent = '';
    }
});

orgNameInput.addEventListener('input', () => {
    if (orgNameError.textContent) {
        orgNameError.textContent = '';
    }
});

// Update year in footer
const year = document.getElementById('year');
if (year) {
    year.textContent = new Date().getFullYear();
}
