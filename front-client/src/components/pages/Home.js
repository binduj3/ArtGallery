import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllContacts } from "../../actions/home";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header className='jumbotron bg-color-orange text-white'>
        <div className='container'>
          <div className='description '>
            <h1>
              Reshmika's Art work
              <p>Welcome to Reshmika's Amazing Art Work Gallery</p>
              <p>
                <a
                  className='btn btn-default btn-lg text-white'
                  href='/Home/Gallery'
                >
                  See more&raquo;
                </a>
              </p>
            </h1>
          </div>{" "}
        </div>
      </header>
    </div>
  );
};

export default Home;
