import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./styles.modules.css";

const HeaderMenu = () => {
  const location = useLocation();

  return (
    <Menu selectedKeys={location.pathname} mode="horizontal">
      <Menu.Item key="/" className="menuItem">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/new" className="menuItem">
        <Link to="/new">Add New Post</Link>
      </Menu.Item>
    </Menu>
  );
};
export default HeaderMenu;
