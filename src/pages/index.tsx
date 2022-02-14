import { GetServerSideProps } from "next";
import React from "react";
import prisma, { Post } from "../infrastructures/utils/prisma";

type PostProps = {
  posts: Pick<Post, "id" | "title" | "content" | "createdAt">[];
};

export const getServerSideProps: GetServerSideProps<PostProps> = async () => {
  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  // Date の createdAt を String に変換
  const posts = JSON.parse(JSON.stringify(allPosts));

  return {
    props: {
      posts: posts,
    },
  };
};

export default function index(props: PostProps) {
  return (
    <>
      <div>post count: {props.posts.length}</div>
      {props.posts.map((post) => {
        return (
          <div key={post.id}>
            <p>{post.createdAt}</p>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        );
      })}
    </>
  );
}
