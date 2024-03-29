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
import {
  updateMenuPricePerPerson,
  updateMenuRatio,
} from "../store/actions/menuActions";
import { useEffect } from "react";
import { toastifySuccess } from "../utils/toastify";

const RatioUpdate = ({ menu, menuPageStateHandler }) => {
  const [toggleRatioForm, setToggleRatioForm] = useState(false);

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.updateRatio);

  useEffect(() => {
    if (success) {
      toastifySuccess("Ratio updated");
      dispatch(updateMenuPricePerPerson(menu._id));
      menuPageStateHandler((prevState) => !prevState);
    }
  }, [dispatch, success]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      ratio: "",
    },
    validate: validateFormikWithJoi({
      ratio: Joi.number().required().label("Ratio"),
    }),
    onSubmit(values) {
      dispatch(updateMenuRatio(menu._id, values.ratio));
    },
  });
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center">
        <FormToggler
          desc="Edit ratio"
          state={toggleRatioForm}
          stateHandler={setToggleRatioForm}
          editIcon
        />
        <span>Ratio allows you to calculate the price per person value</span>
      </div>

      {toggleRatioForm && (
        <FormContainer>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form
            noValidate
            onSubmit={form.handleSubmit}
            className="border border-dark rounded p-4"
          >
            <Input
              type="number"
              label="Ratio"
              name="ratio"
              placeholder={`Current - ${menu?.ratio}`}
              error={form.touched.ratio && form.errors.ratio}
              {...form.getFieldProps("ratio")}
            />
            <Button disabled={!form.isValid} type="submit" className="mt-4">
              Change
            </Button>
          </Form>
        </FormContainer>
      )}
    </div>
  );
};

export default RatioUpdate;
