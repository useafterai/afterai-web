// Configuration - Update this with your API endpoint
// For production, update this to your actual API URL (e.g., 'https://api.useafter.ai')
// For local development, use 'http://localhost:8000'
// Note: The API endpoint stores signup data in Azure Table Storage when configured with STORAGE_BACKEND=azure_tables
// IMPORTANT: Ensure the API has CORS configured to allow requests from this domain
// Set ALLOWED_ORIGINS environment variable in the API to include your website domain
const API_BASE_URL = 'https://api.useafter.ai'; // Update with your actual API URL

// DOM Elements - wait for DOM to be ready
let form, submitBtn, successState, errorState, formState;

function initDOM() {
    form = document.getElementById('signupForm');
    submitBtn = document.getElementById('submitBtn');
    successState = document.getElementById('successState');
    errorState = document.getElementById('errorState');
    if (form) {
        formState = form.closest('.card');
    }
    
    // Form fields
    usernameInput = document.getElementById('username');
    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    nameInput = document.getElementById('name');
    
    // Error message elements
    usernameError = document.getElementById('usernameError');
    emailError = document.getElementById('emailError');
    passwordError = document.getElementById('passwordError');
    nameError = document.getElementById('nameError');
    errorMessage = document.getElementById('errorMessage');
    
    // Success elements
    apiKeyDisplay = document.getElementById('apiKeyDisplay');
    copyBtn = document.getElementById('copyBtn');
    retryBtn = document.getElementById('retryBtn');
    
    if (!form) {
        console.error('Signup form element not found!');
        return false;
    }
    if (!submitBtn) {
        console.error('Submit button not found!');
        return false;
    }
    console.log('DOM initialized successfully');
    return true;
}

// Form fields - will be initialized in initDOM
let usernameInput, emailInput, passwordInput, nameInput;
let usernameError, emailError, passwordError, nameError, errorMessage;
let apiKeyDisplay, copyBtn, retryBtn;

// Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    nameError.textContent = '';
    
    // Validate username
    if (!usernameInput.value.trim()) {
        usernameError.textContent = 'Username is required';
        isValid = false;
    } else if (usernameInput.value.trim().length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        isValid = false;
    } else if (!/^[a-zA-Z0-9_-]+$/.test(usernameInput.value.trim())) {
        usernameError.textContent = 'Username can only contain letters, numbers, underscores, and hyphens';
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
    
    // Validate password
    if (!passwordInput.value) {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    }
    
    // Name is optional, no validation needed
    
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

// Show email sent state
function showEmailSent() {
    form.style.display = 'none';
    errorState.style.display = 'none';
    successState.style.display = 'block';
    
    // Update success state to show email verification message
    const successIcon = successState.querySelector('.success-icon');
    const successTitle = successState.querySelector('h2');
    const successMsg = successState.querySelector('.success-message');
    const apiKeySection = successState.querySelector('.api-key-section');
    const nextSteps = successState.querySelector('.next-steps');
    
    if (successIcon) successIcon.textContent = '✉️';
    if (successTitle) successTitle.textContent = 'Check Your Email!';
    if (successMsg) {
        successMsg.textContent = `We've sent a verification email to ${emailInput.value.trim()}. Please click the link in the email to verify your account and get your API key.`;
    }
    if (apiKeySection) apiKeySection.style.display = 'none';
    if (nextSteps) {
        nextSteps.innerHTML = `
            <h3>Next Steps:</h3>
            <ol>
                <li>Check your email inbox (and spam folder) for the verification email</li>
                <li>Click the verification link in the email</li>
                <li>You'll be redirected to a page with your API key</li>
                <li>Save your API key securely - you won't be able to see it again</li>
            </ol>
        `;
    }
    
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
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    nameError.textContent = '';
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
    console.log('Form submitted');
    
    // Validate form
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    console.log('Form validation passed, submitting...');
    // Set loading state
    setLoading(true);
    
    // Prepare request data
    const requestData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value,
        name: nameInput.value.trim() || undefined  // Optional field for personalization
    };
    
    try {
        console.log('Making API request to:', `${API_BASE_URL}/signup`);
        console.log('Request data:', { ...requestData, password: '***' }); // Don't log password
        
        // Make API request
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        console.log('Response status:', response.status);
        
        // Check if response is ok before parsing
        if (!response.ok) {
            // Try to parse error response
            let errorMsg = 'Failed to create account. Please try again.';
            try {
                const errorData = await response.json();
                errorMsg = errorData.detail || errorData.message || errorMsg;
            } catch (parseError) {
                // If JSON parsing fails, use status text
                errorMsg = response.statusText || `Server error (${response.status})`;
            }
            throw new Error(errorMsg);
        }
        
        // Parse successful response
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            throw new Error('Invalid response from server. Please try again.');
        }
        
        // Check response type
        // New signup flow: returns only {message: "..."} - need email validation
        // Validation flow: returns {api_key, tenant_id, message}
        if (data.api_key && data.tenant_id) {
            // Validation completed - show API key
            setLoading(false);
            showSuccess(data.api_key, data.tenant_id);
        } else if (data.message) {
            // Signup successful - show "check your email" message
            setLoading(false);
            showEmailSent();
        } else {
            throw new Error('Invalid response format from server.');
        }
        
    } catch (error) {
        setLoading(false);
        
        // Handle different error types
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (error.name === 'TypeError') {
            if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
                errorMessage = 'Network error. Please check your connection and try again.';
            } else {
                errorMessage = error.message || errorMessage;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showError(errorMessage);
        console.error('Signup error:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (initDOM()) {
            setupEventListeners();
        }
    });
} else {
    // DOM already loaded
    if (initDOM()) {
        setupEventListeners();
    }
}

function setupEventListeners() {
    // Event Listeners
    if (form) {
        form.addEventListener('submit', handleSubmit);
        console.log('Form submit listener attached');
    } else {
        console.error('Signup form not found!');
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyApiKey);
    }

    if (retryBtn) {
        retryBtn.addEventListener('click', showForm);
    }
    
    // Real-time validation
    if (usernameInput) {
        usernameInput.addEventListener('blur', () => {
            if (!usernameInput.value.trim()) {
                usernameError.textContent = 'Username is required';
            } else if (usernameInput.value.trim().length < 3) {
                usernameError.textContent = 'Username must be at least 3 characters';
            } else if (!/^[a-zA-Z0-9_-]+$/.test(usernameInput.value.trim())) {
                usernameError.textContent = 'Username can only contain letters, numbers, underscores, and hyphens';
            } else {
                usernameError.textContent = '';
            }
        });
        
        usernameInput.addEventListener('input', () => {
            if (usernameError && usernameError.textContent) {
                usernameError.textContent = '';
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
            } else if (!validateEmail(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
            } else {
                emailError.textContent = '';
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailError && emailError.textContent) {
                emailError.textContent = '';
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            if (!passwordInput.value) {
                passwordError.textContent = 'Password is required';
            } else if (passwordInput.value.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters';
            } else {
                passwordError.textContent = '';
            }
        });
        
        passwordInput.addEventListener('input', () => {
            if (passwordError && passwordError.textContent) {
                passwordError.textContent = '';
            }
        });
    }
    
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (nameError && nameError.textContent) {
                nameError.textContent = '';
            }
        });
    }
    
    // Update year in footer
    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

