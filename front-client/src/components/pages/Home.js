import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getDocuments } from "../../actions/home";

const Home = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.home.documents);

  useEffect(() => {
    dispatch(getDocuments());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header className='jumbotron bg-color-orange text-white'>
        <div className='container mt-3'>
          <div className='description '>
            <h1 className='h1'>Reshmika's Art work</h1>
            <h5>Welcome to Reshmika's Amazing Art Work Gallery</h5>
          </div>
        </div>
      </header>
      <div className='my-5'>
        <div className='container'>
          <div className='row row-cols-3'>
            {documents &&
              documents.data &&
              documents.data.length > 0 &&
              documents.data.map((document, index) => {
                return (
                  document.documents &&
                  document.documents.length > 0 && (
                    <div className='col' key={index}>
                      <div className='card'>
                        <img
                          src={document.documents[0].storageUrl}
                          className='card-img-top'
                          alt='pictures'
                        />
                        <div className='card-body'>
                          <Link
                            to={{
                              pathname: `/gallery/${document.year}`,
                              state: { document: document.documents },
                            }}
                          >
                            <h2 className='card-title'>{document.year}</h2>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
