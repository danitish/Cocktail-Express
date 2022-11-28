import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/userActions";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutMsg = window.confirm("Do you wish to logout?");
    if (logoutMsg) {
      dispatch(logout());
      navigate("/login");
    }
  }, [navigate, dispatch]);

  return;
};

export default Logout;
