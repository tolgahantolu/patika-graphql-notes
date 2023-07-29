import { Button, Form, Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const NewPostForm = () => {
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      //  onFinish={onFinish}
      //  onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input post title!" }]}
      >
        <Input size="large" placeholder="Post Title" />
      </Form.Item>

      <Form.Item name="shortDescription">
        <Input size="large" placeholder="Short Description" />
      </Form.Item>

      <Form.Item name="description">
        <TextArea size="large" placeholder="Description" />
      </Form.Item>

      <Form.Item name="cover">
        <Input size="large" placeholder="Cover Image" />
      </Form.Item>

      <Form.Item
        name="userId"
        rules={[{ required: true, message: "Please select a user!" }]}
      >
        <Select size="large" placeholder="Select a user">
          <Option value="demo">Demo</Option>
          <Option value="asd">başka</Option>
          <Option value="ds">bir</Option>
          <Option value="demadawo">evrende</Option>
          <Option value="demdso">EN</Option>
          <Option value="dasemo">güzel</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add New Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPostForm;
