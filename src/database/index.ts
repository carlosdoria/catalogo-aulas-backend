import mongoose from 'mongoose';

const uri = process.env.MONGODB_CONNECTION || ''

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(`Error ${err}`));
