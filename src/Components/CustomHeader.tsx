import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Provider/AuthProvider";
import './CustomHeader.css';
const { Header } = Layout;

const authMenu = [
  {
    key: "home",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "logout",
    label: "Logout"
  },
];

const nonAuthMenu = [
  {
    key: "home",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "login",
    label: <Link to="/login">Login</Link>,
  },
];

const CustomHeader = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = e => {
    if (e.key === 'logout') {
      auth.signout().then(() => {
        navigate("/");
      });
    }
  }

  return (<Header>
    <div className="logo" />
    <Menu theme="dark" onClick={onClick} mode="horizontal" items={!auth.user ? nonAuthMenu : authMenu} />
  </Header>);
};

export default CustomHeader;
