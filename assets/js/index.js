/* Inputs */
const incomeInput = document.getElementById('income');
const foodInput = document.getElementById('food');
const rentInput = document.getElementById('rent');
const clothesInput = document.getElementById('clothes');
const percentageInput = document.getElementById('percentage');

/* Error Modal */
const errorModal = document.getElementById('error-modal');
const errorModalInner = document.getElementById('error-modal-inner');
const errorTitle = document.getElementById('error-title');
const errorMessage = document.getElementById('error-message');

/* Action buttons */
const calcExpenseBtn = document.getElementById('calc-expenses');
const calcSavingsBtn = document.getElementById('calc-savings');
const errorModalCloseBtn = document.getElementById('error-close');

/* Displays */
const expenseDisplay = document.getElementById('expense-display');
const balanceDisplay = document.getElementById('balance-display');
const savingAmountDisplay = document.getElementById('saving-amount');
const remainingBalanceDisplay = document.getElementById('remaining-balance');

/* Functions */

/** 
 * Calculate expenses and display expenses and remaining balance.
 * @return {void}
*/
function calculateExpenseAndBalance() {
    try {
        const income = parseFloat(incomeInput.value);
        const food = parseFloat(foodInput.value);
        const rent = parseFloat(rentInput.value);
        const clothes = parseFloat(clothesInput.value);
        
        const totalExpense = food + rent + clothes;
    
        // Check for invalid inputs.
        if ( isNaN(income) || isNaN(food) || isNaN(rent) || isNaN(clothes) ) {
            setErrorModalContents('Invalid Input', 'Please enter valid numbers.');
            toggleErrorModal();
            return;
        }
    
        // Check if expenses are larger than income.
        if ( totalExpense > income ) {
            setErrorModalContents('Invalid Input', 'Total expenses cannot be larger than income.');
            toggleErrorModal();
            return;
        }
    
        const result = income - totalExpense;
    
        // Display results.
        expenseDisplay.innerText = totalExpense?.toFixed(2);
        balanceDisplay.innerText = result?.toFixed(2);
    } catch(error) {
        setErrorModalContents('Error', `${error.message}`);
        toggleErrorModal();
    }
}

/** 
 * Calculate savings and display Savings amount and remaining balance.
 * @return {void}
*/
function calculateSavings() {
    try {
        const currentBalance = parseFloat(balanceDisplay.innerText);
        const percentage = parseFloat(percentageInput.value);
    
        const savingAmount = currentBalance * (percentage / 100);
        const remainingBalance = currentBalance - savingAmount;
    
        // Check for invalid inputs.
        if ( isNaN(percentage) ) {
            setErrorModalContents('Invalid Input', 'Please enter valid percentage.');
            toggleErrorModal();
            return;
        }
    
        // Check if percentage is larger than 100.
        if ( savingAmount > currentBalance || percentage > 100.0 ) {
            setErrorModalContents('Invalid Input', 'Saving amount cannot be larger than current balance.');
            toggleErrorModal();
            return;
        }
    
        // Display results.
        savingAmountDisplay.innerText = savingAmount?.toFixed(2);
        remainingBalanceDisplay.innerText = remainingBalance?.toFixed(2);
    } catch(error) {
        setErrorModalContents('Error', `${error.message}`);
        toggleErrorModal();
    }
}

/** 
 * Toggle error modal.
 * @return {void}
*/
function toggleErrorModal() {
    if (errorModal.classList.contains('invisible')) {
        errorModal.classList.remove('invisible');
        
        errorModalInner.classList.add('modal-enter-animation');
        errorModalInner.classList.remove('modal-exit-animation');
        
        errorModal.classList.add('modal-overlay-enter-animation');
        errorModal.classList.remove('modal-overlay-exit-animation');
        
    } else {
        errorModal.classList.add('invisible');
        
        errorModalInner.classList.remove('modal-enter-animation');
        errorModalInner.classList.add('modal-exit-animation');

        errorModal.classList.remove('modal-overlay-enter-animation');
        errorModal.classList.add('modal-overlay-exit-animation');
    }
}

/** 
 * Set error modal contents.
 * @param {string} title - Error title.
 * @param {string} message - Error message.
 * @return {void}
*/
function setErrorModalContents(title, message) {
    errorTitle.innerText = title;
    errorMessage.innerText = message;
}

/* Event listeners */
calcExpenseBtn.addEventListener('click', calculateExpenseAndBalance);
calcSavingsBtn.addEventListener('click', calculateSavings);
errorModalCloseBtn.addEventListener('click', toggleErrorModal);