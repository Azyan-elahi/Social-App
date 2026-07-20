import { createContext, useContext, useState } from 'react';
import { storage, generateId } from '../utils/storage';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Provider component — wraps the whole app in main.jsx
export function AuthProvider({ children }) {
  // Initialize from localStorage so refresh doesn't log the user out
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser());

  // SIGNUP
  function signup({ name, email, password }) {
    const users = storage.getUsers();

    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: generateId('usr'),
      name,
      email,
      password, // plain text — fine for this localStorage-only project
      bio: '',
      location: '',
      avatar: null,
      coverImage: null,
      joinedAt: new Date().toISOString(),
    };

    storage.setUsers([...users, newUser]);
    return newUser;
  }

  // LOGIN
  function login(email, password) {
    const users = storage.getUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Strip password before storing as "safe" session user
    const { password: _pw, ...safeUser } = foundUser;

    setCurrentUser(safeUser);
    storage.setCurrentUser(safeUser);
    return safeUser;
  }

  // LOGOUT
  function logout() {
    setCurrentUser(null);
    storage.clearCurrentUser();
  }

  // UPDATE PROFILE
  function updateCurrentUser(updatedData) {
    const updatedUser = { ...currentUser, ...updatedData };

    // Update state + session
    setCurrentUser(updatedUser);
    storage.setCurrentUser(updatedUser);

    // Also update the master users array (so it persists properly)
    const users = storage.getUsers();
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? { ...u, ...updatedData } : u
    );
    storage.setUsers(updatedUsers);
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook — shortcut so components don't need useContext(AuthContext) everywhere
export function useAuth() {
  return useContext(AuthContext);
}