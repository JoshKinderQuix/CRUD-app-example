// !Here's a breakdown of the simplified code:

// 1. We define the STORAGE_KEY constant and set initialData to an empty array.
// 2. In getData(), we use let to declare rawData and check if it exists before parsing it as JSON and returning initialData.
// 3. In saveData(), we stringify the data before saving it to local storage.
// 4. We modify addItem(), updateItem(), and deleteItem() to use JSON.stringify() before saving data to local storage.
// 5. In renderList(), we use a for loop instead of forEach() and use let i instead of the implicit index.
// 6. We add let before the i in the for loop to ensure it's a local variable.
// 7. We remove the spaces before the () in the addEventListener() function call.
//------------------------------------

// Define the STORAGE_KEY constant and set initialData to an empty array.
const STORAGE_KEY = 'crud-data';
let initialData = [];

// Get the data from the local storage or use the initial data
function getData() {
  let rawData = localStorage.getItem(STORAGE_KEY);
  if (rawData) {
    initialData = JSON.parse(rawData);
  }
  console.log(`Initial Data ${initialData}`) //For Troubleshooting: Note use of BACKTICKS (``) not single quotes ('')
  return initialData;
}

// Save the data to the local storage
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, data);
}

// Add a new item
function addItem(item) {
  const data = getData();
  data.push(item);
  saveData(JSON.stringify(data));
}

// Update an item by index
function updateItem(index, updatedItem) {
  const data = getData();
  data[index] = updatedItem;
  saveData(JSON.stringify(data));
}

// Delete an item by index
function deleteItem(index) {
  const data = getData();
  data.splice(index, 1);
  saveData(JSON.stringify(data));
}

// Render the list of items
function renderList() {
  const data = getData();
  const listElement = document.getElementById('list');
  listElement.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = data[i];
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit'; 
    editButton.onclick = () => { 
      const updatedItem = prompt('Update item:', data[i]);
      if (updatedItem) {
        updateItem(i, updatedItem);
        renderList();
      }
    };
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      deleteItem(i);
      renderList();
    };
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listElement.appendChild(listItem);
  }
}

// Add event listener for adding a new item
document.getElementById('addButton').addEventListener('click', () => {
  const inputElement = document.getElementById('input');
  const newItem = inputElement.value.trim();
  if (newItem) {
    addItem(newItem);
    renderList();
    inputElement.value = '';
  }
});

// Render the initial list
renderList();