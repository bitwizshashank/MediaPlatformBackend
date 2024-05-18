# Social Media Platform - MediaPlatformBackend

A social media platform where users can register, create posts, follow other users, and view content feeds. This project uses Node.js, Express, MongoDB, and JWT for authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Content Endpoints](#content-endpoints)
- [Testing the API with Postman](#testing-the-api-with-postman)
- [Project Structure](#project-structure)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- User Registration and Authentication
- Create, Read, Delete Posts
- Follow and Unfollow Users
- View Content Feed
- JWT Authentication

## Prerequisites

- Node.js v16 or higher
- MongoDB
- npm (Node Package Manager)
- Postman (for API testing)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/social-media-platform.git
   cd social-media-platform
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

## Running the Application

1. Start the MongoDB server (if not already running).

2. Start the application:

   ```sh
   npm start
   ```

3. The server should be running on `http://localhost:5000`.

## API Endpoints

### User Endpoints

#### Register a new user

- **POST** `/api/users/register`
- Request Body:
  ```json
  {
    "username": "example_user",
    "email": "example@example.com",
    "password": "password123"
  }
  ```

#### Login a user

- **POST** `/api/users/login`
- Request Body:
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```

#### Find users by username

- **GET** `/api/users/find?name=username`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

#### Follow a user

- **POST** `/api/users/follow/:id`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

#### Unfollow a user

- **POST** `/api/users/unfollow/:id`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

### Content Endpoints

#### Create a new post

- **POST** `/api/content`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>",
    "Content-Type": "multipart/form-data"
  }
  ```
- Body (Form Data):
  - `text`: "This is a test post"
  - `media`: (Select a file)

#### Get content feed

- **GET** `/api/content/feed`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

#### Get content details

- **GET** `/api/content/:id`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

#### Delete a post

- **DELETE** `/api/content/:id`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

#### Schedule a post

- **POST** `/api/content/schedule`
- Headers:
  ```json
  {
    "Authorization": "Bearer <token>",
    "Content-Type": "multipart/form-data"
  }
  ```
- Body (Form Data):
  - `text`: "This is a scheduled post"
  - `media`: (Select a file)

## Testing the API with Postman

1. Open Postman.
2. For endpoints requiring authentication, add a header with the key `Authorization` and value `Bearer <token>`.
3. Test the endpoints using the information provided in the API Endpoints section.

## Project Structure

```plaintext
├── controllers
│   ├── contentController.js
│   └── userController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── contentModel.js
│   └── userModel.js
├── routes
│   ├── contentRoutes.js
│   └── userRoutes.js
├── uploads
│   └── (uploaded media files)
├── .env
├── server.js
├── package.json
└── README.md
```

## Contact :

Feel free to reach out to me for any questions or collaboration opportunities:

created by-

### `SHASHANK SHUKLA`

- LinkedIn: [shashankshukla0806](https://www.linkedin.com/in/shashankshukla0806/)
- Email: shashankshukla0105@gmail.com
- LeetCode: [shashank_shukla0105](https://leetcode.com/u/shashank_shukla0105/)
- GitHub: [bitwizshashank](https://github.com/bitwizshashank)

## Acknowledgments

- This project is based on Node.js, Express, and MongoDB.
- Special thanks to the contributors of the libraries and frameworks used in this project.
