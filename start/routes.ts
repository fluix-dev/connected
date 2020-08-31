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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('login')

Route.get('/login', 'AuthController.login')
Route.get('/auth', 'AuthController.auth')

Route.get('/announcements', 'AnnouncementController.list').middleware('auth:user')
Route.get('/announcements/mine', 'AnnouncementController.mine').middleware('auth:user')
Route.get('/today', 'AnnouncementController.today').middleware('auth:user')
Route.get('/announcement/:id', 'AnnouncementController.view').middleware('auth:user')

Route.get('/create', 'AnnouncementController.createForm').middleware('auth:user')
Route.post('/create', 'AnnouncementController.create').middleware('auth:user')

Route.post('/approve/:id', 'AnnouncementController.approve').middleware('auth:staff')

// TODO: Logout
// TODO: Editing
