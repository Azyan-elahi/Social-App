import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { formatDate, truncateText } from '../../utils/helpers';
import Avatar from '../ui/Avatar';
import PostActions from './PostActions';

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [, forceRerender] = useState(0);

  const author = storage.getUsers().find((u) => u.id === post.authorId);

  if (!author) return null;

  function goToPost() {
    navigate(`/posts/${post.id}`);
  }

  function goToProfile(e) {
    e.stopPropagation();
    navigate(`/profile/${author.id}`);
  }

  return (
    <div
      onClick={goToPost}
      className="bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-3" onClick={goToProfile}>
        <Avatar src={author.avatar} name={author.name} size="md" />
        <div>
          <p className="font-medium text-ink hover:text-teal transition-colors">{author.name}</p>
          <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-3 whitespace-pre-wrap leading-relaxed">
        {truncateText(post.description, 200)}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full max-h-96 object-cover rounded-xl mb-3"
        />
      )}

      <div className="pt-2 border-t border-gray-50">
        <PostActions postId={post.id} onLikeChange={() => forceRerender((n) => n + 1)} />
      </div>
    </div>
  );
}