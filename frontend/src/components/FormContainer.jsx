import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="py-3">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6} xl={4}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
