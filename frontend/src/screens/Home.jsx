import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  let [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    setHour(new Date().getHours());
  }, [userInfo]);

  return (
    <div>
      <h4 className="my-3 fade-in-image">
        Good{" "}
        {hour >= 6 && hour < 12
          ? "Morning, "
          : hour >= 12 && hour < 18
          ? "Afternoon, "
          : hour >= 18 && hour < 22
          ? "Evening, "
          : hour >= 22
          ? "Night, "
          : ""}
        <span>{userInfo?.full_name.split(" ")[0]}.</span>
      </h4>
      <hr />
    </div>
  );
};

export default Home;
