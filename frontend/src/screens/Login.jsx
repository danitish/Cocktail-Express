import Input from "../common/Input";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <div className="login-stage min-vh-100 d-flex align-items-center flex-column">
      <div className="logo fade-in-image mt-4 mb-4">
        <img
          width="250px"
          src="./logo.png"
          alt="Cocktail Express Official Logo"
        />
      </div>
      <FormContainer>
        <Form noValidate>
          <Input label="Email" name="email" />
          <Input label="Password" name="password" />
          <Button className="my-3">Sign In</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
