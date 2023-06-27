import { useState, useRef, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import FormToggler from "../components/FormToggler";
import FormContainer from "../components/FormContainer";
import Input from "../common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { toastifySuccess, toastifyError } from "../utils/toastify";
import { getMyMenus } from "../store/actions/menuActions";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, myEvents, deleteEvent } from "../store/actions/eventActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import EventCard from "../components/EventCard";
import { popup } from "../utils/popups";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { ADD_EVENT_RESET } from "../store/constants/eventConstants";
import httpService from "../services/httpService";
import { Loader as googleLoader } from "@googlemaps/js-api-loader";
import PlaceholderComp from "../components/PlaceholderComp";

const Events = () => {
  const [toggleEventForm, setToggleEventForm] = useState(false);
  const [mapsKey, setMapsKey] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const locationInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { menus } = useSelector((state) => state.myMenus);
  const { loading, success, error } = useSelector((state) => state.addEvent);
  const {
    loading: myEventsLoading,
    events,
    error: myEventsError,
  } = useSelector((state) => state.myEvents);
  const {
    loading: deleteEventLoading,
    success: deleteEventSuccess,
    error: deleteEventError,
  } = useSelector((state) => state.deleteEvent);

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
      dispatch(getMyMenus());
      dispatch(myEvents());
      if (!mapsKey) {
        const { data } = await httpService.get("/api/config/googlemaps");
        setMapsKey(data);
      }
    };
    init();
    if (!window.google && mapsKey && toggleEventForm) {
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

    if (success) {
      toastifySuccess("Event added!");
      form.values.event_date = "";
      form.values.event_address = "";
      form.values.estimated_income = "";
      form.values.attendance = "";
      form.values.event_name = "";
      form.values.menu_id = "";
      setLat("");
      setLng("");
      dispatch({ type: ADD_EVENT_RESET });
    }
  }, [dispatch, success, deleteEventSuccess, mapsKey, toggleEventForm]);

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
      event_name: Joi.string().required().label("Event name"),
      event_date: Joi.date().required().label("Event date"),
      event_address: Joi.string().required().label("Event location"),
      attendance: Joi.number().required().label("Attendance"),
      estimated_income: Joi.number().required().label("Estimated income"),
      menu_id: Joi.string().label("Menu").required(),
    }),
    onSubmit(values) {
      if (values.menu_id === "Choose one") {
        toastifyError("Must select a valid menu option");
        return;
      }
      if (values.menu_id === "No menu") {
        dispatch(addEvent({ ...values, lat, lng, menu_id: null }));
      } else {
        dispatch(addEvent({ ...values, lat, lng }));
      }
    },
  });

  const deleteEventHandler = (id) => {
    popup(
      "Delete an event",
      "Are you sure you want to delete the event?",
      () => {
        dispatch(deleteEvent(id));
      },
      () => navigate("/events")
    );
  };

  return (
    <>
      <Meta title="CE - My Events" />
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
              name="location"
              label="Location"
              error={form.touched.event_address && form.errors.event_address}
              {...form.getFieldProps("event_address")}
              ref={locationInputRef}
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
              eventMenuOptions
              as="select"
              name="menu"
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
              type="number"
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
        {deleteEventError && <Message>{deleteEventError}</Message>}
        {deleteEventLoading && <Loader />}
        {events && events.length ? (
          <>
            <h3 className="my-3">My Events</h3>
            {events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                name={event.event_name}
                attendance={event.attendance}
                date={event.event_date}
                location={event.event_location}
                income={event.estimated_income}
                menu_name={
                  menus
                    ? menus.find((menu) => menu._id === event.menu_id)?.name
                    : event.menu_id
                }
                deleteEventHandler={deleteEventHandler}
              />
            ))}
          </>
        ) : (
          <PlaceholderComp
            content="אירועים"
            stateHandler={setToggleEventForm}
          />
        )}
      </Row>
    </>
  );
};
export default Events;
