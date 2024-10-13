 // Function to get expenses from local storage
 function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Function to save an expense to local storage
function saveExpense(expense) {
    const expenses = getExpenses();
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to display saved expenses
function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear the list

    const expenses = getExpenses();
    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <strong>Date:</strong> ${expense.date} <br>
            <strong>Amount:</strong> ${expense.amount} <br>
            <strong>Category:</strong> ${expense.category} <br>
            <strong>Comment:</strong> ${expense.comment || 'N/A'} <br>
            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses(); // Refresh the list
}

// Event listener for form submission
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const comment = document.getElementById('comment').value;

    const expense = { date, amount, category, comment };
    saveExpense(expense);

    // Clear the form
    document.getElementById('expense-form').reset();

    // Display updated expenses
    displayExpenses();
});

// Initial call to display existing expenses
displayExpenses();