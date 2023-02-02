import { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import FormToggler from "../components/FormToggler";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { toastifySuccess, toastifyError } from "../utils/toastify";
import { useEffect } from "react";
import { getMyMenus } from "../store/actions/menuActions";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, myEvents } from "../store/actions/eventActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";

const Events = () => {
  const [toggleEventForm, setToggleEventForm] = useState(false);

  const dispatch = useDispatch();

  const { menus } = useSelector((state) => state.myMenus);
  const { loading, success, error } = useSelector((state) => state.addEvent);
  const {
    loading: myEventsLoading,
    events,
    error: myEventsError,
  } = useSelector((state) => state.myEvents);

  useEffect(() => {
    const init = () => {
      dispatch(getMyMenus());
      dispatch(myEvents());
    };
    init();

    if (success) {
      toastifySuccess("Event added!");
      form.values.event_date = "";
      form.values.estimated_income = "";
      form.values.attendance = "";
      form.values.event_name = "";
      form.values.menu_id = "";
    }
  }, [dispatch, success]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      event_name: "",
      event_date: "",
      attendance: "",
      estimated_income: "",
      menu_id: "",
    },
    validate: validateFormikWithJoi({
      event_name: Joi.string().required().label("Event name"),
      event_date: Joi.date().required().label("Event date"),
      attendance: Joi.number().required().label("Attendance"),
      estimated_income: Joi.string().required().label("Estimated income"),
      menu_id: Joi.string().label("Menu").required(),
    }),
    onSubmit(values) {
      if (values.menu_id === "Choose one") {
        toastifyError("No such menu exists");
        return;
      }
      dispatch(addEvent(values));
    },
  });
  return (
    <>
      <FormToggler
        desc="Add an event"
        state={toggleEventForm}
        stateHandler={setToggleEventForm}
      />
      {toggleEventForm && (
        <FormContainer>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form
            className="border border-dark rounded p-4"
            noValidate
            onSubmit={form.handleSubmit}
          >
            <Input
              name="name"
              label="Name"
              error={form.touched.event_name && form.errors.event_name}
              {...form.getFieldProps("event_name")}
            />
            <Input
              type="datetime-local"
              name="date"
              label="Date"
              error={form.touched.event_date && form.errors.event_date}
              {...form.getFieldProps("event_date")}
            />
            <Input
              type="number"
              name="attendance"
              label="Attendance"
              error={form.touched.attendance && form.errors.attendance}
              {...form.getFieldProps("attendance")}
            />
            <Input
              selectInput
              as="select"
              name="menu"
              placeholder="Menu (optional)"
              label="Menu"
              options={menus?.map((menu) => (
                <option key={menu._id} value={menu._id}>
                  {menu.name}
                </option>
              ))}
              error={form.touched.menu_id && form.errors.menu_id}
              {...form.getFieldProps("menu_id")}
            />
            <Input
              name="income"
              label="Income"
              error={
                form.touched.estimated_income && form.errors.estimated_income
              }
              {...form.getFieldProps("estimated_income")}
            />
            <Button type="submit" className="mt-4" disabled={!form.isValid}>
              Add Event
            </Button>
          </Form>
        </FormContainer>
      )}
      <hr />

      <Row>
        {myEventsError && <Message>{myEventsError}</Message>}
        {myEventsLoading && <Loader />}
        {events && events.length ? (
          <>
            <h3 className="my-3">My Events</h3>
            {events.map((event) => (
              <EventCard
                key={event._id}
                name={event.event_name}
                attendance={event.attendance}
                date={event.event_date}
                income={event.estimated_income}
                menu_name={
                  menus
                    ? menus.find((menu) => menu._id === event.menu_id).name
                    : event.menu_id
                }
              />
            ))}
          </>
        ) : (
          <h5 className="mt-5">No events found ...</h5>
        )}
      </Row>
    </>
  );
};
export default Events;
