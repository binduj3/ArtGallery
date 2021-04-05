import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(`${encodeURI(process.env.MONGO_URI)}`, {
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
