/* Globals */
let incomeBal = 0;

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
 * 
 * @return {void}
*/
function calculateExpenseAndBalance() {
    try {
        if ( inititalIncomeExpenseInputCheck() ) {
            return;
        }

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

        // Check if negative
        if ( income < 0 || food < 0 || rent < 0 || clothes < 0 ) {
            setErrorModalContents('Invalid Input', 'Please enter non negative numbers.');
            toggleErrorModal();
            return;
        }
    
        // Check if expenses are larger than income.
        if ( totalExpense > income ) {
            setErrorModalContents('Invalid Input', 'Total expenses cannot be larger than income.');
            toggleErrorModal();
            return;
        }
        
        incomeBal = income;
        const result = income - totalExpense;
    
        // Display results.
        expenseDisplay.innerText = totalExpense?.toFixed(2);
        balanceDisplay.innerText = result?.toFixed(2);
        
        // Reset input fields.
        resetIncomeExpensesInputFields();
    } catch(error) {
        setErrorModalContents('Error', `${error.message}`);
        toggleErrorModal();
    }
}

/** 
 * Calculate savings and display Savings amount and remaining balance.
 * 
 * @return {void}
*/
function calculateSavings() {
    try {
        if ( inititalSavingsInputCheck() ) {
            return;
        }

        const currentBalance = parseFloat(balanceDisplay.innerText);
        const percentage = parseFloat(percentageInput.value);
    
        const savingAmount = incomeBal * (percentage / 100);
        const remainingBalance = currentBalance - savingAmount;
    
        // Check for invalid inputs.
        if ( isNaN(percentage) ) {
            setErrorModalContents('Invalid Input', 'Please enter valid percentage.');
            toggleErrorModal();
            return;
        }
        
        // Check for negative inputs.
        if ( percentage < 0 ) {
            setErrorModalContents('Invalid Input', 'Please enter non negative percentage value.');
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
        
        // Reset input fields.
        resetPercentageInputFields();
    } catch(error) {
        setErrorModalContents('Error', `${error.message}`);
        toggleErrorModal();
    }
}

/** 
 * Reset income and expenses input fields.
 * 
 * @return {void}
*/
function resetIncomeExpensesInputFields() {
    incomeInput.value = '';
    foodInput.value = '';
    rentInput.value = '';
    clothesInput.value = '';
}

/** 
 * Reset percentage input field.
 * 
 * @return {void}
*/
function resetPercentageInputFields() {
    percentageInput.value = '';
}



/** 
 * Show error if any income and expenses inputs are empty.
 * 
 * @return {boolean}
*/
function inititalIncomeExpenseInputCheck() {
    const initialExpenseInputs = [incomeInput.value, foodInput.value, rentInput.value, clothesInput.value];
    const anyEmptyInput = initialExpenseInputs.some(input => input === '');
    
    if (anyEmptyInput) {
        setErrorModalContents('Error', 'Please enter income and all expense values properly. Don\'t leave any empty.');
        toggleErrorModal();

        return true;
    }

    return false;
}

/** 
 * Show error if Percentage input is empty.
 * 
 * @return {boolean}
*/
function inititalSavingsInputCheck() {
       if ( percentageInput.value === '' ) {
        setErrorModalContents('Error', 'Please enter percentage values properly. Don\'t leave it empty.');
        toggleErrorModal();

        return true;
    }

    return false;
}

/** 
 * Toggle error modal.
 * 
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
 * 
 * @param {string} title - Error title.
 * @param {string} message - Error message.
 * @return {void}
*/
function setErrorModalContents(title, message) {
    errorTitle.innerText = title;
    errorMessage.innerText = message;
}

/** 
 * Fix background.
 * 
 * @return {void}
*/
function fixBackgroundImage() {
    const backgroundImage = document.getElementById('background');

    if ( window.innerWidth >= 768 && window.innerWidth < 1024 ) {
        backgroundImage.classList.add('h-[220px]');
        backgroundImage.style.height = '';
    } else if(  window.innerWidth < 768 ) {
        const documentOffsetHeight = document.body.offsetHeight
        backgroundImage.style.height = `${documentOffsetHeight}px`;
    } else {
        backgroundImage.style.height = '100%';
    }
}

/* Event listeners */
calcExpenseBtn.addEventListener('click', calculateExpenseAndBalance);
calcSavingsBtn.addEventListener('click', calculateSavings);
errorModalCloseBtn.addEventListener('click', toggleErrorModal);

// Fix background image size.
window.addEventListener('DOMContentLoaded', fixBackgroundImage);
window.addEventListener('resize', fixBackgroundImage);
// Remove event listener before unload.
window.addEventListener('beforeunload', () => {
    window.removeEventListener('DOMContentLoaded', fixBackgroundImage);
    window.removeEventListener('resize', fixBackgroundImage);
});