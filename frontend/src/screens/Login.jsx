import "../style/login.css";
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
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toastifySuccess } from "../utils/toastify";
import Meta from "../components/Meta";

const Login = () => {
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      toastifySuccess(`Welcome, ${userInfo.full_name}`);
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
    <div className="login-stage d-flex align-items-center flex-column min-vh-100 gradient-background min-vh-100">
      <Meta title="Cocktail Express - Login" />
      <div className="logo fade-in-image mt-4 mb-4">
        <img
          width="270px"
          src="./logonobg.png"
          alt="Cocktail Express Official Logo"
        />
      </div>
      <FormContainer>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
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
