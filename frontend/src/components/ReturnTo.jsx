import { Link } from "react-router-dom";
import "../style/returnto.css";

const ReturnTo = ({ section }) => {
  return (
    <div className="mb-3">
      <Link className="text-info return-to" to={`/${section}`}>
        <span>Return to {section}</span>
      </Link>
    </div>
  );
};

export default ReturnTo;
