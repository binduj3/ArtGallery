import React from "react";
import { useParams } from "react-router";

const Gallery = (props) => {
  const { year } = useParams();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-12 '>
          <div className='my-5'>
            <h1> {year} Gallery </h1>
          </div>
          <div
            id='carouselExampleCaptions'
            className='carousel slide'
            data-ride='carousel'
          >
            <ol className='carousel-indicators'>
              {props.location.state.document &&
                props.location.state.document.length > 0 &&
                props.location.state.document.map((doc, index) => {
                  return (
                    <li
                      key={index}
                      data-target='#carouselExampleCaptions'
                      data-slide-to={index}
                      className={`${index === 0 && "active"}`}
                    ></li>
                  );
                })}
            </ol>

            <div className='carousel-inner'>
              {props.location.state.document &&
                props.location.state.document.length > 0 &&
                props.location.state.document.map((doc, index) => {
                  return (
                    <div
                      className={`carousel-item  ${index === 0 && "active"}`}
                      key={index}
                    >
                      <img
                        src={doc.storageUrl}
                        className='d-block w-100'
                        alt='Pictures'
                      />
                      <div className='carousel-caption d-none d-md-block'>
                        <p>{doc.description}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <a
              className='carousel-control-prev'
              href='#carouselExampleCaptions'
              role='button'
              data-slide='prev'
            >
              <span
                className='carousel-control-prev-icon'
                aria-hidden='true'
              ></span>
              <span className='sr-only'>Previous</span>
            </a>
            <a
              className='carousel-control-next'
              href='#carouselExampleCaptions'
              role='button'
              data-slide='next'
            >
              <span
                className='carousel-control-next-icon'
                aria-hidden='true'
              ></span>
              <span className='sr-only'>Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
