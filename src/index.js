import { monthly_rates, transactions } from "./data.js";
import "./styles.css";

var transactionsValue;
var outOfSequence = [];
var correctedTransactionsSequence = [];
var transactionsSequence = [];

for (let index = 0; index < transactions.length; index++) {
  const { sequence_number, book_date, account_id, value } = transactions[index];
  for (let index = 0; index < monthly_rates.length; index++) {
    const { effective_date, multiplier } = monthly_rates[index];
    if (effective_date === book_date) {
      transactionsValue = value * multiplier;
    }
  }
  const date = book_date.split("-")[2];
  if (sequence_number < parseInt(date)) {
    outOfSequence += `[sequence#: ${sequence_number} date:${book_date} account: ${account_id} value:${value}],  `;

    correctedTransactionsSequence += `[sequence#: ${sequence_number} date:${book_date.replace(
      date,
      `0${sequence_number}`
    )} account: ${account_id} value:${value}],  `;
  } else {
    transactionsSequence += `[sequence#: ${sequence_number} date:${book_date} account: ${account_id} value:${value}],  `;
  }
}

document.getElementById("app").innerHTML = `
<h1>Interview Exercise</h1>
<div>
  Welcome to your CodeSandbox-powered interview! There are five problems to solve in total, start with the first and
  work through as many as time permits. <br />

  Please read through data.js to familiarize yourself with the data we're working with. You may simply console.log your solutions
  but it's preferred if you write the solution to the DOM.
</div>

<br />
<br />

<p>
#1. Print the total (rate-adjusted) transactional value of each account.  <br/>
  note: to calculate the rate adjusted value of a given transaction, find the rate that was effective on the
        transaction's book_date and multiply the rate's multiplier by the transaction's value.
  <br />
  <span id="solution-problem-1"></span>
</p>
${Math.round(transactionsValue)}
<br />
<br />
<br />


<p>
#2. - Find every out of sequence transaction <b>per account</b>.<br />
     note: a transaction is out of sequence if its book date is earlier than any preceding transaction when ordered by sequence number
  <br />
  <span id="solution-problem-2"></span>
</p>
${outOfSequence}

<br />
<br />
<br />

<p>
#3. - Construct a new transaction list where the out-of-sequence transactions are corrected.
  <br />
  <span id="solution-problem-3"></span>
</p>
${correctedTransactionsSequence}

`;
