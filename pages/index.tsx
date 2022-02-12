import { GetServerSideProps } from "next";
import React from "react"
import prisma, { Post } from "../infrastructures/utils/prisma"

type Props = {
  posts: Pick<Post, "id" | "title" | "content">[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  return {
    props: {
      posts
    }
  }
}

/**
 * 
 * @param {Props} props
 * @return {JSX.Element} 
 */
export default function index(props: Props) {
  return (
    <>
      <div>post count: {props.posts.length}</div>
      {props.posts.map((post) => {
        return (
          <div key={post.id}>
            <p>{post.id}</p>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        )
      })}
    </>
  )
}
