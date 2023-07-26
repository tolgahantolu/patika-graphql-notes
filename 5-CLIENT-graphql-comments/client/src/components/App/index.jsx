import { Row, Col } from "antd";
import { Switch, Route } from "react-router-dom";
import "./styles.modules.css";

// components
import HeaderMenu from "./HeaderMenu";

// pages
import Home from "../../pages/Home";
import NewPost from "../../pages/NewPost";
import Post from "../../pages/Post";

function App() {
  return (
    <div className="container">
      <Row justify="center">
        <Col span={14} className="content">
          <HeaderMenu />
        </Col>
        <Col span={14} className="content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/new" exact>
              <NewPost />
            </Route>
            <Route path="/post/:id" exact>
              <Post />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default App;
