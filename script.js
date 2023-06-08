const items = document.querySelectorAll('.item');
const containers = document.querySelectorAll('.item-container');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

let draggedItem = null;

// Add event listeners for drag events
items.forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Add event listeners for touch events
items.forEach((item) => {
  item.addEventListener('touchstart', touchStart);
  item.addEventListener('touchend', touchEnd);
});

// Add event listeners for drop events
containers.forEach((container) => {
  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', drop);
});

// Reset button event listener
resetBtn.addEventListener('click', resetContainers);

// Drag Functions
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  draggedItem = this;
  setTimeout(() => {
    this.style.opacity = '0.3';
  }, 0);
}

function dragEnd() {
  draggedItem = null;
  this.style.opacity = '1';
}

function touchStart(e) {
  draggedItem = this;
  e.preventDefault();
}

function touchEnd() {
  draggedItem = null;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.style.border = '2px dashed #333';
}

function dragLeave() {
  this.style.border = '2px dashed #aaa';
}

function drop(e) {
  e.preventDefault();
  const itemId = e.dataTransfer.getData('text/plain');
  const item = document.getElementById(itemId);
  this.appendChild(item);
  showMessage('Item dropped successfully! 🎉', 'success');
}

// Reset Containers
function resetContainers() {
  containers.forEach((container) => {
    container.innerHTML = '';
  });

  items.forEach((item) => {
    document.getElementById('container1').appendChild(item);
  });

  showMessage('Containers reset! 🔄', 'info');
}

// Show Message
function showMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
  message.classList.add('show');

  setTimeout(() => {
    message.classList.remove('show');
    message.textContent = '';
    message.classList.remove(type);
  }, 2000);
}
