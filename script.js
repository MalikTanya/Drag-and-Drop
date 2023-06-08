const items = document.querySelectorAll('.item');
const droppableArea = document.querySelector(".item-container");
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

let draggedItem = null;

items.forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  item.addEventListener('touchstart', touchStart);
  item.addEventListener('touchend', touchEnd);
});

droppableArea.addEventListener('dragover', dragOver);
droppableArea.addEventListener('dragenter', dragEnter);
droppableArea.addEventListener('dragleave', dragLeave);
droppableArea.addEventListener('drop', drop);
droppableArea.addEventListener('touchmove', touchMove);
droppableArea.addEventListener('touchend', touchEnd);
resetBtn.addEventListener('click', resetContainers);

function dragStart() {
  draggedItem = this;
  this.classList.add('dragging');
}

function dragEnd() {
  draggedItem = null;
  this.classList.remove('dragging');
}

function touchStart(e) {
  draggedItem = this;
  this.classList.add('dragging');
}

function touchEnd() {
  draggedItem = null;
  this.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function drop() {
  this.classList.remove('drag-over');
  this.appendChild(draggedItem);
  showMessage('Item dropped successfully! 🎉', 'success');
}

function touchMove(e) {
  e.preventDefault();
}

function resetContainers() {
  droppableArea.innerHTML = '';
  items.forEach((item) => {
    document.querySelector('.items-container').appendChild(item);
  });
  showMessage('Containers reset! 🔄', 'info');
}

function showMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
  message.style.display = 'block';
  setTimeout(() => {
    message.style.opacity = '0';
    message.addEventListener('transitionend', () => {
      message.style.display = 'none';
      message.style.opacity = '1';
      message.classList.remove(type);
    }, { once: true });
  }, 2000);
}
