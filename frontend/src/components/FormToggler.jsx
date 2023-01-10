import { Button } from "react-bootstrap";

const FormToggler = ({ desc, state, stateHandler }) => {
  return (
    <>
      {state ? (
        <Button
          onClick={() => stateHandler(!state)}
          variant
          className="d-flex flex-column align-items-center mx-4 border-0 ms-4"
        >
          <i className="fa-solid fa-xmark fa-3x" aria-hidden="true"></i>
          <span className="mt-2">Exit form</span>
        </Button>
      ) : (
        <Button
          className="d-flex flex-column align-items-center mx-4 border-0 ms-2"
          onClick={() => stateHandler(!state)}
          variant
        >
          <i className="fa-solid fa-plus fa-3x" aria-hidden="true"></i>
          <span className="mt-2">{desc}</span>
        </Button>
      )}
    </>
  );
};

export default FormToggler;
