import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storage, generateId } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import Avatar from '../components/ui/Avatar';
import CommentSection from '../components/post/CommentSection';

export default function PostDetailPage() {
  const { postId } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [, forceRerender] = useState(0);

  const post = storage.getPosts().find((p) => p.id === postId);

  if (!post) {
    return <p className="text-center py-20 text-gray-500">Post not found.</p>;
  }

  const author = storage.getUsers().find((u) => u.id === post.authorId);
  const likes = storage.getLikes().filter((l) => l.postId === postId);
  const userHasLiked = isAuthenticated && likes.some((l) => l.userId === currentUser.id);

  function handleLikeToggle() {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }

    const allLikes = storage.getLikes();

    if (userHasLiked) {
      storage.setLikes(
        allLikes.filter((l) => !(l.postId === postId && l.userId === currentUser.id))
      );
    } else {
      storage.setLikes([
        ...allLikes,
        { id: generateId('like'), postId, userId: currentUser.id, createdAt: new Date().toISOString() },
      ]);
    }

    forceRerender((n) => n + 1);
  }

  if (!author) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Link to={`/profile/${author.id}`}>
            <Avatar src={author.avatar} name={author.name} size="md" />
          </Link>
          <div>
            <Link
              to={`/profile/${author.id}`}
              className="font-medium text-ink hover:text-violet-600 transition-colors"
            >
              {author.name}
            </Link>
            <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
          {post.description}
        </p>

        {post.image && (
          <img src={post.image} alt="Post" className="w-full rounded-xl mb-4" />
        )}

        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border transition-colors ${
            userHasLiked
              ? 'bg-coral/10 border-coral/30 text-coral font-medium'
              : 'border-gray-200 text-gray-500 hover:border-coral/30 hover:text-coral'
          }`}
        >
          <span>{userHasLiked ? '❤️' : '🤍'}</span> {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </button>

        <CommentSection postId={postId} />
      </div>
    </div>
  );
}