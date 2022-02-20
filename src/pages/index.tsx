import { GetServerSideProps } from "next";
import React from "react";
import prisma from "../utils/prisma";
import { Post } from "@prisma/client";
import Header from "../components/Header";

export type PostInfomation = {
  posts: Pick<Post, "id" | "title" | "content" | "createdAt">[];
};

// DB のデータの更新このアプリケーションのビルドとは独立しているため動的に取得する
export const getServerSideProps: GetServerSideProps<PostInfomation> = async () => {
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

export default function Home(props: PostInfomation) {
  return (
    <>
     <Header /> 
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
