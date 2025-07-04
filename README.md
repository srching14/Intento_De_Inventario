# Inventory Management System

This project is a simple interactive inventory management system built with HTML, CSS, and JavaScript. It allows users to add, edit, and delete products, as well as view a list of all products. The system uses a REST API for data persistence and includes user-friendly alerts for feedback.

## Features

- **Add Products**: Users can add new products with name, price, and category.
- **Edit Products**: Modify existing product details.
- **Delete Products**: Remove products from the inventory.
- **Duplicate Name Check**: Prevents adding products with duplicate names.
- **Interactive Alerts**: Provides success, error, and confirmation alerts using SweetAlert2.
- **REST API Integration**: Communicates with a backend API for CRUD operations.

## File Structure

- **index.html**: Main HTML file for the user interface.
- **src/css/style.css**: Stylesheet for the application.
- **src/js/apis.js**: Handles API requests (GET, POST, PUT, DELETE).
- **src/js/ui.js**: Manages rendering and user interactions for the product list.
- **src/js/form.js**: Handles form submission and validation.
- **src/js/main.js**: Initializes the application.
- **src/js/alertas.js**: Provides alert functions using SweetAlert2.

## Setup

1. Clone the repository.
2. Ensure the backend API is running at `http://localhost:3000/productos`.
3. Open `index.html` in a browser to start using the application.

## Dependencies

- **SweetAlert2**: For interactive alerts.
- **REST API**: Backend service for product data.

## License

&copy; Elias Ching Torres, 2025. All rights reserved.

##Author 
- Elias Ching Torres
- srching23@gmail.com
- Caiman
- 3145417686
