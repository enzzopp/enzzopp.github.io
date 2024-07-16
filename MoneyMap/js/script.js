const Modal = {
  init() {
    const btModal = document.querySelectorAll('[data-modal="button"]');
    btModal.forEach((btn) => btn.addEventListener('click', this.toggle));
  },
  toggle: (e) => {
    const modalArea = document.querySelector('[data-modal="modal"]');

    //Verifica se existe o button e o modal
    if (modalArea) {
      if (e) e.preventDefault();
      modalArea.classList.toggle('active');
    }
  },
};

const Storage = {
  get() {
    const local = localStorage.getItem('dev.finance:transactions');
    return JSON.parse(local) || [];
  },
  set(transactions) {
    localStorage.setItem(
      'dev.finance:transactions',
      JSON.stringify(transactions),
    );
  },
};

const Profile = {
  get() {
    const name = 'Usuário';
    const defaultIncome = 0 * 100;
    return { name, defaultIncome };
  }
}

const Transaction = {
  profile: Profile.get(),
  all: Storage.get(),
  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },
  remove(index) {
    confirm('Deseja realmente remover esta transação?') &&
    Transaction.all.splice(index, 1);
    App.reload();
  },
  update(index, transaction) {
    Transaction.all[index] = transaction;
  },
  incomes() {
    let income = this.profile.defaultIncome;
    this.all.forEach((item) => {
      if (item.type === 'income') {
        income += item.amount;
      }
    });

    return income;
  },
  expenses() {
    let expense = 0;
    this.all.forEach((item) => {
      if (item.type === 'expense') {
        expense -= item.amount;
      }
    });

    return expense;
  },
  pending() {
    let pending = 0;
    this.all.forEach((item) => {
        if (item.type === 'pending') {
            pending -= item.amount;
        }
    });

    return pending;
    },
    total() {
        return -(Transaction.expenses() + Transaction.pending());
    },
};

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = this.innerHTMLTransaction(transaction, index);
    // tr.dataset.index = index;
    this.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {

    const classAmount = transaction.type;
    const description = transaction.description;
    const amount = Utils.formatCurrency(transaction.amount);
    const type = Utils.formatType(transaction.type);
    const category = transaction.category;
    const date = transaction.date;

    const html = `
        <td class="description">${description}</td>
        <td class="${classAmount}">${amount}</td>
        <td class="type">${type}</td>
        <td class="category">${category}</td>
        <td class="date">${date}</td>
        <td>
          <img id="update" data-index="${index}" src="./assets/edit.svg" alt="Atualizar Transação" />
          <img id="delete" data-index="${index}" src="./assets/trash.svg" alt="Remover Transação" />
        </td>
      `;
    return html;
  },

  updateBalance() {
    const income = document.querySelector('.incomeDisplay');
    const expense = document.querySelector('.expenseDisplay');
    const pending = document.querySelector('.pendingDisplay');
    const total = document.querySelector('.totalDisplay');

    income.innerText = Utils.formatCurrency(Transaction.incomes());
    expense.innerText = Utils.formatCurrency(Transaction.expenses());
    pending.innerText = Utils.formatCurrency(Transaction.pending());
    total.innerText = Utils.formatCurrency(Transaction.total());
  },

  clearTransaction() {
    this.transactionsContainer.innerHTML = '';
  },
};

