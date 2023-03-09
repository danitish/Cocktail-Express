import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormToggler from "../components/FormToggler";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { toastifySuccess } from "../utils/toastify";
import {
  getSingleEvent,
  updateEventProfit,
} from "../store/actions/eventActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Breadcrumb, Table, ListGroup, Form, Button } from "react-bootstrap";
import { getMyItems } from "../store/actions/itemActions";
import { GET_EVENT_RESET } from "../store/constants/eventConstants";
import Meta from "../components/Meta";
import {
  addExpense,
  getExpensesByEventId,
  deleteExpense,
} from "../store/actions/expenseActions";
import { popup } from "../utils/popups";
import {
  ADD_EXPENSE_RESET,
  DELETE_EXPENSE_RESET,
} from "../store/constants/expenseConstants";
import ReturnToProfile from "../components/ReturnToProfile";

const Event = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const profileRef = searchParams.get("ref");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [toggleExpenseForm, setToggleExpenseForm] = useState(false);

  const {
    loading: eventInfoLoading,
    event,
    error: eventInfoError,
  } = useSelector((state) => state.getSingleEvent);

  const {
    loading: expensesLoading,
    expenses,
    error: expensesError,
  } = useSelector((state) => state.getExpensesByEvent);

  const { items } = useSelector((state) => state.myItems);
  const {
    loading: addExpenseLoading,
    success: addExpenseSuccess,
    error: addExpenseError,
  } = useSelector((state) => state.addExpense);

  const { success: deleteExpenseSuccess } = useSelector(
    (state) => state.deleteExpense
  );

  const { success: updateProfitSuccess } = useSelector(
    (state) => state.updateEventProfit
  );

  const form = useFormik({
    validateOnMount: true,
    initialValues: { name: "", qty: "", price_per_unit: "" },
    validate: validateFormikWithJoi({
      name: Joi.string().required().label("Expense name"),
      qty: Joi.number().required().label("Quantity"),
      price_per_unit: Joi.number().required().label("Price Per Unit"),
    }),
    onSubmit(values) {
      dispatch(addExpense(id, values));
    },
  });

  useEffect(() => {
    const init = () => {
      dispatch(getSingleEvent(id));
      dispatch(getExpensesByEventId(id));
      dispatch(getMyItems());
    };
    init();

    if (addExpenseSuccess) {
      toastifySuccess("Expense added");
      form.values.name = "";
      form.values.price_per_unit = "";
      form.values.qty = "";
      dispatch(updateEventProfit(id));
      dispatch({ type: ADD_EXPENSE_RESET });
    }

    if (deleteExpenseSuccess) {
      dispatch(updateEventProfit(id));
      dispatch({ type: DELETE_EXPENSE_RESET });
    }

    return () => {
      if (event) {
        dispatch({ type: GET_EVENT_RESET });
      }
    };
  }, [
    dispatch,
    id,
    addExpenseSuccess,
    deleteExpenseSuccess,
    updateProfitSuccess,
  ]);

  let menuPPPTimesAttendance =
    event?.menu_details.menu_price_per_person * event?.attendance
      ? event?.menu_details.menu_price_per_person * event?.attendance
      : 0;

  let expensesTotalPrice =
    expenses && expenses.length
      ? expenses?.reduce((acc, exp) => acc + exp.total_price, 0)
      : 0;

  const deleteExpenseHandler = (expense_id) => {
    popup(
      "Delete an expense",
      "Are you sure you want to delete the expense?",
      () => {
        dispatch(deleteExpense(expense_id));
        toastifySuccess("Expense removed");
      },
      () => navigate(`/events/${id}`)
    );
  };

  return (
    <>
      <Meta title={`CE - ${event ? event.event_name : "Event"}`} />
      {profileRef && <ReturnToProfile />}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item className="breadcrumb-non-active" href="/events">
          Events
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {event ? event.event_name : id}
        </Breadcrumb.Item>
      </Breadcrumb>
      {eventInfoLoading && <Loader />}
      {eventInfoError && <Message>{eventInfoError}</Message>}
      {event && event.menu_id && (
        <>
          <h4 className="mt-5 mb-3">
            <span className="me-2">Menu Items:</span>
            <span className="h5">({event.menu_details.menu_name})</span>
          </h4>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE PER PERSON</th>
              </tr>
            </thead>
            <tbody>
              {event.menu_details.menu_items.map((item) => (
                <tr key={item._id}>
                  <td>
                    {items &&
                      items.find(
                        (singleItem) => singleItem._id === item.item_id
                      ).name}
                  </td>
                  <td>{"₪" + item.price_per_person}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <hr />
      <div className="expenses-section mt-4">
        <FormToggler
          desc="Add an expense"
          state={toggleExpenseForm}
          stateHandler={setToggleExpenseForm}
        />
        {toggleExpenseForm && (
          <FormContainer>
            {addExpenseLoading && <Loader />}
            {addExpenseError && <Message>{addExpenseError}</Message>}
            <Form
              className="border border-dark rounded p-4"
              noValidate
              onSubmit={form.handleSubmit}
            >
              <Input
                name="name"
                label="Name"
                error={form.touched.name && form.errors.name}
                {...form.getFieldProps("name")}
              />
              <Input
                name="qty"
                label="Qty"
                type="number"
                error={form.touched.qty && form.errors.qty}
                {...form.getFieldProps("qty")}
              />
              <Input
                name="price per unit"
                label="Price Per Unit"
                type="number"
                error={
                  form.touched.price_per_unit && form.errors.price_per_unit
                }
                {...form.getFieldProps("price_per_unit")}
              />
              <Button type="submit" className="mt-4">
                Add Expense
              </Button>
            </Form>
          </FormContainer>
        )}
        <div className="expenses-table mt-5">
          {expensesLoading && <Loader />}
          {expensesError && <Message>{expensesError}</Message>}
          {expenses && expenses.length !== 0 && (
            <>
              <h4 className="mb-3">My Expenses</h4>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>QTY</th>
                    <th>TOTAL</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense._id}>
                      <td>{expense.name}</td>
                      <td>{expense.qty.toLocaleString("en-US")}</td>
                      <td>
                        {"₪" + expense.total_price.toLocaleString("en-US")}
                      </td>
                      <td className="d-flex justify-content-center">
                        <Button
                          title="Delete Expense"
                          onClick={() => deleteExpenseHandler(expense._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="total-pricing mt-4">
        <h4>Calculations:</h4>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span className="fw-bold">Attendance: </span>
            {event?.attendance.toLocaleString("en-US")}
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="fw-bold">Income:</span>{" "}
            {"₪" + event?.estimated_income.toLocaleString("en-US")}
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="fw-bold">Total cost: </span>
            <span>
              ₪
              {(menuPPPTimesAttendance + expensesTotalPrice).toLocaleString(
                "en-US"
              )}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            {event?.profit > 0 ? (
              <>
                <span className="fw-bold text-success">Profit: </span>
                <span>₪{event?.profit.toLocaleString("en-US")}</span>
              </>
            ) : (
              <>
                <span className="fw-bold text-danger">Loss: </span>
                <span>
                  ₪{event?.profit.toLocaleString("en-US").split("-")[1]}
                </span>
              </>
            )}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default Event;
