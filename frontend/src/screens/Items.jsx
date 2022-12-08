import { useFormik } from "formik";
import { Button, Form, Table } from "react-bootstrap";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import Input from "../common/Input";
import Joi from "joi";
import FormContainer from "../components/FormContainer";
import { useState, useEffect } from "react";
import { getMyItems, addItem, removeItem } from "../store/actions/itemActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Items = () => {
  const dispatch = useDispatch();

  const { loading, items, error } = useSelector((state) => state.myItems);
  const { error: addItemError, success: addItemSuccess } = useSelector(
    (state) => state.addItem
  );
  const { error: removeItemError, success: removeItemSuccess } = useSelector(
    (state) => state.removeItem
  );

  const [toggleAddItemForm, setToggleAddItemForm] = useState(false);

  useEffect(() => {
    dispatch(getMyItems());
    if (addItemSuccess) {
      form.values.name = "";
      form.values.price = "";
    }
  }, [dispatch, addItemSuccess, removeItemSuccess]);

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

  const deleteItemHandler = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <>
      {toggleAddItemForm ? (
        <Button
          onClick={() => setToggleAddItemForm(!toggleAddItemForm)}
          variant
          className="d-flex flex-column align-items-center mx-4 border-0 ms-4"
        >
          <i className="fa fa-toggle-on fa-3x" aria-hidden="true"></i>
          <span className="mt-2">Exit form</span>
        </Button>
      ) : (
        <Button
          className="d-flex flex-column align-items-center mx-4 border-0 ms-3"
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
      <hr />
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {removeItemError && <Message>{removeItemError}</Message>}
      {items && items.length ? (
        <>
          <h3 className="mt-5 mb-3 fst-italic">My Items:</h3>
          <div className="text-danger mb-2">
            <span>*</span> Deleting an item will also remove it from associated
            menus <span>*</span>
          </div>
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
                  <td className="d-flex justify-content-center">
                    <Button
                      title="Delete Item"
                      onClick={() => deleteItemHandler(item._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                  </td>
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
