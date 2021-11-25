const operationButtons = document.getElementsByClassName('operationButton');
const numberButtons = document.getElementsByClassName('numberButton');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');
const zero = document.getElementById('zero');

const firstNum = document.getElementById('firstNum');
const operation = document.getElementById('operation');
const secondNum = document.getElementById('secondNum');

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function operate(operation, n1, n2) {
  return operations[operation](parseFloat(n1), parseFloat(n2));
}

let state = {
  "firstNum": '',
  "operation": '',
  "secondNum": '',
};

function render() {
  firstNum.textContent = state.firstNum;
  operation.textContent = state.operation;
  secondNum.textContent = state.secondNum;
}
render();

function whereToPlaceNumber() {
  if (state.operation.length === 0) {
    return 'firstNum';
  }
  return 'secondNum';
}

for (const button of numberButtons) {
  button.addEventListener('click', () => {
    const activeElement = whereToPlaceNumber();
    if (state[activeElement] === '0') {
      state[activeElement] = button.dataset.value;
    } else {
      state[activeElement] += button.dataset.value;
    }
    render();
  });
}

for (const button of operationButtons) {
  button.addEventListener('click', () => {
    if (state.firstNum.length === 0) return;

    if (state.secondNum.length != 0) {
      state.firstNum = operate(state.operation, state.firstNum, state.secondNum);
      state.secondNum = '';
    }
    state.operation = button.dataset.value;
    render();
  });
}

decimal.addEventListener('click', () => {
  const activeElement = whereToPlaceNumber();
  if (!state[activeElement].includes('.')) {
    if (state[activeElement].length === 0) {
      state[activeElement] = '0.';
    } else {
      state[activeElement] += decimal.dataset.value;
    }
    render();
  }
});

zero.addEventListener('click', () => {
  const activeElement = whereToPlaceNumber();
  if (state[activeElement].length === 0 || state[activeElement] === '0') {
    state[activeElement] = '0.';
  } else {
    state[activeElement] += zero.dataset.value;
  }
  render();
});

equals.addEventListener('click', () => {
  if (state.secondNum.length > 0) {
    state.firstNum = operate(state.operation, state.firstNum, state.secondNum);
    state.operation = '';
    state.secondNum = '';
  }
  render();
});

backspace.addEventListener('click', () => {
  if (state.secondNum.length > 0) {
    state.secondNum = state.secondNum.slice(0, -1);
  } else if (state.operation.length != 0) {
    state.operation = '';
  } else {
    state.firstNum = state.firstNum.slice(0, -1);
  }
  render();
});

clear.addEventListener('click', () => {
  state = {
    "firstNum": '',
    "operation": '',
    "secondNum": '',
  };
  render();
});