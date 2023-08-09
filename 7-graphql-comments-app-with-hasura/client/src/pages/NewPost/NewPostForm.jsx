import { Button, Form, Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ADD_NEW_POST, GET_USERS } from "./queries";

const NewPostForm = () => {
  const history = useHistory();
  const { loading: getUsersLoading, data: users } = useQuery(GET_USERS);
  const [savePost, { loading }] = useMutation(ADD_NEW_POST);

  const handleSubmit = async (values) => {
    try {
      await savePost({
        variables: {
          input: values,
        },
      });
      history.push("/");
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      //  onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input post title!" }]}
      >
        <Input disabled={loading} size="large" placeholder="Post Title" />
      </Form.Item>

      <Form.Item name="shortDescription">
        <Input
          disabled={loading}
          size="large"
          placeholder="Short Description"
        />
      </Form.Item>

      <Form.Item name="description">
        <TextArea disabled={loading} size="large" placeholder="Description" />
      </Form.Item>

      <Form.Item name="cover">
        <Input disabled={loading} size="large" placeholder="Cover Image" />
      </Form.Item>

      <Form.Item
        name="user_id"
        rules={[{ required: true, message: "Please select a user!" }]}
      >
        <Select
          disabled={getUsersLoading || loading}
          loading={getUsersLoading}
          size="large"
          placeholder="Select a user"
        >
          {users?.users.map(({ id, fullname }) => (
            <Option key={id} value={id}>
              {fullname}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button disabled={loading} type="primary" htmlType="submit">
          Add New Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPostForm;
