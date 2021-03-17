import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (message) => {
  const msg = {
    to: "binduja2020@gmail.com",
    from: "binduj3@gmail.com", // Use the email address or domain you verified above
    subject: "Sending with SendGrid is Fun",
    text: message,
    html: message,
  };

  //ES6
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendEmail;
