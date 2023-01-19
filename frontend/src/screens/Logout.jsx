import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/userActions";
import { toastifySuccess } from "../utils/toastify";
import { popup } from "../utils/popups";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    popup(
      "Confirm to logout",
      "Are you sure you want to logout?",
      () => {
        dispatch(logout());
        navigate("/login");
        toastifySuccess("Logged out successfully");
      },
      () => {
        navigate(-1);
      }
    );
  }, [navigate, dispatch]);

  return;
};

export default Logout;
