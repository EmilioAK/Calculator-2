const calculator = document.getElementById('calculator');
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

calculator.addEventListener('click', (event) => {
  const target = event.target;
  const { type, value } = target.dataset;
  if (!type || !value) {
    return;
  }
  dispatch({ type, value });
}, true);

function dispatch(event) {
  state = reduce(state, event);
  render();
}

function whereToPlaceNumber() {
  if (state.operation.length === 0) {
    return 'firstNum';
  }
  return 'secondNum';
}

function dispatch({ type, value }) {
  switch (type) {
    case 'digit': {
      const activeElement = whereToPlaceNumber();
      if (state[activeElement] === '0') {
        state[activeElement] = value;
      } else {
        state[activeElement] += value;
      }
      break;
    }

    case 'operator':
      if (state.firstNum.length === 0) {
        return;
      }
      if (state.secondNum.length != 0) {
        state.firstNum = operate(state.operation, state.firstNum, state.secondNum);
        state.secondNum = '';
      }
      state.operation = value;
      break;

    case 'decimal': {
      const activeElement = whereToPlaceNumber();
      if (!state[activeElement].includes('.')) {
        if (state[activeElement].length === 0) {
          state[activeElement] = '0.';
        } else {
          state[activeElement] += value;
        }
      }
      break;
    }

    case 'zero': {
      const activeElement = whereToPlaceNumber();
      if (state[activeElement].length === 0 || state[activeElement] === '0') {
        state[activeElement] = '0.';
      } else {
        state[activeElement] += value;
      }
      break;
    }

    case 'fn':
      switch (value) {
        case 'equals':
          if (state.secondNum.length > 0) {
            state.firstNum = operate(state.operation, state.firstNum, state.secondNum);
            state.operation = '';
            state.secondNum = '';
          }
          break;

        case 'backspace':
          if (state.secondNum.length > 0) {
            state.secondNum = state.secondNum.slice(0, -1);
          } else if (state.operation.length != 0) {
            state.operation = '';
          } else {
            state.firstNum = state.firstNum.slice(0, -1);
          }
          break;

        case 'clear':
          state = {
            "firstNum": '',
            "operation": '',
            "secondNum": '',
          };
        break;
      }
      break;
  }
  return state;
}
