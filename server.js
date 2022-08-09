'use strict';


const bookModel=require('./modules/schema');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;


mongoose.connect('mongodb://localhost:27017/bookshelf');

// const bookSchema = new mongoose.Schema({
//   title: String,
//   decription:String,
//   status:String
// });

// const Book = mongoose.model('book', bookSchema);

function seedBooks(){

  const cleanCode= new Book({
    title: "Clean Code",
  decription:"Demonestrate how to build clean code !",
  status:"Old"
  });
  const happiness= new Book({
    title: "Happiness",
  decription:"The best way to live happy life!",
  status:"New"
  });
  const oldFather= new Book({
    title: "Old Father",
  decription:"Descripe the life of an old father",
  status:"Old"
  });

  // cleanCode.save();
  // happiness.save();
  // oldFather.save();

}

/*
// seedBooks();
*/

// http://localhost:3001/books
app.get('/books', (request, response) => {
  bookModel.Book.find({},(error,data)=>{
    if(error){
      response.status(500).send("error getting data");
    }
    else{
      response.status(200).send(data);
    }
  });
});
app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
