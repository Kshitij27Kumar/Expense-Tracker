const balance = document.getElementById('balance'),
  money_plus = document.getElementById('money-plus'),
  money_minus = document.getElementById('money-minus'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount')

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'))

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransaction : []

addTransaction = (e) => {
  e.preventDefault()

  if (text.value.trim() === '') {
    alert('Please add text')
  } else if (amount.value.trim === '') {
    alert('Please add amount')
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

generateID = () => {
  return Math.floor(Math.random() * 1000000)
}

addTransactionDOM = (transaction) => {
  const sign = transaction.amount > 0 ? '+' : '-'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onClick="remove Transaction(${
    transaction.id
  })">x</button>`

  list.appendChild(item)
}

init = () => {
  list.innerHTML = ''
  transactions.forEach(addTransactionDOM)
  updateValues()
}
init()
form.addEventListener('submit', addTransaction)
