# Gates Project
Important:
Video showcasing the webapp and functionalities of a superadmin
[https://youtu.be/oJS1QiA644Q](https://youtu.be/oJS1QiA644Q)

Link for up and running website: [https://projectcontrol.netlify.app/](https://projectcontrol.netlify.app/)
To login, click "login" in the top right corner. For username, put "test"

The **Gates Project** is a project management application designed to help teams organize and track their workflows. It provides features for managing stages, tasks, and team collaboration, with a focus on simplicity and efficiency.
This was the project for my bachelor. It has been further developed after the bachelor product was delivered.
The webapp is used by different teams at TechnipFMC

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Stage Management**: Create, update, and retrieve stages for projects.
- **Database Integration**: Uses SQL Server for data storage and retrieval.
- **API Endpoints**: Provides RESTful APIs for managing stages and other entities.
- **Error Handling**: Robust error handling for database and API operations.
- **Environment Configuration**: Securely manage sensitive data using `.env` files.

---

## Technologies Used

- **Backend**: Node.js, H3 Framework
- **Database**: SQL Server
- **Frontend**: Vue.js
- **Environment Management**: `dotenv`
- **Database Library**: `mssql`

---

## Setup

### Prerequisites

- Node.js (v16 or higher)
- SQL Server
- A `.env` file with the following variables:
  ```properties
  DB_SERVER=your-database-server
  DB_USER=your-database-user
  DB_PASS=your-database-password
  DB_NAME=your-database-name
  DB_PORT=1433
  TOKEN_SECRET=your-jwt-secret
  TOKEN_EXPIRATION=2Y
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gates.git
   cd gates
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file with the required environment variables.

---

## Usage

### Development Server

Start the development server:
```bash
npm run dev
```

The server will run at `http://localhost:3000`.

### Production Build

Build the application for production:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

---

## Folder Structure

```
gates/
├── .env                        # Environment variables for database and app configuration
├── .envrc                      # Direnv configuration file
├── .gitignore                  # Git ignore file to exclude sensitive or unnecessary files
├── .netlify/                   # Netlify-specific configurations
├── .nuxt/                      # Nuxt build directory (auto-generated)
├── .vscode/                    # VS Code workspace settings
├── assets/                     # Static assets like images and styles
├── components/                 # Vue components
├── docs/                       # Documentation files
├── layouts/                    # Application layouts
├── middleware/                 # Middleware for route handling
├── netlify/                    # Netlify-specific functions
├── node_modules/               # Installed npm packages (auto-generated)
├── out/                        # Output directory for builds (if applicable)
├── pages/                      # Application pages
├── public/                     # Static files served directly
├── server/                     # Backend logic
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   │   ├── session.ts          # JWT token creation and verification
├── static/                     # Static files served at the root
├── stores/                     # State management (Pinia)
├── utils/                      # General utility functions
├── app.vue                     # Main Vue application file
```

---


## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or support, please contact [eirik.brakstad@hotmail.com](mailto:your-email@example.com).
