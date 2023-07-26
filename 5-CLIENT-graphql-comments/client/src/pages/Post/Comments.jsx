import { Button, Comment, Divider, List } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "./queries";
import { useEffect, useState } from "react";
const Comments = ({ post_id }) => {
  const [btnIsVisible, setBtnIsVisible] = useState(true);
  const [loadComments, { loading, error, data }] = useLazyQuery(
    GET_POST_COMMENTS,
    {
      variables: { id: post_id },
    }
  );
  if (error) return `Something went wrong: ${error.message}`;

  useEffect(() => {
    if (!loading && data) return setBtnIsVisible(false);
  }, [loading, data]);

  return (
    <>
      <Divider>Comments</Divider>
      {btnIsVisible && (
        <div style={{ textAlign: "center" }}>
          <Button loading={loading} onClick={() => loadComments()}>
            Load Comments
          </Button>
        </div>
      )}
      {!loading && data && (
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={data.getPost.comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullname}
                avatar={item.user.profilePhoto}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </>
  );
};

export default Comments;
