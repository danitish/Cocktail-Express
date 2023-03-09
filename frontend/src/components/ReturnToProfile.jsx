import { Link } from "react-router-dom";
import "../style/returntoprofile.css";

const ReturnToProfile = () => {
  return (
    <div className="mb-3">
      <Link className="text-info return-to-profile" to="/profile">
        <span>Return to profile</span>
      </Link>
    </div>
  );
};

export default ReturnToProfile;
