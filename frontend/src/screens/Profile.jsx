import { useEffect } from "react";
import "../style/profile.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Button, Card, ListGroup, Form } from "react-bootstrap";
import { useFormik } from "formik";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import Input from "../common/Input";
import Joi from "joi";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../store/actions/userActions";
import { myEvents } from "../store/actions/eventActions";
import { Link } from "react-router-dom";
import { toastifyError, toastifySuccess } from "../utils/toastify";
import { USER_UPDATE_RESET } from "../store/constants/userConstants";
import Meta from "../components/Meta";

const Profile = () => {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.userProfile);
  const { events } = useSelector((state) => state.myEvents);
  const {
    error: userUpdateError,
    loading: userUpdateLoading,
    success: userUpdateSuccess,
  } = useSelector((state) => state.userUpdate);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      full_name: "",
      email: "",
      password: "",
    },
    validate: validateFormikWithJoi({
      full_name: Joi.string().allow("").label("Full name").required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .allow("")
        .label("Email")
        .required(),
      password: Joi.string().allow("").label("Password").required(),
    }),
    onSubmit(values) {
      if (!values.full_name && !values.email && !values.password) {
        toastifyError("Please fill at least one value");
        return;
      }
      dispatch(updateUserProfile(values));
    },
  });

  useEffect(() => {
    const init = () => {
      if (!user || userUpdateSuccess) {
        dispatch(getUserProfile());
      } else {
        form.setValues({
          full_name: user.full_name,
          email: user.email,
          password: "",
        });
      }
      dispatch(myEvents());
    };
    init();
    if (userUpdateSuccess) {
      toastifySuccess("Updated successfully");
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [dispatch, user, userUpdateSuccess]);

  return (
    <>
      <Meta title="CE - My Profile" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col lg={4}>
            <h3 className="mt-2">My Profile:</h3>
            <Card className="mt-4 py-3 px-2 mb-5 mb-lg-0">
              <div className="d-flex flex-column align-items-center">
                <h4>{user ? user.full_name : "User"}</h4>
                <h6 className="text-muted">Cocktail Express</h6>
              </div>
              <ListGroup className="mt-2" variant="flush">
                <ListGroup.Item>
                  {!events?.length ? (
                    <span className="text-muted">Latest Event</span>
                  ) : (
                    <Link
                      className="link-style"
                      to={`/events/${events[0]?._id}?ref=profile`}
                    >
                      <span>Go to latest event</span>
                    </Link>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="link-style" to="/menus?ref=profile">
                    <span>My Menus</span>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="link-style" to="/items?ref=profile">
                    <span>My Items</span>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col lg={8}>
            <FormContainer>
              {userUpdateError && <Message>{userUpdateError}</Message>}
              {userUpdateLoading && <Loader />}
              <Form noValidate onSubmit={form.handleSubmit}>
                <Input
                  name="full name"
                  label="Full name"
                  error={form.touched.full_name && form.errors.full_name}
                  {...form.getFieldProps("full_name")}
                />
                <Input
                  name="email"
                  label="Email"
                  error={form.touched.email && form.errors.email}
                  {...form.getFieldProps("email")}
                />
                <Input
                  name="password"
                  label="Password"
                  error={form.touched.password && form.errors.password}
                  {...form.getFieldProps("password")}
                />
                <Button type="submit" className="mt-3" disabled={!form.isValid}>
                  Update Info
                </Button>
              </Form>
            </FormContainer>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Profile;
