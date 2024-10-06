// Get the receipts table element
const receiptsTable = document.getElementById('receiptsTable');

// Get the payments table element
const paymentsTable = document.getElementById('paymentsTable');

// Function to calculate total receipts for a specific date
function calculateTotalReceipts(date) {
  let totalReceipts = 0;
  receiptsTable.rows.forEach((row) => {
    const dateCell = row.cells[0]; // assuming date is in the 2nd column
    if (dateCell.textContent === date) {
      const amountCell = row.cells[5]; // assuming amount is in the 1st column
      totalReceipts += parseFloat(amountCell.textContent);
    }
  });
  return totalReceipts;
}

// Function to calculate total payments for a specific date
function calculateTotalPayments(date) {
  let totalPayments = 0;
  paymentsTable.rows.forEach((row) => {
    const dateCell = row.cells[0]; // assuming date is in the 2nd column
    if (dateCell.textContent === date) {
      const amountCell = row.cells[5]; // assuming amount is in the 1st column
      totalPayments += parseFloat(amountCell.textContent);
    }
  });
  return totalPayments;
}

// Function to calculate profit for a specific date
function calculateProfit(date) {
  const totalReceipts = calculateTotalReceipts(date);
  const totalPayments = calculateTotalPayments(date);
  return totalReceipts - totalPayments;
}

// Input box for selecting date
const dateInput = document.getElementById('dateInput');

// Button to display results
const displayButton = document.getElementById('displayButton');

// ... (rest of the code remains the same)

displayButton.addEventListener('click', () => {
  const selectedDate = dateInput.value;
  const totalReceipts = calculateTotalReceipts(selectedDate);
  const totalPayments = calculateTotalPayments(selectedDate);
  const profit = calculateProfit(selectedDate);

  // Update HTML elements with the results
  document.getElementById('totalReceipts').textContent = `Receipts on ${selectedDate}: ${totalReceipts}`;
  document.getElementById('totalPayments').textContent = `Payments on ${selectedDate}: ${totalPayments}`;
  document.getElementById('profit').textContent = `Profit on ${selectedDate}: ${profit}`;
});