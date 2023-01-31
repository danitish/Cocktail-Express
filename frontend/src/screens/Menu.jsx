import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Breadcrumb, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyItems } from "../store/actions/itemActions";
import {
  getMenuDetails,
  updateMenuPricePerPerson,
} from "../store/actions/menuActions";
import RatioUpdate from "../components/RatioUpdate";
import Input from "../common/Input";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import FormToggler from "../components/FormToggler";
import Joi from "joi";
import { useFormik } from "formik";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { toastifyError, toastifySuccess } from "../utils/toastify";
import { addMenuItem, getMenuItems } from "../store/actions/menuItemActions";

const Menu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.addMenuItem);
  const { items } = useSelector((state) => state.myItems);
  const { menu } = useSelector((state) => state.menuDetails);
  const {
    menuItems,
    error: menuItemsError,
    loading: menuItemsLoading,
  } = useSelector((state) => state.menuItems);

  const [toggleAddItemForm, setToggleAddItemForm] = useState(false);
  const [ratioUpdated, setRatioUpdate] = useState(false);

  useEffect(() => {
    const init = () => {
      dispatch(getMyItems());
      dispatch(getMenuDetails(id));
      dispatch(getMenuItems(id));
    };
    init();

    if (success) {
      toastifySuccess("Added successfully");
      dispatch(updateMenuPricePerPerson(id));
    }
    if (ratioUpdated) {
      dispatch(updateMenuPricePerPerson(id));
    }
  }, [dispatch, success, id, ratioUpdated]);

  const form = useFormik({
    initialValues: {
      item: "",
      item_quantity: 0,
    },
    validate: validateFormikWithJoi({
      item: Joi.string().required().label("Item name"),
      item_quantity: Joi.number().required().label("Quantity"),
    }),
    onSubmit(values) {
      if (values.item === "Select Item") {
        toastifyError("No such item exists");
        return;
      }
      dispatch(addMenuItem(menu._id, values.item, values.item_quantity));
    },
  });

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item className="breadcrumb-non-active" href="/menus">
          Menus
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{menu ? menu.name : id}</Breadcrumb.Item>
      </Breadcrumb>
      <RatioUpdate
        menu={menu}
        menuPageState={ratioUpdated}
        menuPageStateHandler={setRatioUpdate}
      />
      <hr />
      <FormToggler
        desc="Add Item"
        state={toggleAddItemForm}
        stateHandler={setToggleAddItemForm}
      />
      {toggleAddItemForm && (
        <FormContainer>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form
            noValidate
            onSubmit={form.handleSubmit}
            className="border border-dark rounded p-4"
          >
            <Input
              as="select"
              label="Item"
              name="item"
              options={items?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
              selectInput
              error={form.touched.item && form.errors.item}
              {...form.getFieldProps("item")}
            />
            <Input
              type="number"
              label="Quantity"
              name="quantity"
              error={form.touched.item_quantity && form.errors.item_quantity}
              {...form.getFieldProps("item_quantity")}
            />
            <Button disabled={!form.isValid} type="submit" className="mt-4">
              Add Item
            </Button>
          </Form>
        </FormContainer>
      )}
      <hr />
      {menuItemsError ? (
        <Message>{menuItemsError}</Message>
      ) : menuItemsLoading ? (
        <Loader />
      ) : menuItems && menuItems.length ? (
        <>
          <h3 className="mt-5 mb-3">Menu Items</h3>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>QUANTITY</th>
                <th>PRICE PER PERSON</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((menuItem) => (
                <tr key={menuItem._id}>
                  <td>
                    {items &&
                      items.find((item) => item._id === menuItem.item_id)?.name}
                  </td>
                  <td>{menuItem.item_quantity}</td>
                  <td>₪ {menuItem.price_per_person.toFixed(2)}</td>
                  <td>PH</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h4 className="mt-5">No items added yet ...</h4>
      )}
      {menuItems && menuItems.length > 0 && (
        <h5 className="mt-5">
          <span className="me-1">Total price per person:</span> ₪
          {menuItems.reduce((acc, item) => acc + item.price_per_person, 0)}
        </h5>
      )}
    </>
  );
};

export default Menu;
