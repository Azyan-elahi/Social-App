# SocialApp

A Facebook-inspired social media platform built with React — share posts, like, comment, and connect with others, all running entirely on the frontend with localStorage as the data layer.

## Live Demo

🔗 [Live Demo](your-deployed-link-here) *(replace with your Vercel/Netlify link after deploying)*

## Screenshots

| Feed Page | Create Post |
![alt text](image.png)
![alt text](image.png)

| Profile Page | Dashboard |
![alt text](image.png)
![alt text](image.png)



## Tech Stack

- **React (Vite)** — frontend framework and build tool
- **React Router v6** — client-side routing, protected routes, nested routes
- **Tailwind CSS** — utility-first styling and responsive design
- **React Hook Form** — form state management and validation
- **Context API** — global auth state without prop drilling
- **localStorage** — all data persistence (users, posts, comments, likes)
- **clsx** — conditional className composition
- **React.lazy + Suspense** — code splitting per route

## Features

- User authentication — signup with validation, login, logout, session persists on refresh
- Public feed showing all published public posts, newest first
- Create posts with image upload, live preview, and public/private visibility
- Save posts as drafts or publish immediately
- Edit and delete your own posts
- Toggle any post between public and private instantly
- Like and unlike posts, with live like counts
- Comment on posts, and delete your own comments with inline confirmation
- Public user profiles with avatar, bio, location, and their public posts
- Editable profile settings — name, bio (with character counter), location, and avatar
- Protected dashboard routes — redirects to login if not authenticated
- Live search on the feed — filters posts as you type
- Fully responsive layout, including a mobile hamburger menu for the dashboard

## How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/social-app-your-name.git
cd social-app-your-name

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open the app
# Visit http://localhost:5175 in your browser
```

## Folder Structure
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── AuthLayout.jsx
│   ├── post/
│   │   ├── PostCard.jsx
│   │   ├── PostActions.jsx
│   │   └── CommentSection.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Avatar.jsx
│       ├── Badge.jsx
│       └── Modal.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── usePosts.js
├── pages/
│   ├── FeedPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── PostDetailPage.jsx
│   ├── ProfilePage.jsx
│   ├── NotFoundPage.jsx
│   └── dashboard/
│       ├── DashboardLayout.jsx
│       ├── PostsDashboard.jsx
│       ├── CreatePost.jsx
│       ├── EditPost.jsx
│       └── ProfileSettings.jsx
├── utils/
│   ├── storage.js
│   └── helpers.js
├── App.jsx
└── main.jsx
## localStorage Data Structure

All data lives in localStorage under five keys.

**`users`**
```js
[
  {
    id: 'usr_1703001234_abc',
    name: 'Asad Khan',
    email: 'asad@test.com',
    password: 'Password123',
    bio: 'React developer from Lahore',
    location: 'Lahore, Pakistan',
    avatar: 'data:image/jpeg;base64,...',
    coverImage: null,
    joinedAt: '2025-01-15T10:00:00Z',
  }
]
```

**`posts`**
```js
[
  {
    id: 'post_1703001234_xyz',
    authorId: 'usr_1703001234_abc',
    description: 'Hello everyone! This is my first post.',
    image: 'data:image/jpeg;base64,...',
    isPublic: true,
    isDraft: false,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  }
]
```

**`comments`**
```js
[
  {
    id: 'cmt_1703001234',
    postId: 'post_1703001234_xyz',
    authorId: 'usr_1703001234_abc',
    text: 'Great post!',
    createdAt: '2025-01-15T10:05:00Z',
  }
]
```

**`likes`**
```js
[
  {
    id: 'like_1703001234',
    postId: 'post_1703001234_xyz',
    userId: 'usr_1703001234_abc',
    createdAt: '2025-01-15T10:03:00Z',
  }
]
```

## What I Learned

Building SocialApp taught me how much a real application depends on getting the data layer right before touching any UI — starting with `storage.js` meant every component had one consistent way to read and write data, instead of scattered `localStorage` calls. I got comfortable with React Context for global state, especially understanding how `AuthContext` keeps the Navbar, Dashboard, and every protected route in sync without passing props manually. Working with React Hook Form showed me how much validation logic (required fields, regex patterns, cross-field checks like password confirmation) can be handled declaratively instead of manually with `useState`. I also learned the importance of ownership checks on routes like Edit Post — without checking `post.authorId === currentUser.id`, anyone could edit anyone else's content just by changing the URL. Finally, building the same CRUD pattern for posts, comments, and likes helped me see how reusable hooks like `usePosts` keep logic centralized instead of duplicated across Feed, Dashboard, and Profile pages.

## Known Limitations

- All data is stored in the browser's localStorage, so it does not persist across different devices or browsers, and clearing browser data erases the entire app's content.
- Passwords are stored in plain text, which is acceptable for a learning project but would never be done in a production app with a real backend.
- There is no real-time sync between open tabs or components — data only refreshes when a component re-reads from localStorage, not through live updates like WebSockets.
- With a real backend (Node/Express + MongoDB, matching the MERN stack), I would add proper password hashing, JWT-based authentication, image uploads to cloud storage instead of base64 strings, and real-time notifications for likes and comments.