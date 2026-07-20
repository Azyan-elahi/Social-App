import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/post/PostCard';

export default function FeedPage() {
  const { getPublicPosts } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');

  const publicPosts = getPublicPosts();

  const filteredPosts = publicPosts.filter((post) =>
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-medium text-ink">Your Feed</h1>
        <p className="text-gray-500 text-sm mt-1">See what everyone's sharing</p>
      </div>

      <div className="relative mb-8 group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-500 transition-colors">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-12 pr-11 py-3.5 bg-sand/40 border-2 border-transparent rounded-full outline-none focus:bg-white focus:border-violet-400 focus:shadow-lg focus:shadow-violet-100 transition-all text-sm placeholder:text-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {publicPosts.length === 0 ? (
        <div className="text-center py-24 bg-sand/40 rounded-2xl">
          <p className="text-lg text-gray-500">No posts yet — be the first to share!</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-24 bg-sand/40 rounded-2xl">
          <p className="text-lg text-gray-500">No results found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}