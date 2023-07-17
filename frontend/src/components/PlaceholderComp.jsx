import "../style/placeholderComp.css";

const PlaceholderComp = ({ content, stateHandler }) => {
  return (
    <div className="placeholder-container mt-3">
      <span
        className="placeholder-icon"
        onClick={() => stateHandler((prev) => !prev)}
      >
        ⚙️
      </span>
      <p className="placeholder-text">{`No ${content} were found`}</p>
    </div>
  );
};

export default PlaceholderComp;
