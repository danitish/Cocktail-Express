import { Col, Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const EventCard = ({
  name,
  date,
  income,
  menu_name,
  attendance,
  id,
  deleteEventHandler,
}) => {
  const event_date = new Date(date).toLocaleDateString("he-IL");
  const event_time = new Date(date).toLocaleTimeString("he-IL", {
    timeStyle: "short",
  });

  return (
    <Col sm={12} md={6} lg={4} xxl={3} className="mb-3 mt-0 mt-lg-3">
      <Card className="h-100 shadow-lg">
        <Card.Header className="d-flex justify-content-between">
          <span className="fw-bold">{`${event_date} - ${event_time}`}</span>
          <div>
            <Button
              title="Delete Event"
              className="btn-sm mx-1"
              onClick={() => deleteEventHandler(id)}
            >
              <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
            </Button>
            <Link to={`/events/${id}/edit`}>
              <Button title="Edit Event" className="btn-sm">
                <i className="fa-solid fa-pen-to-square fa-lg"></i>
              </Button>
            </Link>
          </div>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <span className="lead">{name}</span>
          </Card.Title>
          <ListGroup className="list-group-flush py-2 my-3 flex-fill">
            <ListGroup.Item>
              <span style={{ letterSpacing: 1 }}>
                {menu_name ? menu_name : "No menu"}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              {attendance.toLocaleString("en-US")} people
            </ListGroup.Item>
            <ListGroup.Item>
              Income: ₪
              <span className="fw-bold">{income.toLocaleString("en-US")}</span>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/events/${id}`}>
            <Button className="mt-2" variant="primary">
              Go to event
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventCard;
