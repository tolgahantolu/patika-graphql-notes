import { Button, Form, Input, Select } from "antd";
const { Option } = Select;
import { useMutation, useQuery } from "@apollo/client";
import { useRef } from "react";
import { ADD_NEW_COMMENT, GET_USERS } from "./queries";

const NewCommentForm = ({ post_id }) => {
  const { loading: getUsersLoading, data: users } = useQuery(GET_USERS);
  const [createComment, { loading }] = useMutation(ADD_NEW_COMMENT);

  const formRef = useRef();

  const handleSubmit = async (values) => {
    try {
      await createComment({
        variables: {
          input: { ...values, post_id },
        },
      });

      formRef.current.resetFields();
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <Form name="basic" onFinish={handleSubmit} autoComplete="off" ref={formRef}>
      <Form.Item
        name="user_id"
        rules={[{ required: true, message: "Please select a user!" }]}
      >
        <Select
          disabled={getUsersLoading || loading}
          loading={getUsersLoading}
          size="medium"
          placeholder="Select a user"
        >
          {users?.users.map(({ id, fullname }) => (
            <Option key={id} value={id}>
              {fullname}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="text"
        rules={[{ required: true, message: "Please input message!" }]}
      >
        <Input disabled={loading} size="medium" placeholder="Message" />
      </Form.Item>

      <Form.Item>
        <Button disabled={loading} type="primary" htmlType="submit">
          Add New Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewCommentForm;
