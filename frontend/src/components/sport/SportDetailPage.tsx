'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, Share2, MapPin, Calendar, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { TeacherSportItem, TeacherCommentItem } from '@/types';
import { teacherSportsApi } from '@/lib/api';

interface Props {
  uuid: string;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80';

export function SportDetailPage({ uuid }: Props) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [commentText, setCommentText] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const queryClient = useQueryClient();

  // Fetch sport details by UUID
  const { data: sport, isLoading, error } = useQuery<TeacherSportItem>({
    queryKey: ['sport-detail', uuid],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getSportByUuid(uuid);
        if (res.data && res.data.uuid) return res.data;
      } catch (e) {
        // If not found in sports, check events
      }
      try {
        const eventRes = await teacherSportsApi.getEventByUuid(uuid);
        return eventRes.data;
      } catch (e) {
        return null;
      }
    },
  });

  // Fetch comments for this item
  const { data: comments = [] } = useQuery<TeacherCommentItem[]>({
    queryKey: ['sport-comments', uuid],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getComments(uuid);
        return Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        return [];
      }
    },
  });

  // Fetch all sports for "Related Sports" section
  const { data: allSports = [] } = useQuery<TeacherSportItem[]>({
    queryKey: ['all-sports-related'],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getAllSports();
        return Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        return [];
      }
    },
  });

  // Add Comment Mutation
  const commentMutation = useMutation({
    mutationFn: async (text: string) => {
      return teacherSportsApi.createComment(uuid, text);
    },
    onSuccess: () => {
      toast.success('Comment posted!');
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['sport-comments', uuid] });
    },
    onError: () => {
      toast.error('Failed to post comment. Please try again.');
    },
  });

  // Toggle Favorite
  const handleToggleFavorite = async () => {
    try {
      await teacherSportsApi.createFavorite({
        sportUuid: uuid,
        eventUuid: '',
      });
      setIsFavorited(!isFavorited);
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites!');
    } catch (e) {
      setIsFavorited(!isFavorited);
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites!');
    }
  };


  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    commentMutation.mutate(commentText.trim());
  };

  if (isLoading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-espn-red mb-4"></div>
        <p className="text-espn-text-muted">Loading sport details...</p>
      </div>
    );
  }

  if (error || !sport) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
        <h2 className="text-white text-2xl font-bold mb-4">Sport Not Found</h2>
        <p className="text-espn-text-muted mb-6">Could not find details for this item.</p>
        <Link href="/sports" className="inline-flex items-center gap-2 bg-espn-red text-white px-4 py-2 rounded font-bold hover:bg-espn-red-dark">
          <ArrowLeft className="w-4 h-4" /> Back to All Sports
        </Link>
      </div>
    );
  }

  const categoryName = sport.category?.name || (sport as any).categoryName || 'Sports';
  const images = sport.imageUrls && sport.imageUrls.length > 0 ? sport.imageUrls : [FALLBACK_IMAGE];
  const activeImage = images[selectedImage] || images[0];
  const locationName = (sport as any).locationName;

  const relatedSports = allSports
    .filter((s) => s.uuid !== sport.uuid && (s.category?.name === categoryName || !categoryName))
    .slice(0, 4);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-espn-text-muted mb-4">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/sports" className="hover:text-white transition-colors">Sports</Link>
        <span>/</span>
        <Link href={`/${categoryName.toLowerCase()}`} className="text-espn-red font-bold hover:underline">
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-white truncate max-w-[200px]">{sport.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image Gallery */}
          <div className="bg-espn-dark rounded-md overflow-hidden border border-espn-gray-border">
            <div className="relative h-[220px] xs:h-[300px] sm:h-[380px] md:h-[460px] w-full bg-black">
              <Image
                src={activeImage}
                alt={sport.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                unoptimized
              />
              <div className="absolute top-4 left-4">
                <span className="bg-espn-red text-white text-xs font-black px-3 py-1 uppercase rounded-sm tracking-wider">
                  {categoryName}
                </span>
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-2 p-3 bg-espn-darker border-t border-espn-gray-border overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-espn-red scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`${sport.name} ${i}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="bg-espn-dark p-4 sm:p-6 rounded-md border border-espn-gray-border space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                {sport.name}
              </h1>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2.5 rounded-full border transition-colors ${
                    isFavorited
                      ? 'bg-espn-red border-espn-red text-white'
                      : 'border-espn-gray-border text-espn-text hover:text-white hover:bg-espn-gray'
                  }`}
                  title="Save to Favorites"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="p-2.5 rounded-full border border-espn-gray-border text-espn-text hover:text-white hover:bg-espn-gray transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-espn-text-muted border-y border-espn-gray-border py-3">
              {sport.createdAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-espn-red" />
                  <span suppressHydrationWarning>Published: {formatDistanceToNow(new Date(sport.createdAt), { addSuffix: true })}</span>
                </div>
              )}

              {locationName && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-espn-red" />
                  <span className="text-white font-medium">{locationName}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-espn-red" />
                <span>{comments.length} Comments</span>
              </div>
            </div>

            {/* Description / Story */}
            <div className="text-espn-text text-base leading-relaxed space-y-3 pt-2">
              <p className="whitespace-pre-line text-lg font-light text-gray-200">
                {sport.description}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-espn-dark p-6 rounded-md border border-espn-gray-border space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2 border-l-4 border-espn-red pl-2">
              Fan Discussion & Comments ({comments.length})
            </h3>

            {/* Post Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Join the conversation... Share your thoughts about this sport or match!"
                rows={3}
                className="w-full bg-espn-gray border border-espn-gray-border rounded p-3 text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red transition-colors text-sm"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={commentMutation.isPending || !commentText.trim()}
                  className="inline-flex items-center gap-2 bg-espn-red text-white px-5 py-2 rounded font-bold text-sm hover:bg-espn-red-dark transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {commentMutation.isPending ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="divide-y divide-espn-gray-border pt-2">
              {comments.length === 0 ? (
                <div className="py-6 text-center text-espn-text-muted text-sm">
                  Be the first to share your comment on this sport!
                </div>
              ) : (
                comments.map((c, i) => (
                  <div key={c.id || i} className="py-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-espn-red/30 text-espn-red text-xs flex items-center justify-center font-black">
                          {i + 1}
                        </span>
                        Sports Fan
                      </span>
                      {c.createdAt && (
                        <span className="text-[11px] text-espn-text-muted" suppressHydrationWarning>
                          {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                        </span>
                      )}

                    </div>
                    <p className="text-sm text-espn-text pl-8">{c.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Back button */}
          <Link
            href="/sports"
            className="flex items-center justify-center gap-2 w-full bg-espn-gray border border-espn-gray-border text-white py-2.5 rounded font-bold hover:bg-espn-gray-light transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> View All Sports
          </Link>

          {/* Category Info Box */}
          <div className="bg-espn-dark p-5 rounded-md border border-espn-gray-border">
            <span className="text-[10px] font-bold uppercase text-espn-red tracking-wider">Category</span>
            <h3 className="text-xl font-black text-white mt-1">{categoryName}</h3>
            <p className="text-xs text-espn-text-muted mt-2">
              Official sports coverage and events provided by the sports API.
            </p>
            <Link
              href={`/${categoryName.toLowerCase()}`}
              className="mt-4 block text-center bg-espn-red/10 border border-espn-red/40 text-espn-red text-xs font-bold py-2 rounded hover:bg-espn-red hover:text-white transition-all"
            >
              Explore all {categoryName} items →
            </Link>
          </div>

          {/* Related Sports */}
          <div className="bg-espn-dark p-5 rounded-md border border-espn-gray-border space-y-4">
            <h3 className="text-base font-black text-white border-l-4 border-espn-red pl-2 uppercase">
              More in {categoryName}
            </h3>
            <div className="space-y-3">
              {relatedSports.length === 0 ? (
                <p className="text-xs text-espn-text-muted">No more related sports found.</p>
              ) : (
                relatedSports.map((rel) => (
                  <Link
                    key={rel.uuid}
                    href={`/sport-detail/${rel.uuid}`}
                    className="flex gap-3 group items-center py-2 border-b border-espn-gray-border last:border-none"
                  >
                    <div className="relative w-14 h-14 rounded overflow-hidden shrink-0 bg-espn-gray">
                      <Image
                        src={rel.imageUrls?.[0] || FALLBACK_IMAGE}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white group-hover:text-espn-red transition-colors line-clamp-2">
                        {rel.name}
                      </h4>
                      <p className="text-[10px] text-espn-text-muted mt-0.5">Click to view details</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
