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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/getUser/:id_user', 'UsersController.getUsersById').middleware('VerifyAdmin')
  Route.post('/create', 'UsersController.Register').middleware('VerifyAdmin')
  Route.post('/getUsers', 'UsersController.getUsers').middleware('VerifyAdmin')
  Route.put('/update/:id_user', 'UsersController.editUser').middleware('VerifyAdmin')
}).prefix('api/v1/user').middleware('AuthJwt')

Route.group(() => {
  Route.post('/create', 'TypeDocumentsController.CretaTypeDocument').middleware('VerifyAdmin')
}).prefix('api/v1/typeDocument').middleware('AuthJwt')

Route.group(() => {
  Route.post('/create', 'RolesController.CreateRole').middleware('VerifyAdmin')
  Route.get('/getRoles', 'RolesController.getRoles').middleware('VerifyAdmin')
}).prefix('api/v1/role').middleware('AuthJwt')

Route.group(() => {
  Route.post('/login', 'UsersController.login')
}).prefix('api/v1')

Route.group(() => {
  Route.post('/create', 'QuestionsController.CreateQuestion').middleware('VerifyAdmin')
  Route.get('/getQuestions', 'QuestionsController.getQuestions').middleware('VerifyAdmin')
  Route.get('/getOptions/:id_question', 'QuestionsController.listOptions')
  Route.delete('/deleteQuestion/:id', 'QuestionsController.deleteQuestion').middleware('VerifyAdmin')
  Route.put('/updateAnswer/:id_opcion', 'AnswersController.updateAnswer').middleware('VerifyAdmin')
  Route.put('/updateQuestion/:id_question', 'QuestionsController.updateQuestion').middleware('VerifyAdmin')
}).prefix('api/v1/questions').middleware('AuthJwt')

Route.group(() => {
  Route.get('/getquestions', 'FormsController.getQuestionOptions')
  Route.post('/postquestions', 'FormsController.postForm')
}).prefix('api/v1/form').middleware('AuthJwt')
