import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../common/Input";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import {
  getSingleEvent,
  editEvent,
  updateEventProfit,
} from "../store/actions/eventActions";
import { getMyMenus } from "../store/actions/menuActions";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import ReturnTo from "../components/ReturnTo";
import httpService from "../services/httpService";
import { Loader as googleLoader } from "@googlemaps/js-api-loader";
import { toastifyError, toastifySuccess } from "../utils/toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { EDIT_EVENT_RESET } from "../store/constants/eventConstants";
import { popup } from "../utils/popups";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mapsKey, setMapsKey] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const locationInputRef = useRef(null);

  const { event } = useSelector((state) => state.getSingleEvent);
  const { menus } = useSelector((state) => state.myMenus);
  const { loading, success, error } = useSelector((state) => state.editEvent);
  const { error: updateProfitError } = useSelector(
    (state) => state.updateEventProfit
  );

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      event_name: "",
      event_date: "",
      event_address: "",
      attendance: "",
      estimated_income: "",
      menu_id: "",
    },
    validate: validateFormikWithJoi({
      event_name: Joi.string().label("Event name").allow(""),
      event_date: Joi.date().label("Event date").allow(""),
      event_address: Joi.string().label("Event location").allow(""),
      attendance: Joi.number().label("Attendance").allow(""),
      estimated_income: Joi.number().label("Estimated income").allow(""),
      menu_id: Joi.string().label("Menu").allow(""),
    }),
    onSubmit(values) {
      if (Object.values(values).every((prop) => prop === "")) {
        toastifyError("No changes were made");
        return;
      }
      if (values.menu_id === "Choose one") {
        toastifyError("Must select a valid menu option");
        return;
      }
      popup(
        "Edit event",
        "Confirm event edit",
        () => {
          if (values.menu_id === "No menu") {
            dispatch(
              editEvent({ ...values, menu_id: null, lat, lng, event_id: id })
            );
          } else {
            dispatch(editEvent({ ...values, lat, lng, event_id: id }));
          }
        },
        () => navigate(`/events/${id}/edit`)
      );
    },
  });

  const extractAddress = (place) => {
    const address = {
      number: "",
      street: "",
      city: "",
    };
    if (!Array.isArray(place?.address_components)) {
      return address;
    }
    place.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      if (types.includes("locality")) {
        address.city = value;
      }
      if (types.includes("street_number")) {
        address.number = value;
      }
      if (types.includes("route")) {
        address.street = value;
      }
    });

    let full_address = "";
    if (address.street) {
      full_address += address.street;
    }
    if (address.number) {
      full_address = full_address + " " + address.number;
    }
    if (address.city) {
      if (!address.street && !address.number) {
        full_address = address.city;
      } else {
        full_address = full_address + ", " + address.city;
      }
    }
    return full_address;
  };

  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    const address = extractAddress(place);
    form.setFieldValue("event_address", address);
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
  };

  useEffect(() => {
    const init = async () => {
      dispatch(getSingleEvent(id));
      dispatch(getMyMenus());
      if (!mapsKey) {
        const { data } = await httpService.get("/api/config/googlemaps");
        setMapsKey(data);
      }
    };
    init();
    if (success) {
      toastifySuccess("Event updated successfully");
      dispatch(updateEventProfit(id));
      form.values.event_date = "";
      form.values.attendance = "";
      form.values.menu_id = "";
      form.values.estimated_income = "";
      form.values.event_name = "";
      form.values.event_address = "";
      dispatch({ type: EDIT_EVENT_RESET });
    }
    if (!window.google && mapsKey) {
      const googleApiLoader = new googleLoader({
        apiKey: mapsKey,
        version: "weekly",
        libraries: ["places"],
        language: "he",
      });
      const options = {
        componentRestrictions: { country: "il" },
      };
      googleApiLoader.load().then((google) => {
        const autocomplete = new google.maps.places.Autocomplete(
          locationInputRef.current,
          options
        );
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () =>
          onChangeAddress(autocomplete)
        );
      });
    }
  }, [dispatch, id, mapsKey, success]);

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
        {error && <Message>{error}</Message>}
        {updateProfitError && <Message>{updateProfitError}</Message>}
        {loading && <Loader />}
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
            name="location"
            label="Location"
            placeholder={
              event && event.event_location
                ? event.event_location.address
                : "Location"
            }
            ref={locationInputRef}
            error={form.touched.event_address && form.errors.event_address}
            {...form.getFieldProps("event_address")}
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
