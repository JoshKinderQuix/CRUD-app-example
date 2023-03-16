// Define the storage key and initial data
const STORAGE_KEY = 'crud-data';
const initialData = [];

// Get the data from the local storage or use the initial data
function getData() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : initialData;
}

// Save the data to the local storage
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add a new item
function addItem(item) {
    const data = getData();
    data.push(item);
    saveData(data);

}

// Update an item by index
function updateItem(index, updatedItem) {
    const data = getData();
    data[index] = updatedItem;
    saveData(data);
}

// Delete an item by index
function deleteItem(index) {
    const data = getData();
    data.splice(index, 1);
    saveData(data);

}

// Render the list of items
function renderList() {
    const data = getData();
    const listElement = document.getElementById('list');
    listElement.innerHTML = ''; data.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item; const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            const updatedItem = prompt('Update item:', item);
            if (updatedItem) {
                updateItem(index, updatedItem);
                renderList();
            }
        }; const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteItem(index);
            renderList();
        }; listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
    });
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