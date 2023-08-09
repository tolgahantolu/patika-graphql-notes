import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST } from "./queries";
import CommentsList from "./Comments/CommentsList";

const Post = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  const { posts_by_pk } = data;

  return (
    <div>
      <h1>{posts_by_pk.title}</h1>
      <img
        src={posts_by_pk.cover}
        style={{ width: "460px", height: "150px", objectFit: "cover" }}
      />
      <p>{posts_by_pk.description}</p>

      <CommentsList post_id={id} />
    </div>
  );
};

export default Post;
