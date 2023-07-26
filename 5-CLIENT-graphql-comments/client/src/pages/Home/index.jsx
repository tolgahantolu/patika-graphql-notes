import { List, Skeleton, Avatar } from "antd";

const data = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Vlast",
      last: "Skidan",
    },
    email: "vlast.skidan@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    nat: "UA",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Vlast",
      last: "Skidan",
    },
    email: "vlast.skidan@example.com",
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    nat: "UA",
  },
];

const Home = () => {
  return (
    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Home;
