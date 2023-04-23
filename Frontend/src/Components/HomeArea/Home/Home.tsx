import { NavLink } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import QuiltedImageList from "./ImageList";

function Home(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="Home">
      <h1>Lord Of The Rings Vacations</h1>
      <h5>
        "All we have to decide is what to do with the time that is given to us."
      </h5>
      {!user && (
        <>
          <NavLink to="/login">
            <button className="big-button">Let's Start</button>
          </NavLink>
        </>
      )}
      {user && (
        <>
          <NavLink to="/vacations">
            <button className="big-button">See Vacations!</button>
          </NavLink>
        </>
      )}
      <div>
        <QuiltedImageList />
      </div>
    </div>
  );
}

export default Home;
