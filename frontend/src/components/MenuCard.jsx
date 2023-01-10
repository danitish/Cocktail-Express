import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuCard = ({ name, description, id }) => {
  return (
    <Col sm={12} md={4} lg={3}>
      <Card key={id}>
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link to={`/menus/${id}`}>
            <Button variant="primary">Go to menu</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MenuCard;
