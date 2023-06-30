document.addEventListener("DOMContentLoaded", function() {
    const dogForm = document.getElementById('dog-form');
    const tableBody = document.getElementById('table-body');
  
    // Fetch dogs and render them in the table
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => {
        dogs.forEach(dog => {
          renderDogRow(dog);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    // Add event listener for dog form submission
    dogForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nameInput = dogForm.querySelector('input[name="name"]');
      const breedInput = dogForm.querySelector('input[name="breed"]');
      const sexInput = dogForm.querySelector('input[name="sex"]');
      const dogId = dogForm.getAttribute('data-dog-id');
  
      const dogData = {
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      };
  
      updateDog(dogId, dogData);
  
      nameInput.value = '';
      breedInput.value = '';
      sexInput.value = '';
      dogForm.removeAttribute('data-dog-id');
    });
  
    function renderDogRow(dog) {
      const tableRow = document.createElement('tr');
  
      const nameCell = document.createElement('td');
      nameCell.textContent = dog.name;
  
      const breedCell = document.createElement('td');
      breedCell.textContent = dog.breed;
  
      const sexCell = document.createElement('td');
      sexCell.textContent = dog.sex;
  
      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
  
      // Add event listener for edit button
      editButton.addEventListener('click', () => {
        populateDogForm(dog);
      });
      document.addEventListener('DOMContentLoaded', () => {


    
      })
      editCell.appendChild(editButton);
  
      tableRow.appendChild(nameCell);
      tableRow.appendChild(breedCell);
      tableRow.appendChild(sexCell);
      tableRow.appendChild(editCell);
  
      tableBody.appendChild(tableRow);
    }
  
    function populateDogForm(dog) {
      const nameInput = dogForm.querySelector('input[name="name"]');
      const breedInput = dogForm.querySelector('input[name="breed"]');
      const sexInput = dogForm.querySelector('input[name="sex"]');
  
      nameInput.value = dog.name;
      breedInput.value = dog.breed;
      sexInput.value = dog.sex;
  
      dogForm.setAttribute('data-dog-id', dog.id);
    }
  
    function updateDog(dogId, dogData) {
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dogData)
      })
        .then(response => response.json())
        .then(() => {
          // Clear table
          tableBody.innerHTML = '';
  
          // Fetch dogs again and render them in the table
          fetch('http://localhost:3000/dogs')
            .then(response => response.json())
            .then(dogs => {
              dogs.forEach(dog => {
                renderDogRow(dog);
              });
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  });
  