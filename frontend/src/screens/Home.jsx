import "../style/home.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Badge } from "react-bootstrap";
import { useEffect } from "react";
import { getMyMenus } from "../store/actions/menuActions";
import { getMyItems } from "../store/actions/itemActions";
import { myEvents } from "../store/actions/eventActions";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import Loader from "../components/Loader";

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { menus, loading: menusLoad } = useSelector((state) => state.myMenus);
  const { items, loading: itemsLoad } = useSelector((state) => state.myItems);
  const { events, loading: eventsLoad } = useSelector(
    (state) => state.myEvents
  );

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

  const updateNotes = [
    "Implemented Google Maps Autocomplete when entering an event location in form.",
    "Added Waze re-direct in each event card.",
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
  }, [dispatch]);

  if (menusLoad || eventsLoad || itemsLoad) {
    return (
      <div className="d-flex align-items-center  min-vh-100">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Meta />
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
      <hr />
      <h4>
        <Badge bg="info" className="mt-2">
          Updates: <span className="ms-1">(12.04.23)</span>
        </Badge>
      </h4>
      <ul>
        {updateNotes.map((note) => (
          <li className="my-1" key={note}>
            {note}
          </li>
        ))}
      </ul>
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
      <div className="d-flex justify-content-center align-items-center">
        <Link to="/analytics">
          <Button className="p-3 mb-3">
            <span className="lead">Click to re-direct to full analytics</span>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
