const Loader = () => {
  return (
    <div style={{ width: 100, height: 100, margin: "auto", display: "block" }}>
      <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
