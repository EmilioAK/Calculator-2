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

const operate = (operation, n1, n2) => {
  return operations[operation](parseFloat(n1), parseFloat(n2));
}

let state = {
  value: '',
  operation: '',
  stack: '',
};

const render = () => {
  if (state.operation) {
    firstNum.textContent = state.stack;
    operation.textContent = state.operation;
    secondNum.textContent = state.value;
  } else {
    firstNum.textContent = state.value;
    operation.textContent = state.operation
    secondNum.textContent = '';
  }
};
render();

calculator.addEventListener('click', (event) => {
  const target = event.target;
  const { type, value } = target.dataset;
  if (!type || !value) {
    return;
  }
  dispatch({ type, value });
}, true);

const dispatch = (event) => {
  state = reduce(state, event);
  render();
};

const appendDigit = (prefix, digit) => {
  if (prefix === '0') {
    return digit;
  } else {
    return prefix + digit;
  }
};

const appendDecimal = (value) => {
  if (!value.includes('.')) {
    if (value.length === 0) {
      return '0.';
    } else {
      return value + '.';
    }
  }

  return value;
};

const pushOperator = (state, operation) => {
  let { stack, value } = state;
  if (value.length === 0 && stack.length === 0) {
    return state;
  }

  if (value.length > 0 && stack.length > 0) {
    value = String(operate(state.operation, stack, value));
    stack = '';
  }

  return {
    stack: value || stack,
    value: '',
    operation,
  };
};

const reduce = (state, { type, value }) => {
  switch (type) {
    case 'digit':
      return {
        ...state,
        value: appendDigit(state.value, value),
      };

    case 'operator':
      return pushOperator(state, value);

    case 'decimal':
      return {
        ...state,
        value: appendDecimal(state.value),
      };

    case 'fn':
      return reduceFnKey(state, value)

    default:
      return state;
  }
};

const reduceFnKey = (state, fn) => {
  switch (fn) {
    case 'equals':
      if (state.value.length === 0 || state.stack.length === 0) {
        return state;
      }

      return {
        value: String(operate(state.operation, state.stack, state.value)),
        stack: '',
        operation: '',
      };

    case 'backspace':
      if (state.value.length > 0) {
        return {
          ...state,
          value: state.value.slice(0, -1),
        };
      } else if (state.operation.length > 0) {
        return {
          operation: '',
          value: state.stack,
          stack: '',
        };
      }

    case 'clear':
      return {
        value: '',
        operation: '',
        stack: '',
      };

    default:
      return state;
  }
};