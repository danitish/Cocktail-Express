import Input from "../common/Input";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import Joi from "joi";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { login } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateFormikWithJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(6)
        .max(255)
        .required()
        .label("Email"),
      password: Joi.string().min(6).max(1024).required().label("Password"),
    }),
    onSubmit(values) {
      dispatch(login(values));
    },
  });

  return (
    <div className="login-stage d-flex align-items-center flex-column">
      <div className="logo fade-in-image mt-4 mb-4">
        <img
          width="250px"
          src="./logo.png"
          alt="Cocktail Express Official Logo"
        />
      </div>
      <FormContainer>
        {error && <p>{error}</p>}
        <Form noValidate onSubmit={form.handleSubmit}>
          <Input
            label="Email"
            name="email"
            error={form.touched.email && form.errors.email}
            {...form.getFieldProps("email")}
          />
          <Input
            label="Password"
            name="password"
            {...form.getFieldProps("password")}
            error={form.touched.password && form.errors.password}
          />
          <Button type="submit" disabled={!form.isValid} className="my-3">
            Log In
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
