# Bloggy

A full-stack blogging platform built with **Node.js**, **Express**, and **MongoDB**. Users can create accounts, write posts, like content, and engage through comments.

## 🎯 Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **User Profiles**: View and manage personal profiles with profile pictures
- **Create Posts**: Write and publish blog posts with titles and content
- **Post Feed**: Browse all posts from the community sorted by latest first
- **Like Posts**: Like or unlike posts from other users
- **Comments**: Add comments to posts and engage with the community
- **Edit Posts**: Update your own blog posts
- **Profile Pictures**: Upload and display user profile pictures

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing
- **Frontend**: EJS templating engine
- **File Upload**: Multer
- **Styling**: CSS (served from `/public`)

## 📦 Dependencies

```json
{
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "ejs": "^5.0.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.2.4",
  "multer": "^2.1.1"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd Bloggy
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure MongoDB connection**:
   - Update `config/db.js` with your MongoDB connection string

4. **Start the server**:

   ```bash
   node app.js
   ```

5. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Bloggy/
├── app.js              # Main application entry point
├── config/
│   ├── db.js          # MongoDB connection
│   └── multer.js      # File upload configuration
├── models/
│   ├── user.js        # User schema
│   ├── post.js        # Post schema
│   └── comment.js     # Comment schema
├── views/             # EJS templates
│   ├── index.ejs      # Home page
│   ├── login.ejs      # Login page
│   ├── feed.ejs       # Posts feed
│   ├── profile.ejs    # User profile
│   ├── edit.ejs       # Edit post
│   └── profileupload.ejs # Profile picture upload
├── public/            # Static files (CSS, images)
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## 🔐 API Endpoints

### Authentication

- **GET** `/login` - Login page
- **POST** `/register` - Register new user
- **POST** `/login` - Authenticate user
- **GET** `/logout` - Logout user (clear token)

### User Profile

- **GET** `/profile` - View logged-in user's profile (requires auth)
- **GET** `/profile/upload` - Profile picture upload page
- **POST** `/upload` - Upload profile picture (requires auth)

### Posts

- **GET** `/feed` - View all posts sorted by latest (requires auth)
- **POST** `/post` - Create new post (requires auth)
- **GET** `/edit/:id` - Edit post form (requires auth)
- **POST** `/update/:id` - Update post content (requires auth)
- **POST** `/like/:id` - Toggle like on a post (requires auth)

### Comments

- **POST** `/comment/:id` - Add comment to a post (requires auth)

## 🔑 Authentication

- Uses **JWT tokens** stored in cookies
- Passwords are hashed with **bcrypt** (10 salt rounds)
- Authentication middleware (`isLoggedIn`) protects routes requiring login

## 💾 Database Models

### User

- `username`: String
- `name`: String
- `age`: Number
- `email`: String (unique)
- `password`: String (hashed)
- `profilepic`: String (filename)
- `posts`: Array of Post IDs
- `createdAt`: Timestamp

### Post

- `title`: String
- `content`: String
- `user`: User ID (reference)
- `likes`: Array of User IDs
- `comments`: Array of Comment objects
- `date`: Timestamp (default: now)

### Comment

- `user`: User ID (reference)
- `content`: String


## 🐛 Future Enhancements

- User follow/unfollow system
- Search and filter posts
- Notifications system
- Post categories/tags
- User profiles customization
- Email verification
- Password reset functionality
- Admin dashboard
- Post deletion functionality
- Rate limiting and spam protection

## 📝 License

ISC

## 👥 Author

Developed as a full-stack blogging platform.

---

