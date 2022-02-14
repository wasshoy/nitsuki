import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create new Tag with the name.
 * @param {string} name Name of tag.
 */
export async function createTag(name: string) {
  const createdTag = await prisma.tag.create({
    data: {
      name: name,
    },
  });
  console.dir(createdTag);
}

export const createPostWithNewTags = async (post: {
  title: string;
  content: string;
  tag: { name: string };
}) => {
  const createdPost = await prisma.post.create({
    // Post を新規作成
    data: {
      title: post.title,
      content: post.content,
      published: true,
      tags: {
        // TagsOnPosts を新規作成
        create: {
          tag: {
            // Tag を新規作成
            create: {
              name: post.tag.name,
            },
          },
        },
      },
    },
  });
  console.dir(createdPost);
};

/**
 * Find all posts.
 */
export async function findAllPosts() {
  const posts = await prisma.post.findMany();
  console.dir(posts, { depth: null });
}

/**
 *
 * @param {Post} post with a tag's name.
 */
export const createPostWithExistingTag = async (post: {
  title: string;
  content: string;
  tag: { name: string };
}) => {
  const createdPost = await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      published: true,
      tags: {
        create: {
          tag: {
            connect: {
              name: post.tag.name,
            },
          },
        },
      },
    },
  });
  console.dir(createdPost);
};

export const findAllTags = async () => {
  console.dir(await prisma.tag.findMany());
};

/**
 *
 * @param {string} tagName a name of tag.
 */
export const findPostByTag = async (tagName: string) => {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: tagName,
          },
        },
      },
    },
  });
  console.dir(posts);
};

export const findUniqueTag = async (tagName: string) => {
  console.dir(
    await prisma.tag.findUnique({
      where: {
        name: "Prisma",
      },
    })
  );
};

export const updatePostExistingTag = async (id: number, tagName: string) => {
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      tags: {
        create: {
          tag: {
            connect: {
              name: tagName,
            },
          },
        },
      },
    },
  });
  console.dir(post);
};

export const deletePost = async (id: number) => {
  console.dir(
    await prisma.post.delete({
      where: {
        id: id,
      },
    })
  );
};
