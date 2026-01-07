document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    // Input Elements
    const fullNameInput = document.getElementById('fullname');
    const countryInput = document.getElementById('country');
    const countryCodeInput = document.getElementById('country-code');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('psw');
    const passwordRepeatInput = document.getElementById('psw-repeat');
    const termsCheckbox = document.getElementById('terms'); 
    
    // Error Message Elements
    const fullNameError = document.getElementById('fullname-error');
    const countryError = document.getElementById('country-error');
    const countrycodeError = document.getElementById('countrycode-error');
    const phoneError = document.getElementById('phone-error');
    const emailError = document.getElementById('email-error');
    const pswError = document.getElementById('psw-error');
    const pswRepeatError = document.getElementById('psw-repeat-error');
    const termsError = document.getElementById('terms-error'); 

    // Validation Regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const passwordRegex = /^\d{6}$/; 

    // Real-time Digit Enforcement (Password fields only)
    [passwordInput, passwordRepeatInput].forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, ''); 
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Stop form from linking to next page immediately
        
        // 1. Reset all previous errors
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        
        // 2. Reset visual styles for all inputs and selects
        document.querySelectorAll('input, select').forEach(element => {
            element.classList.remove('invalid-field');
        });

        let isValid = true;
        
        // --- VALIDATION LOGIC ---

        // Full Name (Two words)
        const fullNameValue = fullNameInput.value.trim();
        const nameParts = fullNameValue.split(/\s+/); // Splits by any whitespace
        if (nameParts.length < 2 || nameParts.some(part => part === '')) {
            fullNameError.textContent = 'Please enter both First and Last Name.';
            fullNameInput.classList.add('invalid-field');
            isValid = false;
        }

        // Country Select
        if (!countryInput.value) {
            countryError.textContent = 'Please select your country.';
            countryInput.classList.add('invalid-field');
            isValid = false;
        }

        // Country Code Select (Fixed Logic)
        if (!countryCodeInput.value) {
            countrycodeError.textContent = 'Please select your country code.';
            countryCodeInput.classList.add('invalid-field');
            isValid = false;
        }

        // Phone Number
        const phoneValue = phoneInput.value.trim();
        if (!phoneValue || !phoneRegex.test(phoneValue)) {
            phoneError.textContent = 'Please enter a valid phone number.';
            phoneInput.classList.add('invalid-field');
            isValid = false;
        }

        // Email
        const emailValue = emailInput.value.trim();
        if (!emailValue || !emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('invalid-field');
            isValid = false;
        }

        // Password (exactly 6 digits)
        const pswValue = passwordInput.value;
        if (!passwordRegex.test(pswValue)) { 
            pswError.textContent = 'Password must be exactly 6 digits.';
            passwordInput.classList.add('invalid-field');
            isValid = false;
        }

        // Passwords Match
        const pswRepeatValue = passwordRepeatInput.value;
        if (pswValue !== pswRepeatValue) {
            pswRepeatError.textContent = 'Passwords do not match.';
            passwordRepeatInput.classList.add('invalid-field');
            isValid = false;
        }

        // Terms Checkbox
        if (termsCheckbox && !termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms.';
            isValid = false;
        }

        // --- FINAL SUBMISSION ---
        if (isValid) {
            const btn = document.querySelector('.registerbtn');
            btn.textContent = "Processing...";
            btn.style.opacity = "0.7";
            btn.disabled = true; // Prevent multiple clicks

            // Delay for 1 second then redirect via form action
            setTimeout(() => {
                // This is more reliable than form.submit() for simple page links
                window.location.href = "../login/index.html"; 
            }, 1000); 

        }


    });
    
});
