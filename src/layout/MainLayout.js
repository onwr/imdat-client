import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import gif from "../img/kurumsal.gif";

const MainLayout = () => {
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setYukleniyor(false);
    }, 2000);
  }, []);

  if (yukleniyor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <img src={gif} />
      </div>
    );
  }

  return <Outlet />;
};
export default MainLayout;
