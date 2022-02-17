/* Inputs */
const incomeInput = document.getElementById('income');
const foodInput = document.getElementById('food');
const rentInput = document.getElementById('rent');
const clothesInput = document.getElementById('clothes');
const percentageInput = document.getElementById('percentage');

/* Action buttons */
const calcExpenseBtn = document.getElementById('calc-expenses');
const calcSavingsBtn = document.getElementById('calc-savings');

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

    if ( totalExpense > income ) {
        alert('You have spent more than your income!');
        return;
    }

    const result = income - totalExpense;

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

/* Event listeners */
calcExpenseBtn.addEventListener('click', calculateExpenseAndBalance);
calcSavingsBtn.addEventListener('click', calculateSavings);