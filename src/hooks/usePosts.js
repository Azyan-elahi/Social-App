import { useState, useCallback } from 'react';
import { storage, generateId } from '../utils/storage';

export function usePosts() {
  const [posts, setPosts] = useState(() => storage.getPosts());

  // Re-read from localStorage and sync state — call after any change
  const refresh = useCallback(() => {
    setPosts(storage.getPosts());
  }, []);

  // CREATE — used by both "Save as Draft" and "Publish"
  function createPost({ description, image, isPublic, isDraft }) {
    const newPost = {
      id: generateId('post'),
      authorId: storage.getCurrentUser()?.id,
      description,
      image: image || null,
      isPublic: !!isPublic,
      isDraft: !!isDraft,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...storage.getPosts(), newPost];
    storage.setPosts(updated);
    setPosts(updated);
    return newPost;
  }

  // UPDATE — used by Edit Post page, and by toggle/publish actions
  function updatePost(postId, changes) {
    const updated = storage.getPosts().map((p) =>
      p.id === postId
        ? { ...p, ...changes, updatedAt: new Date().toISOString() }
        : p
    );
    storage.setPosts(updated);
    setPosts(updated);
  }

  // DELETE
  function deletePost(postId) {
    const updated = storage.getPosts().filter((p) => p.id !== postId);
    storage.setPosts(updated);
    setPosts(updated);

    // Clean up related comments and likes so we don't leave orphan data
    storage.setComments(storage.getComments().filter((c) => c.postId !== postId));
    storage.setLikes(storage.getLikes().filter((l) => l.postId !== postId));
  }

  // TOGGLE public/private
  function toggleVisibility(postId) {
    const post = storage.getPosts().find((p) => p.id === postId);
    if (post) updatePost(postId, { isPublic: !post.isPublic });
  }

  // PUBLISH a draft
  function publishPost(postId) {
    updatePost(postId, { isDraft: false, isPublic: true });
  }

  // GETTERS (read-only, computed from current posts state)
  function getPublicPosts() {
    return posts
      .filter((p) => p.isPublic && !p.isDraft)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getUserPosts(userId) {
    return posts
      .filter((p) => p.authorId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getUserPublicPosts(userId) {
    return posts
      .filter((p) => p.authorId === userId && p.isPublic && !p.isDraft)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getPostById(postId) {
    return posts.find((p) => p.id === postId) || null;
  }

  return {
    posts,
    refresh,
    createPost,
    updatePost,
    deletePost,
    toggleVisibility,
    publishPost,
    getPublicPosts,
    getUserPosts,
    getUserPublicPosts,
    getPostById,
  };
}