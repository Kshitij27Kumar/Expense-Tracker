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

init = () => {
  list.innerHTML = ''
  transactions.forEach(addTransactionDOM)
  updateValues()
}
init()
form.addEventListener('submit', addTransaction)
