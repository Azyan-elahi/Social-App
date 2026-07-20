import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import Avatar from '../components/ui/Avatar';
import PostCard from '../components/post/PostCard';

export default function ProfilePage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const { getUserPublicPosts } = usePosts();

  const profileUser = storage.getUsers().find((u) => u.id === userId);

  if (!profileUser) {
    return <p className="text-center py-20 text-gray-500">User not found.</p>;
  }

  const isOwner = currentUser?.id === profileUser.id;
  const publicPosts = getUserPublicPosts(profileUser.id);

  return (
    <div className="max-w-2xl mx-auto pb-14">
      {/* Cover */}
      <div
        className="h-52 w-full bg-gradient-to-br from-ink to-violet-900 relative overflow-hidden"
        style={
          profileUser.coverImage
            ? {
                backgroundImage: `url(${profileUser.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {!profileUser.coverImage && (
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-violet-500/20" />
        )}
      </div>

      <div className="px-6 relative z-10">
        {/* Avatar overlapping cover */}
        {/* Avatar overlapping cover */}
<div className="-mt-14 mb-4 flex items-end justify-between">
  <div className="ring-4 ring-white rounded-full bg-white">
    <Avatar src={profileUser.avatar} name={profileUser.name} size="lg" />
  </div>

  {isOwner && (
    <Link
      to="/dashboard/settings"
      className="text-sm font-medium text-violet-600 bg-white border border-violet-300 hover:bg-violet-50 transition-colors px-4 py-2 rounded-full mt-16"
    >
      Edit Profile
    </Link>
  )}
</div>

        <h1 className="font-serif text-2xl font-medium text-ink">{profileUser.name}</h1>

        {profileUser.bio && (
          <p className="text-gray-600 mt-2 leading-relaxed">{profileUser.bio}</p>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-500 mt-3">
          {profileUser.location && (
            <span className="flex items-center gap-1">📍 {profileUser.location}</span>
          )}
          <span className="flex items-center gap-1">🗓 Joined {formatDate(profileUser.joinedAt)}</span>
        </div>

        {/* Post count pill */}
        <div className="inline-flex items-center gap-1.5 bg-sand text-ink text-sm font-medium px-4 py-1.5 rounded-full mt-5">
          {publicPosts.length} {publicPosts.length === 1 ? 'Post' : 'Posts'}
        </div>

        {/* Public posts */}
        <div className="mt-6">
          {publicPosts.length === 0 ? (
            <div className="text-center py-16 bg-sand/40 rounded-2xl">
              <p className="text-gray-500">No public posts yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {publicPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}