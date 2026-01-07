document.addEventListener('DOMContentLoaded', (event) => {
    const balanceToggle = document.getElementById('balanceToggle');
    const balanceDisplay = document.querySelector('.blcdisp');
    const hideTextElement = document.querySelector('.hide-text');

    // Get the actual balance value stored in the data attribute
    const actualBalance = balanceDisplay.getAttribute('data-actual-balance');
    const hiddenBalance = '***** BTC'; // The masked value (adjust asterisks as needed)

    if (balanceToggle && balanceDisplay && hideTextElement) {
        function toggleBalanceVisibility() {
            if (balanceToggle.checked) {
                // If checked (hide balance mode), change text to asterisks
                balanceDisplay.textContent = hiddenBalance;
                hideTextElement.textContent = 'Show balance';
            } else {
                // If unchecked (show balance mode), restore the actual value
                balanceDisplay.textContent = actualBalance;
                hideTextElement.textContent = 'Hide balance';
            }
        }

        balanceToggle.addEventListener('change', toggleBalanceVisibility);

        // Call initially to set the state on page load
        toggleBalanceVisibility();
    } else {
        console.error("Error: One or more required HTML elements were not found.");
    }
});
