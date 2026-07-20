import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../context/AuthContext';
import { storage } from '../../utils/storage';
import { formatDate, truncateText } from '../../utils/helpers';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';

export default function PostsDashboard() {
  const { currentUser } = useAuth();
  const { getUserPosts, deletePost, toggleVisibility, publishPost, refresh } = usePosts();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const myPosts = getUserPosts(currentUser.id);

  function handleConfirmDelete() {
    deletePost(deleteTarget);
    setDeleteTarget(null);
    refresh();
  }

  function getBadgeVariant(post) {
    if (post.isDraft) return 'draft';
    return post.isPublic ? 'public' : 'private';
  }

  function getLikesCount(postId) {
    return storage.getLikes().filter((l) => l.postId === postId).length;
  }

  function getCommentsCount(postId) {
    return storage.getComments().filter((c) => c.postId === postId).length;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-medium text-ink">My Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">{myPosts.length} total</p>
        </div>
        <Link
          to="/dashboard/create"
          className="flex items-center gap-1.5 bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-violet-600 transition-colors shadow-sm shadow-violet-500/20"
        >
          <span className="text-base leading-none">+</span> New Post
        </Link>
      </div>

      {myPosts.length === 0 ? (
        <div className="text-center py-24 bg-sand/40 rounded-2xl">
          <p className="text-lg text-gray-500 mb-4">You haven't created any posts yet.</p>
          <Link
            to="/dashboard/create"
            className="inline-block bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-violet-600 transition-colors"
          >
            Create your first post!
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {myPosts.map((post) => (
            <div
                key={post.id}
                    className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant={getBadgeVariant(post)} />
                  <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                </div>
                <p className="text-ink truncate">{truncateText(post.description, 80)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {getLikesCount(post.id)} Likes · {getCommentsCount(post.id)} Comments
                </p>
              </div>

                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                {post.isDraft && (
                  <button
                    onClick={() => { publishPost(post.id); refresh(); }}
                    className="text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 transition-colors px-4 py-2 rounded-full"
                  >
                    Publish
                  </button>
                )}

                {!post.isDraft && (
                  <button
                    onClick={() => { toggleVisibility(post.id); refresh(); }}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 bg-sand hover:bg-sand/70 transition-colors px-4 py-2 rounded-full"
                  >
                    {post.isPublic ? '🔒' : '🌍'} Make {post.isPublic ? 'Private' : 'Public'}
                  </button>
                )}

                <Link
                  to={`/dashboard/edit/${post.id}`}
                  className="text-sm font-medium text-gray-600 border border-gray-200 hover:border-violet-400 hover:text-violet-600 transition-colors px-4 py-2 rounded-full"
                >
                  Edit
                </Link>

                <button
                  onClick={() => setDeleteTarget(post.id)}
                  className="text-sm font-medium text-red-500 hover:bg-red-50 transition-colors px-4 py-2 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete this post?"
      >
        <p className="text-gray-600 mb-5">
          This action cannot be undone. All likes and comments on this post will also be deleted.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setDeleteTarget(null)}
            className="text-sm font-medium text-gray-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}