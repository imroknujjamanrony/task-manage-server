## Task Management

### Short Description

Task Management is a web application designed to help users efficiently manage their tasks. It provides features such as creating, editing, deleting, and reordering tasks across different categories like To-Do, In-Progress, and Done. The application supports drag-and-drop functionality for seamless task organization, allowing users to prioritize and adjust tasks effortlessly.

## Live Links

- **Live Website**: [Task Management App](https://task-management-fdbe6.web.app/)

## Dependencies

### Frontend Dependencies

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: For client-side routing.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **@tanstack/react-query**: Hooks for fetching, caching, and updating asynchronous data.
- **@dnd-kit/core**: Drag-and-drop toolkit for React.
- **@dnd-kit/sortable**: Extensions for creating sortable interfaces with @dnd-kit.
- **SweetAlert2**: Beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
- **React Icons**: Popular icons as React components.

### Backend Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database program, using JSON-like documents with optional schemas.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Cors**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS.
- **Morgan**: HTTP request logger middleware for Node.js.

## Installation Steps

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up (can be local or cloud-based like MongoDB Atlas).
- Git installed for cloning repositories.

### Backend Setup

#### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-server.git
cd task-management-backend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the root directory.

Add the following variables (replace placeholders with your actual credentials):

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
ACCESS_TOKEN_SECRET=your_jwt_secret_key
```

#### Start the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

### Frontend Setup

#### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-frontend.git
cd task-management-frontend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the root directory.

Add any necessary variables (replace the API URL with your backend server URL):

```env
REACT_APP_API_URL=http://localhost:5000
```

#### Start the Application

```bash
npm start
```

The application will run on `http://localhost:3000`.

## Technologies Used

### Frontend

- **React**: Building dynamic user interfaces.
- **React Router DOM**: Handling client-side routing.
- **Axios**: Making HTTP requests to the backend API.
- **@tanstack/react-query**: Data fetching and state management.
- **@dnd-kit/core** and **@dnd-kit/sortable**: Implementing drag-and-drop functionality for task management.
- **SweetAlert2**: Displaying elegant alerts and confirmation dialogs.
- **React Icons**: Providing a wide range of icons for UI enhancement.
- **Tailwind CSS** or **CSS Modules**: Styling the application (if used).

### Backend

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: Database for storing user and task data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Dotenv**: Managing environment variables.
- **Cors**: Enabling Cross-Origin Resource Sharing.
- **Morgan**: Logging HTTP requests for debugging purposes.
- **JWT (JSON Web Token)**: Handling authentication and authorization (if implemented).

## Tools

- **Git**: Version control system for tracking changes.
- **GitHub**: Hosting repositories and collaborating on code.
- **Visual Studio Code**: Code editor (or any preferred IDE).
- **Postman**: API development environment for testing endpoints.
- **Nodemon**: Automatically restarting the server during development when file changes are detected.
