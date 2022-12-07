import { useFormik } from "formik";
import { Button, Form, Table } from "react-bootstrap";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import Input from "../common/Input";
import Joi from "joi";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { getMyItems, addItem } from "../store/actions/itemActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Items = () => {
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector((state) => state.myItems);
  const { error: addItemError, success: addItemSuccess } = useSelector(
    (state) => state.addItem
  );

  const [toggleAddItemForm, setToggleAddItemForm] = useState(false);

  useEffect(() => {
    dispatch(getMyItems());
  }, [dispatch, addItemSuccess]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      price: "",
    },
    validate: validateFormikWithJoi({
      name: Joi.string().required().label("Item name"),
      price: Joi.string().required().label("Item price"),
    }),
    onSubmit(values) {
      dispatch(addItem(values));
    },
  });

  return (
    <>
      {toggleAddItemForm ? (
        <Button
          onClick={() => setToggleAddItemForm(!toggleAddItemForm)}
          variant
          className="d-flex flex-column align-items-center mx-4 border-0"
        >
          <i className="fa fa-toggle-on fa-3x" aria-hidden="true"></i>
          <span className="mt-2">Exit form</span>
        </Button>
      ) : (
        <Button
          className="d-flex flex-column align-items-center mx-4 border-0"
          onClick={() => setToggleAddItemForm(!toggleAddItemForm)}
          variant
        >
          <i className="fa fa-toggle-off fa-3x" aria-hidden="true"></i>
          <span className="mt-2">Add an item</span>
        </Button>
      )}

      {toggleAddItemForm && (
        <FormContainer>
          <Form
            className="border border-dark rounded p-4"
            noValidate
            onSubmit={form.handleSubmit}
          >
            {addItemError && <Message>{addItemError}</Message>}
            <Input
              name="item"
              label="Item name"
              error={form.touched.name && form.errors.name}
              {...form.getFieldProps("name")}
            />
            <Input
              name="price"
              label="Item price"
              error={form.touched.price && form.errors.price}
              {...form.getFieldProps("price")}
            />
            <Button type="submit" className="my-3">
              Add Item
            </Button>
          </Form>
        </FormContainer>
      )}
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {items && items.length ? (
        <>
          <h3 className="mt-5 mb-3 fst-italic">My Items:</h3>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.price + "₪"}</td>
                  <td>PLACEHOLDER</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h4 className="mt-5">No items added yet ...</h4>
      )}
    </>
  );
};

export default Items;
