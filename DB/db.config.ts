import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hms';
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };

const uri ='mongodb://localhost:27017/tushardb';
const connectDB = ()=>{
    return (
        mongoose.connect(uri)
        
    )
}

export default connectDB;
