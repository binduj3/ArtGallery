import mongoose from "mongoose";
//bindutest9@gmail.com for mongodb
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(
    `Mongo Db connected : ${conn.connection.host}`.cyan.underline.bold
  );
};

export default connectDB;
