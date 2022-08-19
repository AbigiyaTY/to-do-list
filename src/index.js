import './style.css';

const textInput = document.querySelector('input');
const listToDo = document.querySelector('.listToDo');
class MyObject {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}
// myArray for local storage
const myArray = [];
const updateLocal = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const toDos = document.querySelectorAll('span');
  for (let i = 0; i < toDos.length; i += 1) {
    if (toDos[i].classList.contains('checkToDo')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('list', JSON.stringify(localData));
};
const removeToDo = (toDo) => {
  listToDo.removeChild(toDo);
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(localData).filter((i) => i.completed === false);
  data.map = (i) => {
    count += count;
    i.index = count;
  };
  localStorage.setItem('list', JSON.stringify(data));
};
const editToDo = (toDoContainer, toDo) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = toDo.textContent;
  toDoContainer.replaceChild(editInput, toDo);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const toDoContainers = document.querySelectorAll('.toDoContainer');
      const localData = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < toDoContainers.length; i += 1) {
        if (toDoContainers[i].classList.contains('checkedContainer')) {
          localData[i].description = editInput.value;
          localStorage.setItem('list', JSON.stringify(localData));
        }
      }
      editInput.parentElement.classList.remove('checkedContainer');
      toDoContainer.replaceChild(toDo, editInput);
      toDo.textContent = editInput.value;
    }
  });
  // remove or delete list
  const removeIcons = document.querySelectorAll('.fa-trash');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeToDo(i.parentElement);
    });
  });
};

// general stracter for adding todo list
const addTodo = (toDoValue) => {
  const toDoContainer = document.createElement('div');
  toDoContainer.className = 'toDoContainer';
  toDoContainer.innerHTML += `
<input type="checkbox" class="checkbox"/>
<span>${toDoValue}</span>
<i class="fa fa-ellipsis-v"></i>
<i class="fa fa-trash"></i>
`;
  listToDo.appendChild(toDoContainer);
  // the trash and 3 dots display block or none
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkToDo');
      i.parentElement.lastElementChild.classList.toggle('trashActive');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('editDisable');
      updateLocal();
    });
  });
  // local storage
  const object = new MyObject(toDoValue, false, checkBox.length);
  myArray.push(object);
  localStorage.setItem('list', JSON.stringify(myArray));
  // edit listener
  const editIcons = document.querySelectorAll('.fa-ellipsis-v');
  editIcons.forEach((i) => {
    i.addEventListener('click', () => {
      editToDo(toDoContainer, i.previousElementSibling);
    });
  });
};
// edit (writing edit function)

// adding to do list
textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && textInput.value) {
    addTodo(textInput.value);
    textInput.value = null;
  }
});
/* eslint-disable  array-callback-return */

// showing data in the browser by bring it from local storage
const getFromLocal = (e) => {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem('list'));
  data.map((i) => {
    myArray.push(i);
    const toDoContainer = document.createElement('div');
    toDoContainer.className = 'toDoContainer';
    toDoContainer.innerHTML += `
        <input type="checkbox" class="checkbox">
        <span>${i.description}</span>
        <i class="fa fa-ellipsis-v"></i>
        <i class="fa fa-trash"></i>
        `;
    listToDo.appendChild(toDoContainer);
    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((i) => {
      i.addEventListener('click', () => {
        editToDo(toDoContainer, i.previousElementSibling);
        i.parentElement.classList.add('checkedContainer');
      });
    });
  });
  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkToDo');
      i.parentElement.lastElementChild.classList.toggle('trashActive');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('editDisable');
      updateLocal();
    });
  });
  const removeIcons = document.querySelectorAll('.fa-trash');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeToDo(i.parentElement);
    });
  });
  localStorage.setItem('list', JSON.stringify(myArray));
};
window.addEventListener('load', getFromLocal);