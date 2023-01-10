import { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import Input from "../common/Input";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MenuCard from "../components/MenuCard";
import FormContainer from "../components/FormContainer";
import FormToggler from "../components/FormToggler";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Joi from "joi";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { addMenu, getMyMenus } from "../store/actions/menuActions";
import { useEffect } from "react";

const Menus = () => {
  const [toggleMenuForm, setToggleMenuForm] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.addMenu);
  const {
    loading: myMenusLoading,
    menus,
    error: myMenusError,
  } = useSelector((state) => state.myMenus);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      description: "",
    },
    validate: validateFormikWithJoi({
      name: Joi.string().required().label("Menu name"),
      description: Joi.string().required().label("Menu description"),
    }),
    onSubmit(values) {
      dispatch(addMenu(values));
    },
  });

  useEffect(() => {
    dispatch(getMyMenus());
    if (success) {
      form.values.name = "";
      form.values.description = "";
    }
    console.log(menus);
  }, [dispatch, success]);
  return (
    <>
      <FormToggler
        desc="Add a menu"
        state={toggleMenuForm}
        stateHandler={setToggleMenuForm}
      />

      {toggleMenuForm && (
        <FormContainer>
          <Form
            className="border border-dark rounded p-4"
            noValidate
            onSubmit={form.handleSubmit}
          >
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <Input
              name="name"
              label="Name"
              error={form.touched.name && form.errors.name}
              {...form.getFieldProps("name")}
            />
            <Input
              name="description"
              label="Description"
              error={form.touched.description && form.errors.description}
              {...form.getFieldProps("description")}
            />
            <Button type="submit" className="mt-4">
              Create Menu
            </Button>
          </Form>
        </FormContainer>
      )}
      <hr />
      <h3 className="mt-5 mb-3">My Menus:</h3>
      <Row>
        {myMenusLoading && <Loader />}
        {myMenusError && <Message>{myMenusError}</Message>}
        {menus ? (
          menus.map((menu) => (
            <MenuCard
              name={menu.name}
              description={menu.description}
              id={menu._id}
            />
          ))
        ) : (
          <h5>No menus added yet</h5>
        )}
      </Row>
    </>
  );
};

export default Menus;
