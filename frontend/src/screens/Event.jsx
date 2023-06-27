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
  updateEventMenuItemQty,
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
import ReturnTo from "../components/ReturnTo";
import {
  addNote,
  getMyNotesByEventId,
  deleteNote,
} from "../store/actions/noteAction";
import { ADD_NOTE_RESET } from "../store/constants/noteConstants";

const Event = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const profileRef = searchParams.get("ref");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [toggleExpenseForm, setToggleExpenseForm] = useState(false);
  const [toggleNoteForm, setToggleNoteForm] = useState(false);
  const [toggleMenuItemQtyForm, setToggleMenuItemQtyForm] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");

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
  const {
    loading: addNoteLoading,
    error: addNoteError,
    success: addNoteSuccess,
  } = useSelector((state) => state.addNote);

  const {
    loading: myNotesLoading,
    error: myNotesError,
    notes,
  } = useSelector((state) => state.getNotesByEvent);

  const { error: deleteNoteError, success: deleteNoteSuccess } = useSelector(
    (state) => state.deleteNote
  );

  const {
    loading: updateItemQtyLoading,
    success: updateItemQtySuccess,
    error: updateItemQtyError,
  } = useSelector((state) => state.updateEventMenuItemQty);

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

  const noteForm = useFormik({
    validateOnMount: true,
    initialValues: {
      text: "",
    },
    validate: validateFormikWithJoi({
      text: Joi.string().required().label("Text"),
    }),
    onSubmit(values) {
      dispatch(addNote({ ...values, event_id: id }));
    },
  });

  const menuItemQtyForm = useFormik({
    validateOnMount: true,
    initialValues: {
      qty: "",
    },
    validate: validateFormikWithJoi({
      qty: Joi.number().required().label("Quantity"),
    }),
    onSubmit(values) {
      dispatch(updateEventMenuItemQty(id, selectedMenuItemId, values.qty));
    },
  });

  useEffect(() => {
    const init = () => {
      dispatch(getSingleEvent(id));
      dispatch(getExpensesByEventId(id));
      dispatch(getMyItems());
      dispatch(getMyNotesByEventId(id));
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

    if (addNoteSuccess) {
      toastifySuccess("Note added");
      noteForm.values.text = "";
      dispatch({ type: ADD_NOTE_RESET });
    }

    if (deleteExpenseSuccess) {
      dispatch(updateEventProfit(id));
      dispatch({ type: DELETE_EXPENSE_RESET });
    }
    if (updateItemQtySuccess) {
      toastifySuccess("Qty updated");
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
    addNoteSuccess,
    deleteNoteSuccess,
    updateItemQtySuccess,
  ]);

  let menuPPPTimesAttendance =
    event?.menu_details.menu_price_per_person * event?.attendance
      ? event?.menu_details.menu_price_per_person * event?.attendance
      : 0;

  let expensesTotalPrice =
    expenses && expenses.length
      ? expenses?.reduce((acc, exp) => acc + exp.total_price, 0)
      : 0;

  const deleteSubjectPopupRequest = (subject_id, cb, subject = "") => {
    popup(
      `Delete ${subject}`,
      `Are you sure you want to delete the ${subject}?`,
      () => {
        dispatch(cb(subject_id));
        toastifySuccess(
          `${
            subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()
          } removed`
        );
      },
      () => navigate(`/events/${id}`)
    );
  };

  return (
    <>
      <Meta title={`CE - ${event ? event.event_name : "Event"}`} />
      {profileRef && <ReturnTo section="profile" />}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item className="breadcrumb-non-active" href="/events">
          Events
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {event ? event.event_name : id}
        </Breadcrumb.Item>
      </Breadcrumb>
      {toggleMenuItemQtyForm && (
        <>
          <Button
            onClick={() => {
              setToggleMenuItemQtyForm(false);
              setSelectedMenuItemId("");
            }}
            variant
            className="d-flex flex-column align-items-center mx-4 border-0"
            style={{ width: 140 }}
          >
            <i className="fa-solid fa-xmark fa-3x" aria-hidden="true"></i>
            <span className="mt-2">Exit form</span>
          </Button>
          <FormContainer>
            {updateItemQtyLoading && <Loader />}
            {updateItemQtyError && <Message>{updateItemQtyError}</Message>}
            <Form
              className="border border-dark rounded p-4"
              noValidate
              onSubmit={menuItemQtyForm.handleSubmit}
            >
              <Input
                name="qty"
                type="number"
                label="Qty"
                error={
                  menuItemQtyForm.touched.qty && menuItemQtyForm.errors.qty
                }
                {...menuItemQtyForm.getFieldProps("qty")}
              />
              <Button
                type="submit"
                className="mt-4"
                disabled={!menuItemQtyForm.isValid}
              >
                Update
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
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
                <th>QTY</th>
                <th>TOTAL PRICE</th>
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
                  <td
                    onClick={() => {
                      setSelectedMenuItemId(item._id);
                      setToggleMenuItemQtyForm(true);
                    }}
                    className="d-flex"
                  >
                    {item.qty ? (
                      item.qty
                    ) : (
                      <Button className="btn-sm">Add</Button>
                    )}
                  </td>
                  <td>
                    ₪
                    {(item.price_per_person * event.attendance).toLocaleString(
                      "en-US"
                    )}
                  </td>
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
        <div className="expenses-table">
          {expensesLoading && <Loader />}
          {expensesError && <Message>{expensesError}</Message>}
          {expenses && expenses.length !== 0 && (
            <>
              <h4 className="mb-3 mt-5">My Expenses</h4>
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
                          onClick={() =>
                            deleteSubjectPopupRequest(
                              expense._id,
                              deleteExpense,
                              "expense"
                            )
                          }
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
      <div className="notes-section mt-4 ">
        <FormToggler
          desc="Add a note"
          state={toggleNoteForm}
          stateHandler={setToggleNoteForm}
        />
        {toggleNoteForm && (
          <FormContainer>
            {addNoteError && <Message>{addNoteError}</Message>}
            {addNoteLoading && <Loader />}
            <Form
              noValidate
              className="border border-dark rounded p-4"
              onSubmit={noteForm.handleSubmit}
            >
              <Input
                name="text"
                label="Text"
                error={noteForm.touched.text && noteForm.errors.text}
                {...noteForm.getFieldProps("text")}
              />
              <Button
                type="submit"
                className="mt-4"
                disabled={!noteForm.isValid}
              >
                Add Note
              </Button>
            </Form>
          </FormContainer>
        )}
        <div className="notes">
          {myNotesLoading && <Loader />}
          {myNotesError && <Message className="mt-2">{myNotesError}</Message>}
          {deleteNoteError && <Message>{deleteNoteError}</Message>}
          {notes && notes.length !== 0 && (
            <>
              <h4 className="mb-3 mt-5">
                My Notes{" "}
                <span className="text-muted" style={{ fontSize: "smaller" }}>
                  (click on note to remove)
                </span>
              </h4>
              <ListGroup className="mb-4" as="ol" numbered>
                {notes.map((note) => (
                  <ListGroup.Item
                    onClick={() => {
                      deleteSubjectPopupRequest(note._id, deleteNote, "note");
                    }}
                    key={note._id}
                    as="li"
                  >
                    {note.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="total-pricing mt-4">
        <h4 className="mt-1 mb-3">Calculations</h4>
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
