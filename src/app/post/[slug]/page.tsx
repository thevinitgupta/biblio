"use client"
import DetailsSkeleton from '@/components/DetailsSkeleton';
import PostActions from '@/components/posts/PostActions';
import PostView from '@/components/posts/PostView';
import useFetchPost from '@/hooks/useFetchPost';
import useFetchReactions from '@/hooks/useFetchReactions';
import useFetchSimilarPosts from '@/hooks/useFetchSimilarPosts';
import { EntityReactions, EntityType } from '@/types/reaction';
import React from 'react';

interface PostPageProps {
  params: { slug: string };
}

const PostPage = ({ params }: PostPageProps) => {
  console.log("Dynamic Route Props:", params);
  
  
};

export default PostPage;