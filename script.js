import { db, collection, addDoc, onSnapshot } from "./firebase.js";

const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");

let totalBalance = 0;
let totalIncome = 0;
let totalExpenses = 0;

// Add transaction to Firebase
transactionForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!description || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }

    try {
        await addDoc(collection(db, "transactions"), {
            description,
            amount,
            type,
            timestamp: new Date()
        });
        transactionForm.reset();
    } catch (error) {
        console.error("Error adding transaction:", error);
    }
});

// Fetch and display transactions
onSnapshot(collection(db, "transactions"), (snapshot) => {
    transactionList.innerHTML = "";
    totalBalance = 0;
    totalIncome = 0;
    totalExpenses = 0;

    snapshot.forEach((doc) => {
        const data = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `${data.description}: $${data.amount} (${data.type})`;

        transactionList.appendChild(listItem);

        if (data.type === "income") {
            totalIncome += data.amount;
        } else {
            totalExpenses += data.amount;
        }
    });

    totalBalance = totalIncome - totalExpenses;
    balanceEl.textContent = `$${totalBalance.toFixed(2)}`;
    incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    expensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
});
