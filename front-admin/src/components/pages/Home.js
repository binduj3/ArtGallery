import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllContacts } from "../../actions/login";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
    // eslint-disable-next-line
  }, []);

  return <div>Home</div>;
};

export default Home;
