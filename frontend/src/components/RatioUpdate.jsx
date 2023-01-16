import Input from "../common/Input";
import FormContainer from "./FormContainer";
import Message from "./Message";
import Loader from "./Loader";
import FormToggler from "./FormToggler";
import { useFormik } from "formik";
import Joi from "joi";
import validateFormikWithJoi from "../utils/validateFormikWithJoi";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateMenuRatio } from "../store/actions/menuActions";
import { useEffect } from "react";
import { toastifySuccess } from "../utils/toastify";

const RatioUpdate = ({ menu }) => {
  const [toggleRatioForm, setToggleRatioForm] = useState(false);
  const [customError, setCustomError] = useState("");

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.updateRatio);

  useEffect(() => {
    if (success) {
      toastifySuccess("Ratio updated, refresh to see new value");
    }
  }, [dispatch, success]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      ratio: "",
    },
    validate: validateFormikWithJoi({
      ratio: Joi.string().required().label("Ratio"),
    }),
    onSubmit(values) {
      if (isNaN(Number(values.ratio))) {
        setCustomError("Invalid input, numbers only");
        return;
      }
      dispatch(updateMenuRatio(menu._id, values.ratio));
      setCustomError("");
    },
  });
  return (
    <div className="mb-4">
      <FormToggler
        desc="Edit ratio"
        state={toggleRatioForm}
        stateHandler={setToggleRatioForm}
        editIcon
      />
      {toggleRatioForm && (
        <FormContainer>
          {customError && <Message>{customError}</Message>}
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form
            noValidate
            onSubmit={form.handleSubmit}
            className="border border-dark rounded p-4"
          >
            <Input
              label="Ratio"
              name="ratio"
              placeholder={`Current - ${menu.ratio}`}
              error={form.touched.ratio && form.errors.ratio}
              {...form.getFieldProps("ratio")}
            />
            <Button type="submit" className="mt-4">
              Change
            </Button>
          </Form>
        </FormContainer>
      )}
    </div>
  );
};

export default RatioUpdate;
