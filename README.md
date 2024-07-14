# Blog App Backend

This project is a backend for a blog application written in Node.js. It includes a set of APIs for creating users, logging in, creating blogs, deleting blogs etc... and managing sessions with token-based authentication. The project uses MongoDB Atlas for storing users, blogs, and session data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
  ```bash
  git clone https://github.com/damnanuj/blog-app-backend.git
```
2. **Navigate to the project directory:**

  ```bash
  cd yourproject
   ```
3. **Install dependencies:**
 ```bash
 npm install
  ```

4. **Set up environment variables:**

   *Create a .env file in the root directory and add the necessary configuration 
    variables. For example:*
  ```bash
  PORT=8000
  MONGO_URI=your mongo uri
  SALT=salt
  SECRET_KEY=your-database secret key
  ```
5. **Run the server:**

 ```bash
 npm start
```

## Usage 
1. **Starting the server:**

  ```bash
  npm start
   ```
2. **Access the API:**
 
    *The API will be accessible at http://localhost:8000*

## API Endpoints

### User Endpoints
- register user

 ```bash
 POST /auth/register
   ```
 `**body:**

   ```json
  {
     "name":"Harry Potter",
     "username":"harry",
     "email":"harry@gmail.com",
     "password":"Harrypotter"
  } 
   ```

- login user

 ```bash
 POST /auth/login
   ```
**body:**

   ```json
  {
     "username":"harry",
     "password":"Harrypotter"
  }    
  ```
   - *user can login with username or email*
   ```json
  {
     "email":"harry@gmail.com",
     "password":"Harrypotter"
  }    
  ```
Get User by ID

bash
Copy code
GET /api/users/:id
Response:

json
Copy code
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
Create a New User

bash
Copy code
POST /api/users
Request Body:

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com"
}
Response:

json
Copy code
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
Update a User

bash
Copy code
PUT /api/users/:id
Request Body:

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com"
}
Response:

json
Copy code
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
Delete a User

bash
Copy code
DELETE /api/users/:id
Response:

json
Copy code
{
  "message": "User deleted successfully"
}
