import { Col, Card, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const EventCard = ({ name, date, income, menu_name, attendance, id }) => {
  const event_date = new Date(date).toLocaleDateString("he-IL");
  const event_time = new Date(date).toLocaleTimeString("he-IL", {
    timeStyle: "short",
  });

  return (
    <Col sm={12} md={4} lg={3} className="mb-3 mb-md-0 mt-0 mt-lg-3">
      <Card className="h-100 shadow-lg">
        <Card.Header>
          <span className="fw-bold">{`${event_date} - ${event_time}`}</span>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <span className="lead">{name}</span>
          </Card.Title>
          <ListGroup className="list-group-flush py-2 my-3">
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
