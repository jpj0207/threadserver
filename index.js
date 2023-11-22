const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

//mongoose connect
mongoose
  .connect('mongodb+srv://jpj0207:eGS2ICOi4XRvZvPB@threadbase.ixdkstv.mongodb.net/?retryWrites=true&w=majority')
  .then(()=>console.log('DB연결 성공'))
  .catch(e => console.error(e));
//mongoose set
const { Schema } = mongoose;

const WritingSchema = new Schema({
  title : String,
  des : String,
  dates: {
    type:Date,
    default:Date.now,
  }
})

// const Writing = mongoose.model('Writing', WritingSchema);
//     default:Date.now 사용 시 햔재 시각이 자동으로 저장



app.post('/:board/write', async function (req, res) {
  const board = req.params.board

  //req안에 있는 내용(body정리)
  const title = req.body.title;
  const des = req.body.des;


  const Writing = mongoose.model(`${board}`, WritingSchema);

  //mongodb에 저장
  const writing = new Writing({
    title: title,
    des: des
  })
  const result = await writing.save().then(()=>{
    console.log('Success')
    res.redirect(`http://localhost:3000/${board}/`);
  }).catch((err)=>{
    console.error(err)
    res.redirect(`http://localhost:3000/${board}/`);
  })
});

app.get('/:board',async(req,res)=>{
	const board = req.params.board
  const Writing = mongoose.model(`${board}`, WritingSchema);
  let writings = await Writing.find({})
  res.json(writings)
	})

app.put('/profile', function (req, res) {
  console.log(req.body)
  res.json(req.body)
});

app.delete('/profile', function (req, res) {
  console.log(req.body)
  res.json(req.body)
});



// app.listen(4000,()=>{
//     console.log('server start')
// });