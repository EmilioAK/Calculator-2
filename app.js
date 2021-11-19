const operationButtons = Array.from(document.getElementsByClassName('operationButton'));
const numberButtons = Array.from(document.getElementsByClassName('numberButton'));
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
const backspace = document.getElementById('backspace');
const clear = document.getElementById('clear');

const firstNum = document.getElementById('firstNum');
const operation = document.getElementById('operation');
const secondNum = document.getElementById('secondNum');

function operate(operation, n1, n2) {
  const operations = {
    "+": (a, b) => a+b,
    "-": (a, b) => a-b,
    "*": (a, b) => a*b,
    "/": (a, b) => a/b
  };
  return operations[operation](n1, n2);
}

function whereToPlaceNumber() {
  if (operation.childNodes.length === 0) {
    return firstNum;
  }
  return secondNum;
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    whereToPlaceNumber().textContent += button.value;
  })
});

decimal.addEventListener('click', () => {
  elementToFill = whereToPlaceNumber();
  if (elementToFill.childNodes.length != 0 && !elementToFill.textContent.includes('.')) {
    elementToFill.textContent += decimal.value;
  }
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (firstNum.childNodes.length === 0) return;

    if (secondNum.childNodes.length != 0) {
      firstNum.textContent = operate(operation.textContent, firstNum.textContent, secondNum.textContent);
      secondNum.textContent = '';
    }
    operation.textContent = button.value;
  });
});

equals.addEventListener('click', () => {
  if (secondNum.childNodes.length != 0) {
    firstNum.textContent = operate(operation.textContent, firstNum.textContent, secondNum.textContent);
    operation.textContent = '';
    secondNum.textContent = '';
  }
});

backspace.addEventListener('click', () => {
  if (secondNum.childNodes.length != 0) {
    secondNum.textContent = secondNum.textContent.slice(0, -1);
  } else if (operation.childNodes.length != 0) {
    operation.textContent = '';
  } else {
    firstNum.textContent = firstNum.textContent.slice(0, -1);
  }
});

clear.addEventListener('click', () => {
  firstNum.textContent = '';
  operation.textContent = '';
  secondNum.textContent = '';
});