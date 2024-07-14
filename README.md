# Project Name

A brief description of what your project does and its purpose.

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
   SECRET_KEY=your-databse secret key
     ```
5. **Run the server:**

   ```bash
   npm start

6. **Usage**
Starting the server:

```bash

npm start
```
Access the API:
The API will be accessible at http://localhost:3000

API Endpoints
User Endpoints
Get All Users

bash
Copy code
GET /api/users
Response:

json
Copy code
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  ...
]
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
