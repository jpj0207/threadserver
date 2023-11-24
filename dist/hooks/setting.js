export default function setting(board) {
  const mongoose = require('mongoose');
  const express = require('express');
  const app = express();
  const cors = require('cors');
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({
    extended: true
  })); // for parsing application/x-www-form-urlencoded
  app.use(cors());

  //mongoose connect
  mongoose.connect('mongodb+srv://jpj0207:eGS2ICOi4XRvZvPB@threadbase.ixdkstv.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('DB연결 성공')).catch(e => console.error(e));
  //mongoose set
  const {
    Schema
  } = mongoose;
  const WritingSchema = new Schema({
    title: String,
    des: String,
    dates: {
      type: Date,
      default: Date.now
    }
  });
  // const Writing = mongoose.model('Writing', WritingSchema);
  //     default:Date.now 사용 시 햔재 시각이 자동으로 저장

  const Writing = mongoose.model(board, WritingSchema);
}