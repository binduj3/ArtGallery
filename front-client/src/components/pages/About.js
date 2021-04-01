import React from "react";

const About = () => {
  return (
    <div className='container'>
      <div className='row m-5'>
        <div className='col-lg-4 col-md-4 col-sm-12'>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/Reshmika_profile.JPG`}
            alt='profilepic'
            className='img-fluid'
          />
        </div>
        <div className='col-lg-8 col-md-8 col-sm-12 desc'>
          <h3>Reshmika</h3>
          <p>
            Reshmika is a creative talented Grade3 student who loves to draw. A
            blessed artist whose drawing was posted in the Chickadee kids
            Magazine. She won 2nd prize in Christmas Drawing Competition from
            Minister of Health,Alberta
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
