import { List, Avatar } from "antd";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "./queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={data.getPosts}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.user.profilePhoto} />}
            title={<a href={item.id}>{item.title}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default Home;
