import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { storage, generateId } from '../../utils/storage';

export default function PostActions({ postId, onLikeChange }) {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const likes = storage.getLikes().filter((l) => l.postId === postId);
  const commentsCount = storage.getComments().filter((c) => c.postId === postId).length;
  const userHasLiked = isAuthenticated && likes.some((l) => l.userId === currentUser.id);

  function handleLikeClick(e) {
    e.stopPropagation(); // don't trigger parent card's onClick (open post detail)

    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }

    const allLikes = storage.getLikes();

    if (userHasLiked) {
      // Unlike — remove this user's like for this post
      const updated = allLikes.filter(
        (l) => !(l.postId === postId && l.userId === currentUser.id)
      );
      storage.setLikes(updated);
    } else {
      // Like — add a new like entry
      const newLike = {
        id: generateId('like'),
        postId,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
      };
      storage.setLikes([...allLikes, newLike]);
    }

    onLikeChange?.(); // tell parent to re-render with fresh data
  }

  function handleCommentClick(e) {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }
    navigate(`/posts/${postId}`);
  }

  return (
    <div className="flex items-center gap-5 text-sm text-gray-500">
      <button
        onClick={handleLikeClick}
        className={`flex items-center gap-1.5 transition-colors ${
          userHasLiked ? 'text-coral font-medium' : 'hover:text-coral'
        }`}
      >
        <span>{userHasLiked ? '❤️' : '🤍'}</span> {likes.length}
      </button>

      <button onClick={handleCommentClick} className="flex items-center gap-1.5 hover:text-teal transition-colors">
        💬 {commentsCount}
      </button>
    </div>
  );
}