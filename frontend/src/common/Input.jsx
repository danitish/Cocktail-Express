import { Form } from "react-bootstrap";

export const Input = ({ label, error, name, ...rest }) => {
  return (
    <Form.Group className="py-2">
      <Form.Label>{label}:</Form.Label>
      <Form.Control
        placeholder={label}
        {...rest}
        name={name}
        isInvalid={error}
      ></Form.Control>
      <Form.Control.Feedback className="py-1" type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
