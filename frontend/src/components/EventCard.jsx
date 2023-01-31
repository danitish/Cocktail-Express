import { Col, Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { popup } from "../utils/popups";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMyMenus } from "../store/actions/menuActions";

const EventCard = ({ name, date, income, menu_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { menus } = useSelector((state) => state.myMenus);

  useEffect(() => {
    dispatch(getMyMenus());
  }, []);

  const event_date = new Date(date).toLocaleDateString("he-IL");
  const event_time = new Date(date).toLocaleTimeString("he-IL", {
    timeStyle: "short",
  });

  return (
    <Col sm={12} md={4} lg={3} className="mb-3 mb-md-0 mt-0 mt-lg-3">
      <Card className="h-100 shadow-lg">
        <Card.Header>
          <span className="fw-bold">
            {/* {event_date.toUTCString().split("GMT")[0]} */}
            {`${event_date} - ${event_time}`}
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <span className="lead">{name}</span>
          </Card.Title>
          <ListGroup className="list-group-flush py-2 my-3">
            <ListGroup.Item>
              <span style={{ letterSpacing: 1 }}>
                {menus
                  ? menus.find((menu) => menu._id === menu_id).name
                  : menu_id}{" "}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>Income: ₪{income}</ListGroup.Item>
          </ListGroup>
          <Button className="mt-2" variant="primary">
            Go to event
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
