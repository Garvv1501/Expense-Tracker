// ELEMENTS

const balance =
    document.getElementById("balance");

const income =
    document.getElementById("income");

const expense =
    document.getElementById("expense");

const transactionForm =
    document.getElementById("transactionForm");

const text =
    document.getElementById("text");

const amount =
    document.getElementById("amount");

const type =
    document.getElementById("type");

const transactionList =
    document.getElementById("transactionList");

// LOCAL STORAGE

let transactions =
    JSON.parse(
        localStorage.getItem("transactions")
    ) || [];

// SAVE TO LOCAL STORAGE

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// UPDATE UI

function updateUI() {

    transactionList.innerHTML = "";

    let totalIncome = 0;

    let totalExpense = 0;

    transactions.forEach(transaction => {

        // CALCULATIONS

        if (
            transaction.type === "income"
        ) {

            totalIncome += transaction.amount;
        }

        else {

            totalExpense += transaction.amount;
        }

        // CREATE ITEM

        const li =
            document.createElement("li");

        li.classList.add("transaction");

        li.innerHTML = `

            <div class="transaction-info">

                <span class="transaction-name">
                    ${transaction.text}
                </span>

                <span class="transaction-type">
                    ${transaction.type}
                </span>

            </div>

            <div>

                <span class="amount ${transaction.type}">
                    ${
                        transaction.type === "income"
                        ? "+"
                        : "-"
                    } ₹${transaction.amount}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    Delete
                </button>

            </div>

        `;

        transactionList.appendChild(li);

    });

    const totalBalance =
        totalIncome - totalExpense;

    balance.textContent =
        `₹${totalBalance}`;

    income.textContent =
        `₹${totalIncome}`;

    expense.textContent =
        `₹${totalExpense}`;
}

// ADD TRANSACTION

transactionForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const transactionText =
            text.value.trim();

        const transactionAmount =
            Number(amount.value);

        if (
            transactionText === "" ||
            transactionAmount <= 0
        ) {

            alert(
                "Please enter valid details."
            );

            return;
        }

        const transaction = {

            id: Date.now(),

            text: transactionText,

            amount: transactionAmount,

            type: type.value

        };

        transactions.push(transaction);

        saveTransactions();

        updateUI();

        transactionForm.reset();

    }
);

// DELETE TRANSACTION

function deleteTransaction(id) {

    transactions =
        transactions.filter(
            transaction =>
                transaction.id !== id
        );

    saveTransactions();

    updateUI();
}

// INITIAL LOAD

updateUI();
