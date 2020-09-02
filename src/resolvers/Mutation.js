import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email;
    });
    if (emailTaken) {
      throw new Error("email taken");
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.users.push(user);

    return user;
  },
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author;
    });
    if (!userExists) {
      throw new Error("user doesn't exist");
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };
    db.posts.push(post);

    return post;
  },
  createComment(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);

    const postExist = db.posts.some(
      (post) => post.id === args.data.post && post.published
    );

    if (!userExist || !postExist) {
      throw new Error("unable to find user and post");
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);

    return comment;
  },
};

export { Mutation as default };
