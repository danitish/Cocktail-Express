import { useParams } from "react-router-dom";

const Event = () => {
  const { id } = useParams();
  return <p>{`event id: ${id}`}</p>;
};

export default Event;
