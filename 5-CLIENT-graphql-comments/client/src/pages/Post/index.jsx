import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST } from "./queries";

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

  const { getPost } = data;

  return (
    <div>
      <h1>{getPost.title}</h1>
      <img
        src={getPost.cover}
        style={{ width: "460px", height: "150px", objectFit: "cover" }}
      />
      <p>{getPost.description}</p>
    </div>
  );
};

export default Post;
