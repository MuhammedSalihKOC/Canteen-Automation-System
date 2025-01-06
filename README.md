# Canteen Automation System

## Description
The Canteen Automation System is a web-based platform designed to simplify and automate canteen operations. It enables users to browse products, place orders, manage payments, and view order histories. Administrators can manage the product catalog, oversee user orders, and ensure smooth canteen workflows.

## Features
- **User Management**: Secure login and role-based access control for customers and administrators.
- **Order Management**: Add products to orders, calculate totals, and track order statuses.
- **Payment Integration**: Support for various payment methods with secure transaction handling.
- **Dashboard**: Users can view their order history and profile.

## Technologies Used
- **Backend**: Java
- **Frontend**: HTML, CSS
- **Controllers**: Handles routing and application logic

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MuhammedSalihKOC/Canteen-Automation-System.git
   ```
2. Set up maven.
3. Open the project in your favorite IDE (e.g., IntelliJ IDEA or Eclipse).
4. Run the application on IDE or cmd with "mvn spring-boot:run" command.

## How to Use
1. **For Customers:**
   - Log in to the system.
   - Browse available products and add them to your cart.
   - Place an order and complete the payment process.
   - Track your orders.

2. **For Employees:**
   - Log in using employee credentials.
   - Monitor order statuses on Dashboard.
   - Update orders statuses (Being Prepared/ Ready For Pickup/...).

## Project Structure
- **Controllers**: `OrderController`, `LoginController`, and `HomeController`
- **Models**: `User`, `Product`, `Order`, `Payment`
- **Views**: HTML templates for user interfaces

## Future Enhancements
- Integration with a database (e.g., MySQL, PostgreSQL).
- Add email notifications for order updates.
- Mobile-responsive design.
- Analytics dashboard for administrators.
