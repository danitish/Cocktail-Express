import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuCard = ({ name, description, id, price_per_person }) => {
  return (
    <Col sm={12} md={4} lg={3} className="mb-3 mb-md-0">
      <Card className="h-100 shadow-lg">
        <Card.Header></Card.Header>
        <Card.Body className="h-100 d-flex flex-column">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-fill d-flex flex-column">
            <span>{description}</span>
            <hr />
            <span>
              Price Per Person: ₪
              {<span className="fw-bold">{price_per_person}</span>}
            </span>
          </Card.Text>
          <Link to={`/menus/${id}`}>
            <Button className="mt-1" variant="primary">
              Go to menu
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MenuCard;
