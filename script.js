const items = document.querySelectorAll('.item');
const containers = document.querySelectorAll('.item-container');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

let draggedItem = null;

// Add event listeners for drag events
items.forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  item.addEventListener('touchstart', touchStart);
  item.addEventListener('touchend', touchEnd);
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
function dragStart() {
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
  this.style.opacity = '0.3';
}

function touchEnd() {
  if (draggedItem) {
    this.style.border = '2px dashed #aaa';
    this.appendChild(draggedItem);
    showMessage('Item dropped successfully! 🎉', 'success');
  }
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
  const touch = e.touches[0];
  const offsetX = touch.clientX - draggedItem.offsetWidth / 2;
  const offsetY = touch.clientY - draggedItem.offsetHeight / 2;
  draggedItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
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
