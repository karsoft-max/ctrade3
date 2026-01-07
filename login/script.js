document.addEventListener('DOMContentLoaded', () => {
    const accountInput = document.getElementById('account-number');
    const passwordInput = document.getElementById('password');
    const signInButton = document.querySelector('.sign-in-button');

    const ACCT_LENGTH = 10;
    const PWD_LENGTH = 6;

    function toggleSignInButton() {
        const accountValid = accountInput.value.length === ACCT_LENGTH;
        const passwordValid = passwordInput.value.length === PWD_LENGTH;
        signInButton.disabled = !(accountValid && passwordValid);
    }

    function updateInputState(inputElement, isBlurred = false) {
        // Force digits only by removing anything that is not a number
        inputElement.value = inputElement.value.replace(/\D/g, ''); 

        const errorId = inputElement.getAttribute('data-error-id');
        const errorMessage = document.getElementById(errorId);
        const requiredLength = inputElement.id === 'account-number' ? ACCT_LENGTH : PWD_LENGTH;
        const valLength = inputElement.value.length;

        // --- UPDATED LOGIC HERE ---
        // Show "Cannot be empty" only if the field is empty AND it has been blurred (touched)
        if (valLength === 0 && isBlurred) {
            errorMessage.classList.remove('hidden');
        } else {
            errorMessage.classList.add('hidden');
        }
        // --- END UPDATED LOGIC ---

        // Apply visual states (Red border if empty, Green background if complete)
        if (valLength === requiredLength) {
            inputElement.classList.remove('error');
            inputElement.classList.add('valid-input');
        } else {
            inputElement.classList.remove('valid-input');
            if (valLength === 0 && isBlurred) { // Also apply red border only if blurred
                inputElement.classList.add('error');
            } else {
                inputElement.classList.remove('error'); 
            }
        }
    }

    [accountInput, passwordInput].forEach(input => {
        // The 'input' event catches typing, pasting, and deletions
        input.addEventListener('input', () => {
            updateInputState(input); // Do not mark as blurred yet
            toggleSignInButton();
        });

        // Add a 'blur' event listener to mark the field as touched
        input.addEventListener('blur', () => {
            updateInputState(input, true); // Mark as blurred (true)
            // No need to call toggleSignInButton() again here as 'input' already handles it
        });
    });

    // Initially hide all errors when the page loads
    document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
    toggleSignInButton();
});
