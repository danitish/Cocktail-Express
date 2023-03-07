import { useEffect } from "react";
import "../style/profile.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../store/actions/userActions";
import { myEvents } from "../store/actions/eventActions";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.userProfile);
  const { events, error: myEventsError } = useSelector(
    (state) => state.myEvents
  );

  useEffect(() => {
    const init = () => {
      dispatch(getUserProfile());
      dispatch(myEvents());
    };
    init();
  }, [dispatch]);

  console.log(user);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col lg={4}>
            <h3 className="mt-2">User Profile:</h3>
            <Card className="mt-4 py-3 px-2 w-100">
              <div className="d-flex flex-column align-items-center">
                <h4>{user?.full_name}</h4>
                <h6 className="text-muted">Cocktail Express</h6>
              </div>
              <ListGroup className="mt-2" variant="flush">
                <ListGroup.Item>
                  {myEventsError ? (
                    <span className="text-muted">Latest Event</span>
                  ) : (
                    events && (
                      <Link
                        className="link-style"
                        to={`/events/${
                          events[events.length - 1]._id
                        }?ref=profile`}
                      >
                        <span>Go to latest event</span>
                      </Link>
                    )
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="link-style" to="/menus?ref=profile">
                    <span>My Menus</span>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link className="link-style" to="/items?ref=profile">
                    <span>My Items</span>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col lg={8}></Col>
        </Row>
      )}
    </>
  );
};

export default Profile;
