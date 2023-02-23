import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEvent } from "../store/actions/eventActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Breadcrumb, Table, ListGroup } from "react-bootstrap";
import { getMenuItems } from "../store/actions/menuItemActions";
import { getMyItems } from "../store/actions/itemActions";
import { getMenuDetails, getMyMenus } from "../store/actions/menuActions";
import { GET_EVENT_RESET } from "../store/constants/eventConstants";
import Meta from "../components/Meta";

const Event = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    loading: eventInfoLoading,
    event,
    error: eventInfoError,
  } = useSelector((state) => state.getSingleEvent);

  const { menuItems } = useSelector((state) => state.menuItems);
  const { items } = useSelector((state) => state.myItems);
  const { menu: menuDetails } = useSelector((state) => state.menuDetails);

  useEffect(() => {
    const init = () => {
      if (!event) {
        dispatch(getSingleEvent(id));
      }
      dispatch(getMyItems());
      dispatch(getMyMenus());
    };
    init();
    if (event) {
      dispatch(getMenuDetails(event.menu_id));
      dispatch(getMenuItems(event.menu_id));
    }

    return () => {
      if (event) {
        dispatch({ type: GET_EVENT_RESET });
      }
    };
  }, [dispatch, id, event]);

  const menuPPPTimesAttendance =
    menuDetails?.price_per_person * event?.attendance
      ? menuDetails?.price_per_person * event?.attendance
      : 0;

  return (
    <>
      <Meta title={`CE - ${event ? event.event_name : "Event"}`} />
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
            <span className="h5">({menuDetails?.name})</span>
          </h4>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE PER PERSON</th>
              </tr>
            </thead>
            <tbody>
              {menuItems &&
                menuItems.map((item) => (
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
              {menuPPPTimesAttendance
                ? menuPPPTimesAttendance.toLocaleString("en-US")
                : 0}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            {event?.estimated_income - menuPPPTimesAttendance > 0 ? (
              <>
                <span className="fw-bold text-success">Profit: </span>
                <span>
                  ₪
                  {(
                    event?.estimated_income - menuPPPTimesAttendance
                  ).toLocaleString("en-US")}
                </span>
              </>
            ) : (
              <>
                <span className="fw-bold text-danger">Loss: </span>
                <span>
                  ₪
                  {
                    (event?.estimated_income - menuPPPTimesAttendance)
                      .toLocaleString("en-US")
                      .split("-")[1]
                  }
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
