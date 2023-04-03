import "../style/notFound404.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="mt-3">Page Not Found</h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link className="more-link" to="/">
          Go to homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;
