const balance = document.getElementById('balance'),
  money_plus = document.getElementById('money-plus'),
  money_minus = document.getElementById('money-minus'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []

function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add text and amount')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: amount.value,
    }
    transactions.push(transaction)
    addTransactionDOM(transaction)
    updateValues()
    updateLocalStorage()

    text.value = ''
    amount.value = ''
  }
}

function generateID() {
  return Math.floor(Math.random() * 1000000)
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>`

  list.appendChild(item)
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount)

  const total = amounts.reduce((acc, item) => (acc += Number(item)), 0)
  balance.innerHTML = `$${total}`

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += Number(item)), 0)
  money_plus.innerHTML = `$${income}`

  if (amounts.length) {
    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => ((acc += Number(item)), 0) * -1)
    money_minus.innerHTML = `$${income - total}`
  }
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id)
  updateLocalStorage()
  init()
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

function init() {
  list.innerHTML = ''
  transactions.forEach(addTransactionDOM)
  updateValues()
}
//init()
form.addEventListener('submit', addTransaction)
