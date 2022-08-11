'use strict';


const bookModel=require('./modules/schema');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;


mongoose.connect('mongodb://localhost:27017/bookshelf');

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
app.post('/books',createNewBook);
app.delete('/books/:id',removeBook);
// /cat/id
app.put('/books/:id',updateBook);

function createNewBook(req,res){
  // console.log(req.body);
  const {newBook}= req.body;
  //console.log(newBook);

  const book=new bookModel.Book(newBook);
    book.save();
    res.status(201).send(book);

}
function removeBook(req,res){
  console.log(req.params.id);

  const id=req.params.id;

  bookModel.Book.findByIdAndDelete(id).then(record=>{
    res.send(record);
  }).catch(error=>{
    console.log(error);
    res.status(500).send(error.message);
  })
}

function updateBook(req,res){

  const id=req.params.id;
  const {data}=req.body;

  console.log(id,data);
  bookModel.Book.findByIdAndUpdate(id,data,{new:true}).then(record=>{
    res.send(record);
  }).catch(error=>{
    console.log(error);
    res.status(500).send(error.message);
  });

}
app.get('/test', (request, response) => {

  response.send('test request received')

});

app.get('*', (request, response) => {

  response.send('No requests(end point) !')

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
