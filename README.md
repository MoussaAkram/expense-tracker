# Expense Tracker with Budget Alerts

A user-friendly web application that enables users to track their expenses, categorize them, and receive budget notifications. Built with Angular 18, .NET 8, and a database of choice, this application is designed to simplify financial management.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [More Features](#bonus-features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Project Overview

Managing personal finances can be challenging without a proper system in place. This application empowers users to monitor their spending habits, stay within budget, and gain insights into their expenses through intuitive visualizations. It is an essential tool for anyone aiming to take control of their finances effectively.

## Core Features

The Expense Tracker provides the following primary functionalities:

- Add, View, and Delete Expenses: Users can easily log, view, and manage their expenses.

- Categorize Expenses: Organize expenses into categories such as Food, Transport, Entertainment, and more.

- Set Monthly Budget: Define a monthly budget and track remaining balance with a progress bar.

- Budget Alerts: Receive notifications when total expenses exceed the predefined monthly budget.

## Technology Stack

The application utilizes the following technologies:

- Frontend: Angular 18 for building a dynamic and responsive user interface.

- Backend: .NET 8 for handling business logic and API integration.

- Database: PostgreSql for secure, relational data storage.

## More Features

- Expense Visualization: Generate charts (e.g., pie charts) to show expenses by category for better insights.

- User Authentication: Implement user authentication to allow multiple users to save and manage their expenses securely.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Node.js: Required to run the Angular application.

.NET SDK: Ensure .NET 8 is installed to run the backend.

PostgreSql: For database setup.

### Installation

1. Clone the Repository:
 ```bash
git clone https://github.com/MoussaAkram/expense-tracker.git
cd expense-tracker
 ```

2. Set Up the Backend:

- Navigate to the backend directory:
```bash
cd backend
 ```
- Configure database connection in the appsettings.json file.

- Build and run the backend:
```bash
dotnet build
dotnet run
 ```
3. Set Up the Frontend:

- Navigate to the frontend directory:
```bash
cd ../frontend
 ```

- Install dependencies:
```bash
npm install
```
- Run the application:
```bash
ng serve
```

4. Access the Application:

Open your browser and navigate to http://localhost:4200 to access the application.

## Contributing

We welcome contributions to enhance the project. Follow these steps to contribute:

1. Fork the repository.

2. Create a new branch:
```bash
git checkout -b feature/YourFeature
```

3. Commit your changes:
```bash
git commit -m "Add YourFeature"
```

4. Push to the branch:
```bash
git push origin feature/YourFeature
```

5. Open a pull request.
