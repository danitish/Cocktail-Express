import "../style/home.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useEffect } from "react";
import { getMyMenus } from "../store/actions/menuActions";
import { getMyItems } from "../store/actions/itemActions";
import { myEvents } from "../store/actions/eventActions";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { menus } = useSelector((state) => state.myMenus);
  const { items } = useSelector((state) => state.myItems);
  const { events } = useSelector((state) => state.myEvents);

  const data_section_info = [
    {
      url: "/events",
      name: "Events",
      data_length: events ? events.length : "N/A",
      icon: "fa-solid fa-calendar-days fa-2x",
    },
    {
      url: "/menus",
      name: "Menus",
      data_length: menus ? menus.length : "N/A",
      icon: "fa-solid fa-bars fa-2x",
    },
    {
      url: "/items",
      name: "Items",
      data_length: items ? items.length : "N/A",
      icon: "fa-solid fa-champagne-glasses fa-2x",
    },
  ];

  const [hour, setHour] = useState(new Date().getHours());

  const dispatch = useDispatch();

  useEffect(() => {
    const init = () => {
      dispatch(getMyMenus());
      dispatch(getMyItems());
      dispatch(myEvents());
    };
    init();
  }, []);

  return (
    <>
      <Row>
        <header>
          <h4 className="header my-3 fade-in-image">
            Good{" "}
            {hour >= 6 && hour < 12
              ? "Morning, "
              : hour >= 12 && hour < 18
              ? "Afternoon, "
              : hour >= 18 && hour < 22
              ? "Evening, "
              : hour >= 22
              ? "Night, "
              : ""}
            {userInfo?.full_name.split(" ")[0]}.
          </h4>
        </header>
      </Row>
      <hr />
      <div className="my-data d-flex p-5 my-5 align-items-center">
        <h4 className="my-data-title d-none d-md-block">Biz By Numbers</h4>
        <div className="vl d-none d-md-block"></div>
        <div className="data d-flex flex-fill justify-content-between justify-content-md-around">
          {data_section_info.map((data) => (
            <div key={data.url}>
              <div className="d-flex flex-column justify-content-center align-items-center gap-2 fw-bold">
                <Link to={data.url} style={{ color: "inherit" }}>
                  <i className={data.icon + " mb-2"}></i>
                </Link>
                <span>{data.name}</span>
                <span>{data.data_length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
