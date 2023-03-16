/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.group(()=>{
  Route.post("/login", "UsersController.login");

  Route.group(()=>{
    Route.post("/create", "UsersController.registerStudent");

    Route.post("/getUsers", "UsersController.listStudents");
    Route.get("/getUser/:id", "UsersController.getUser");

    Route.put("/update/:id", "UsersController.updateUser");


  }).prefix("user")

  Route.group(()=>{
    Route.post("/create", "QuestionsController.registerQuestion");

    Route.get("/getQuestions", "QuestionsController.listQuestions");
    Route.get("/getOptions/:id", "AnswersController.getOptions");


    Route.put("/updateQuestion/:id", "QuestionsController.updateQuestion");
    Route.put("/updateAnswer/:id", "AnswersController.updateAnswer");

    Route.delete("/deleteQuestion/:id", "QuestionsController.deleteQuestion");


  }).prefix("questions")
  
  Route.group(()=>{
    Route.get("/getquestions", "FormsController.listQuestionsAndAnswers");
    Route.post("/postquestions", "FormsController.registerForm");



  }).prefix("form")

}).prefix("/api/v1")