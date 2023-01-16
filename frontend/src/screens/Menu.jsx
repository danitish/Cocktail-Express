import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, Breadcrumb, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyItems } from "../store/actions/itemActions";
import { getMenuDetails } from "../store/actions/menuActions";
import RatioUpdate from "../components/RatioUpdate";
import Input from "../common/Input";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import FormToggler from "../components/FormToggler";

const Menu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [toggleAddItemForm, setToggleAddItemForm] = useState(false);

  useEffect(() => {
    dispatch(getMyItems());
    dispatch(getMenuDetails(id));
  }, [dispatch]);

  const { items } = useSelector((state) => state.myItems);
  const { menu } = useSelector((state) => state.menuDetails);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/menus">Menus</Breadcrumb.Item>
        <Breadcrumb.Item active>{menu ? menu.name : id}</Breadcrumb.Item>
      </Breadcrumb>
      <RatioUpdate menu={menu} />
      <hr />
      <FormToggler
        desc="Add Item"
        state={toggleAddItemForm}
        stateHandler={setToggleAddItemForm}
      />
      {toggleAddItemForm && (
        <FormContainer>
          <Form className="border border-dark rounded p-4">
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
            />
            <Input type="number" label="Quantity" name="quantity" />
            <Button type="submit" className="mt-4">
              Add Item
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default Menu;
