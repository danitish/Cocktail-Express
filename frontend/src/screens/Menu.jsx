import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyItems } from "../store/actions/itemActions";
import { getMyMenus } from "../store/actions/menuActions";

const Menu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyItems());
    dispatch(getMyMenus());
  }, [dispatch]);

  const { items } = useSelector((state) => state.myItems);
  const { menus } = useSelector((state) => state.myMenus);

  const menu = menus ? menus.find((menu) => menu._id === id) : "";

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/menus">Menus</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{menu ? menu.name : id}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default Menu;
