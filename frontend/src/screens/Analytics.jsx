import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myEvents } from "../store/actions/eventActions";
import Input from "../common/Input";
import {
  getEventYears,
  getDataFromYearlyEvents,
} from "../utils/analyticsAlgos";
import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const dispatch = useDispatch();
  const { error, loading, events } = useSelector((state) => state.myEvents);

  const [eventYears, setEventYears] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const init = () => {
      if (!events) {
        dispatch(myEvents());
      }
    };
    init();
    if (events && !eventYears) {
      setEventYears(getEventYears(events));
    }
  }, [dispatch, events, eventYears, data]);

  return (
    <>
      <h3 className="my-3">Analytics Page</h3>
      <h5 className="mb-3">View your yearly profits by each month</h5>
      <div className="my-3">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Row className="my-4">
              <Col sm={6} md={4} lg={3}>
                <Input
                  selectInput
                  yearSelect
                  as="select"
                  name="select year"
                  label="Select Year"
                  options={eventYears?.map((years) => (
                    <option key={years}>{years}</option>
                  ))}
                  onChange={(e) => {
                    setData(
                      getDataFromYearlyEvents(events, Number(e.target.value))
                    );
                  }}
                />
              </Col>
            </Row>
            {data && (
              <ResponsiveContainer width="80%" height={400}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 200000]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend verticalAlign="top" iconType="rect" />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            {data.reduce((acc, cur) => acc + cur.profit, 0) >= 0 ? (
              <div className="mt-3">
                Total Yearly Profit:
                <span className="ms-1 fw-bold">
                  ₪
                  {data
                    .reduce((acc, cur) => acc + cur.profit, 0)
                    .toLocaleString("en-US")}
                </span>
              </div>
            ) : (
              <div className="mt-3">
                Total Yearly Deficit:
                <span className="ms-1 fw-bold">
                  ₪
                  {data
                    .reduce((acc, cur) => acc + cur.profit, 0)
                    .toLocaleString("en-US")}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Analytics;
