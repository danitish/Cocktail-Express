import { useFormik } from "formik";
import Joi from "joi";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Input from "../common/Input";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { getSingleEvent } from "../store/actions/eventActions";
import { getMyMenus } from "../store/actions/menuActions";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import ReturnTo from "../components/ReturnTo";

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { event } = useSelector((state) => state.getSingleEvent);
  const { menus } = useSelector((state) => state.myMenus);

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
      event_name: Joi.string().label("Event name").allow(""),
      event_date: Joi.date().label("Event date").allow(""),
      attendance: Joi.number().label("Attendance").allow(""),
      estimated_income: Joi.number().label("Estimated income").allow(""),
      menu_id: Joi.string().label("Menu").allow(""),
    }),
    onSubmit(values) {
      console.log(values);
    },
  });

  useEffect(() => {
    const init = () => {
      dispatch(getSingleEvent(id));
      dispatch(getMyMenus());
    };
    init();
  }, [dispatch, id]);

  return (
    <>
      <Meta title="CE - Edit Event" />
      <ReturnTo section="events" />
      <h4 className="mt-3 mb-2">
        Edit Event:{" "}
        <span className="text-muted" style={{ fontSize: "smaller" }}>
          (empty inputs will retain their current values)
        </span>
      </h4>
      <FormContainer>
        <Form noValidate onSubmit={form.handleSubmit}>
          <Input
            name="name"
            label="Name"
            placeholder={event ? event.event_name : "Name"}
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
            placeholder={
              event ? event.attendance.toLocaleString("en-US") : "Attendance"
            }
            error={form.touched.attendance && form.errors.attendance}
            {...form.getFieldProps("attendance")}
          />
          <Input
            name="menu"
            label="Menu"
            selectInput
            eventMenuOptions
            options={menus?.map((menu) => (
              <option key={menu._id} value={menu._id}>
                {menu.name}
              </option>
            ))}
            error={form.touched.menu_id && form.errors.menu_id}
            {...form.getFieldProps("menu_id")}
          />
          <Input
            type="number"
            name="income"
            label="Income"
            placeholder={
              event ? event.estimated_income.toLocaleString("en-US") : "Income"
            }
            error={
              form.touched.estimated_income && form.errors.estimated_income
            }
            {...form.getFieldProps("estimated_income")}
          />
          <Button type="submit" className="mt-4" disabled={!form.isValid}>
            Edit Event
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditEvent;