const Utils = {
  formatCurrency(value) {
    value = String(value).replace(/\D/g, '');
    value = Number(value) / 100;


    value = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    return value;
  },
  formatAmount(value) {
    value = value * 100;
    return Math.round(value);
  },
  formatType(value) {
    const optionsMap = {
      'expense': 'Despesa',
      'income': 'Receita',
      'pending': 'Pendente'
    };
    return optionsMap[value];
  },
  formatDate(date) {
    if (date.search('-') >= 0) {
      const splitDate = date.split('-');
      return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    } else {
      const splitDate = date.split('/');
      return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    }
  },
  monthTitle() {
    let month = new Date().toLocaleString('pt-br', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const year = new Date().getFullYear();
    return `${month} de ${year}`;
  },
};

const Alert = {
  direction: false,
  duration: 3000,
  createAlert(message, status) {
    const mainContainer = document.querySelector('main.container');
    const alert = document.createElement('div');
    const classAlert = status === 'success' ? 'success' : 'error';

    alert.id = 'alert';
    alert.classList.add(classAlert);
    alert.innerText = message;
    mainContainer.appendChild(alert);

    return alert;
  },
  removeAlert(alert) {
    alert.remove();
  },
  toggleAlert(alert) {
    alert.classList.remove('animation');
    alert.offsetWidth = alert.offsetWidth;

    if (this.direction) {
      alert.style.animationDirection = 'reverse';
      this.direction = !this.direction;
    } else {
      alert.style.animationDirection = '';
      this.direction = !this.direction;
    }

    alert.classList.add('animation');
  },
  action(message, status) {
    const alert = this.createAlert(message, status);
    this.toggleAlert(alert);
    setTimeout(() => {
      this.toggleAlert(alert);
    }, this.duration);
    setTimeout(() => {
      this.removeAlert(alert);
    }, this.duration + 500);
  },
};

const Form = {

  description: document.querySelector('#description'),
  amount: document.querySelector('#amount'),
  type: document.querySelector('#type'),
  category: document.querySelector('#category'),
  date: document.querySelector('#date'),
  btnSave: document.querySelector('#save'),
  btnCancel: document.querySelector('#cancel'),

  currentDate: new Date(),

  getValues() {
    const values = [this.description.value, this.amount.value, this.type.value, this.category.value, this.date.value];
    return values;
  },
  setValues(index) {
    const transaction = Transaction.all[index];
    this.description.value = transaction.description;
    this.amount.value = transaction.amount / 100;
    this.type.value = transaction.type;
    this.category.value = transaction.category;
    this.date.value = Utils.formatDate(transaction.date);
    this.btnSave.dataset.update = index;

    document.querySelectorAll('.type-button').forEach(btn => {
      btn.getAttribute('data-type') === transaction.type && btn.classList.add('selected');
    }
    );
    
  },
  validateFields() {
    const values = this.getValues();
    values.forEach((value) => {
      if (value.trim() === '') {
        throw new Error('Por favor preencha todos os campos!');
      }
    });
  },
  formatValues() {
    let [description, amount, type, category, date] = this.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return { description, amount, type, category, date };
  },
  saveTransaction(transaction) {
    Transaction.add(transaction);
  },
  updateTransaction(index, transaction) {
    Transaction.update(index, transaction);
    this.btnSave.removeAttribute('data-update');
  },
  clearFields() {

    const currentDate = new Date();
    document.querySelector('#modal-title').innerHTML = 'Novo Registro';

    document.querySelectorAll('.type-button').forEach(btn => {
      btn.classList.remove('selected');
    });

    Form.description.value = '';
    Form.amount.value = '';
    Form.type.value = '';
    Form.category.value = '';
    Form.date.value = currentDate.toISOString().split('T')[0];
  },
  update(index) {
    Form.setValues(index);
    Modal.toggle();
  },
  direction: false,
  save(e) {
    e.preventDefault();
    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      const updateIndex = Form.btnSave.dataset.update;
      if (updateIndex) {
        Form.updateTransaction(updateIndex, transaction);
      } else {
        Form.saveTransaction(transaction);
      }
      Form.clearFields();
      Modal.toggle();
      App.reload();
      Alert.action('Registro salvo com sucesso!', 'success');
    } catch (error) {
      Alert.action(error.message, 'error');
    }
  },
  cancel(e) {
    Form.clearFields();
    Modal.toggle(e);
  },
};

const App = {
  init() {
    Transaction.all.forEach((item, index) => {
      DOM.addTransaction(item, index);
    });

    DOM.updateBalance();
    Storage.set(Transaction.all);

    const btnUpdate = document.querySelectorAll('#data-table #update');
    const btnRemove = document.querySelectorAll('#data-table #delete');

    const currentDate = new Date();
    document.querySelector('#date').value = currentDate.toISOString().split('T')[0];
    document.querySelector('#monthTitle').innerHTML = Utils.monthTitle();

    Form.btnCancel.addEventListener('click', Form.cancel);
    Form.btnSave.addEventListener('click', Form.save);

    document.querySelectorAll('.type-button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.type-button').forEach(btn => {
          btn.classList.remove('selected');
          btn.blur();
        });
        button.classList.add('selected');
        document.getElementById('type').value = button.getAttribute('data-type');
        button.focus();
      });
    });

    btnUpdate.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelector('#modal-title').innerHTML = 'Editar Registro';
        Form.update(e.target.dataset.index);
      });
    });

    btnRemove.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        Transaction.remove(e.target.dataset.index);
      });
    });
    
  },

  reload() {
    DOM.clearTransaction();
    App.init();
  },
};

Modal.init();
App.reload();
