const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://jpj0207:eGS2ICOi4XRvZvPB@threadbase.ixdkstv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB연결 성공'))
  .catch(e => console.error(e));

const WritingSchema = new Schema({
  title: String,
  des: String,
  dates: {
    type: Date,
    default: Date.now,
  }
});

exports.handler = async function (event, context) {
  try {
    const board = event.path.replace(/^\/|\/$/g, ''); // Remove leading and trailing slashes

    const Writing = mongoose.model(`${board}`, WritingSchema);
    const writings = await Writing.find({});
    
    return {
      statusCode: 200,
      body: JSON.stringify(writings),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};