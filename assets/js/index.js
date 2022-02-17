/* Inputs */
const incomeInput = document.getElementById('income');
const foodInput = document.getElementById('food');
const rentInput = document.getElementById('rent');
const clothesInput = document.getElementById('clothes');
const percentageInput = document.getElementById('percentage');

/* Error Modal */
const errorModal = document.getElementById('error-modal');
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
    const income = parseFloat(incomeInput.value);
    const food = parseFloat(foodInput.value);
    const rent = parseFloat(rentInput.value);
    const clothes = parseFloat(clothesInput.value);
    
    const totalExpense = food + rent + clothes;

    // Check for invalid inputs.
    if ( isNaN(income) || isNaN(food) || isNaN(rent) || isNaN(clothes) ) {
        toggleErrorModal();
        setErrorModalContents('Invalid Input', 'Please enter valid numbers.');
        return;
    }

    // Check if expenses are larger than income.
    if ( totalExpense > income ) {
        toggleErrorModal();
        setErrorModalContents('Invalid Input', 'Total expenses cannot be larger than income.');
        return;
    }

    const result = income - totalExpense;

    // Display results.
    expenseDisplay.innerText = totalExpense;
    balanceDisplay.innerText = result;
}

/** 
 * Calculate savings and display Savings amount and remaining balance.
 * @return {void}
*/
function calculateSavings() {
    const currentBalance = parseFloat(balanceDisplay.innerText);
    const percentage = parseFloat(percentageInput.value);

    const savingAmount = currentBalance * (percentage / 100);
    const remainingBalance = currentBalance - savingAmount;

    if ( savingAmount > currentBalance ) {
        alert('Saving amount is larger than current balance!');
        return;
    }

    savingAmountDisplay.innerText = savingAmount;
    remainingBalanceDisplay.innerText = remainingBalance;
}

/** 
 * Toggle error modal.
 * @return {void}
*/
function toggleErrorModal() {
    if (errorModal.classList.contains('invisible')) {
        errorModal.classList.remove('invisible');
    } else {
        errorModal.classList.add('invisible');
    }
}

/** 
 * Set error modal contents.
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