let receipts = [];
let payments = [];

document.getElementById('add-receipts-btn').addEventListener('click', addReceipt);
document.getElementById('add-payments-btn').addEventListener('click', addPayment);
document.getElementById('export-btn').addEventListener('click', exportToExcel);

function addReceipt(event) {
    event.preventDefault();
    const date = document.getElementById('receipts-date').value;
    const billNo = document.getElementById('receipts-bill-no').value;
    const receiptsSource = document.getElementById('receipts-receipts').value;
    const details = document.getElementById('receipts-details').value;
    const ledgerFolio = document.getElementById('receipts-ledger-folio').value;
    const amount = document.getElementById('receipts-amount').value;

    const receipt = {
        date,
        billNo,
        receiptsSource,
        details,
        ledgerFolio,
        amount: parseFloat(amount)
    };

    receipts.push(receipt);
    updateReceiptsTable();
    updateProfitsTable();
    clearReceiptsForm();
}

function addPayment(event) {
    event.preventDefault();
    const date = document.getElementById('payments-date').value;
    const billNo = document.getElementById('payments-bill-no').value;
    const paymentsSource = document.getElementById('payments-payments').value;
    const details = document.getElementById('payments-details').value;
    const ledgerFolio = document.getElementById('payments-ledger-folio').value;
    const amount = document.getElementById('payments-amount').value;

    const payment = {
        date,
        billNo,
        paymentsSource,
        details,
        ledgerFolio,
        amount: parseFloat(amount)
    };

    payments.push(payment);
    updatePaymentsTable();
    updateProfitsTable();
    clearPaymentsForm();
}

function updateReceiptsTable() {
    const tbody = document.getElementById('receipts-tbody');
    tbody.innerHTML = '';

    receipts.forEach((receipt) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${receipt.date}</td>
            <td>${receipt.billNo}</td>
            <td>${receipt.receiptsSource}</td>
            <td>${receipt.details}</td>
            <td>${receipt.ledgerFolio}</td>
            <td>${receipt.amount}</td>
        `;
    });
}

function updatePaymentsTable() {
    const tbody = document.getElementById('payments-tbody');
    tbody.innerHTML = '';

    payments.forEach((payment) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${payment.date}</td>
            <td>${payment.billNo}</td>
            <td>${payment.paymentsSource}</td>
            <td>${payment.details}</td>
            <td>${payment.ledgerFolio}</td>
            <td>${payment.amount}</td>
        `;
    });
}

function updateProfitsTable() {
    const tbody = document.getElementById('profits-tbody');
    tbody.innerHTML = '';

    const dates = [...new Set([...receipts.map((r) => r.date), ...payments.map((p) => p.date)])];

    dates.forEach((date) => {
        const receiptsForDate = receipts.filter((r) => r.date === date);
        const paymentsForDate = payments.filter((p) => p.date === date);

        const totalReceipts = receiptsForDate.reduce((acc, curr) => acc + curr.amount, 0);
        const totalPayments = paymentsForDate.reduce((acc, curr) => acc + curr.amount, 0);
        const profit = totalReceipts - totalPayments;

        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${date}</td>
            <td>${totalReceipts}</td>
            <td>${totalPayments}</td>
            <td>${profit}</td>
        `;
    });
}

function clearReceiptsForm() {
    document.getElementById('receipts-date').value = '';
    document.getElementById('receipts-bill-no').value = '';
    document.getElementById('receipts-receipts').value = '';
    document.getElementById('receipts-details').value = '';
    document.getElementById('receipts-ledger-folio').value = '';
    document.getElementById('receipts-amount').value = '';
}

function clearPaymentsForm() {
    document.getElementById('payments-date').value = '';
    document.getElementById('payments-bill-no').value = '';
    document.getElementById('payments-payments').value = '';
    document.getElementById('payments-details').value = '';
    document.getElementById('payments-ledger-folio').value = '';
    document.getElementById('payments-amount').value = '';
}

function exportToExcel() {
    const workbook = XLSX.utils.book_new();
    const receiptsWS = XLSX.utils.json_to_sheet(receipts);
    const paymentsWS = XLSX.utils.json_to_sheet(payments);
    const profitsWS = XLSX.utils.json_to_sheet(getProfitsData());

    XLSX.utils.book_append_sheet(workbook, receiptsWS, 'Receipts');
    XLSX.utils.book_append_sheet(workbook, paymentsWS, 'Payments');
    XLSX.utils.book_append_sheet(workbook, profitsWS, 'Profits');

    XLSX.writeFile(workbook, 'cash_book.xlsx');
}
function getProfitsData() {
    const dates = [...new Set([...receipts.map((r) => r.date), ...payments.map((p) => p.date)])];
    const profitsData = dates.map((date) => {
        const receiptsForDate = receipts.filter((r) => r.date === date);
        const paymentsForDate = payments.filter((p) => p.date === date);

        const totalReceipts = receiptsForDate.reduce((acc, curr) => acc + curr.amount, 0);
        const totalPayments = paymentsForDate.reduce((acc, curr) => acc + curr.amount, 0);
        const profit = totalReceipts - totalPayments;

        return {
            Date: date,
            'Total Receipts': totalReceipts,
            'Total Payments': totalPayments,
            Profit: profit
        };
    });

    return profitsData;
}