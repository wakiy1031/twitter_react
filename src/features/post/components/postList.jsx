import { useState, useEffect } from "react";
import { getPosts } from "../../api/postApi";
import { PostItem } from "./postItem";

export const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("投稿一覧取得エラー:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </>
  );
};
