const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017"

const connectToMongo = async(url)=>{
  await mongoose.connect(mongoURI);
}
connectToMongo(mongoURI).then((value)=>{
    console.log("done")
}).catch(err => console.log(err));

module.exports = connectToMongo;
