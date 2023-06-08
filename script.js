const items = document.querySelectorAll('.item');
const containers = document.querySelectorAll('.item-container');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

let draggedItem = null;

// Add event listeners for drag events
items.forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  item.addEventListener('touchstart', dragStart);
  item.addEventListener('touchend', dragEnd);
});

// Add event listeners for drop events
containers.forEach((container) => {
  container.addEventListener('dragover', dragOver);
  container.addEventListener('dragenter', dragEnter);
  container.addEventListener('dragleave', dragLeave);
  container.addEventListener('drop', drop);
  container.addEventListener('touchmove', touchMove);
  container.addEventListener('touchend', touchEnd);
});

// Reset button event listener
resetBtn.addEventListener('click', resetContainers);

// Drag Functions
function dragStart(e) {
  if (e.type === 'touchstart') {
    e.preventDefault();
  }
  draggedItem = this;
  setTimeout(() => {
    this.style.opacity = '0.3';
  }, 0);
}

function dragEnd() {
  draggedItem = null;
  this.style.opacity = '1';
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

function drop() {
  this.style.border = '2px dashed #aaa';
  this.appendChild(draggedItem);
  showMessage('Item dropped successfully! 🎉', 'success');
}

function touchMove(e) {
  e.preventDefault();
}

function touchEnd() {
  if (draggedItem) {
    this.style.border = '2px dashed #aaa';
    this.appendChild(draggedItem);
    showMessage('Item dropped successfully! 🎉', 'success');
  }
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
