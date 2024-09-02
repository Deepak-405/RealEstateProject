// scripts.js

// Function to handle login
function login(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Send a request to the backend API for login
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        const message = document.getElementById('loginMessage');
        if (data.message === 'Login successful') {
          message.textContent = 'Login successful!';
          window.location.href = 'listing.html'; // Redirect to the listing page
        } else {
          message.textContent = 'Invalid credentials, please try again.';
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  }
// scripts.js

let propertiesData = []; // To store all properties data
let filteredProperties = []; // To store filtered properties
let currentPage = 1;
const itemsPerPage = 2; // Number of properties per page

// Function to fetch properties from the backend API
function fetchProperties() {
  document.getElementById('loading').style.display = 'block'; // Show loading spinner
  fetch('http://localhost:3000/properties')
    .then(response => response.json())
    .then(data => {
      document.getElementById('loading').style.display = 'none'; // Hide loading spinner
      propertiesData = data; // Store all properties data
      filteredProperties = data; // Initially, no filter is applied
      displayProperties(); // Display the properties
    })
    .catch(error => {
      document.getElementById('loading').style.display = 'none'; // Hide loading spinner
      console.error('Error fetching properties:', error);
    });
}

// Function to display properties based on the current page
function displayProperties() {
  const propertiesDiv = document.getElementById('properties');
  propertiesDiv.innerHTML = ''; // Clear any existing content

  // Calculate start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the filtered properties for the current page
  const propertiesToDisplay = filteredProperties.slice(startIndex, endIndex);

  // Display properties
  propertiesToDisplay.forEach(property => {
    const propertyItem = document.createElement('div');
    propertyItem.className = 'property-item';
    propertyItem.innerHTML = `
      <img src="https://via.placeholder.com/300x200" alt="Property Image" class="property-img">
      <div class="property-details">
        <h3>${property.title}</h3>
        <p>${property.description}</p>
        <p><strong>Price:</strong> $${property.price}</p>
        <p><strong>Location:</strong> ${property.location}</p>
        <button class="btn">View Details</button>
      </div>
    `;
    propertiesDiv.appendChild(propertyItem);
  });

  createPaginationControls();
}

// Function to create pagination controls
function createPaginationControls() {
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = ''; // Clear existing controls
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // Create previous button
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.onclick = () => {
      currentPage--;
      displayProperties();
    };
    paginationDiv.appendChild(prevButton);
  }

  // Create next button
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.onclick = () => {
      currentPage++;
      displayProperties();
    };
    paginationDiv.appendChild(nextButton);
  }
}

// Function to filter properties by search and price
function filterProperties() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const priceFilter = document.getElementById('priceFilter').value;

  filteredProperties = propertiesData.filter(property => {
    const matchesSearch = property.location.toLowerCase().includes(searchInput);
    const matchesPrice = priceFilter ? property.price <= priceFilter : true;
    return matchesSearch && matchesPrice;
  });

  currentPage = 1; // Reset to first page
  displayProperties();
}

// Initialize the property listing page
fetchProperties();
