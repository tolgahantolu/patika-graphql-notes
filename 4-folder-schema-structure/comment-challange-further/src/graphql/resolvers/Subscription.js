import { withFilter } from "graphql-yoga";

export const Subscription = {
  userCreated: {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("userCreated"),
  },
  userUpdated: {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("userUpdated"),
  },
  userDeleted: {
    subscribe: (_, __, context) => context.pubsub.asyncIterator("userDeleted"),
  },

  postCreated: {
    subscribe: withFilter(
      (_, __, context) => context.pubsub.asyncIterator("userCreated"),
      (payload, variables) => {
        console.log("payload", payload);
        console.log("variables", variables);

        return variables.user_id
          ? payload.postCreated.user_id === variables.user_id
          : true;
      }
    ),
  },
};
