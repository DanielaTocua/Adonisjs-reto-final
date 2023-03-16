import { test } from '@japa/runner'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

test('login', async ({ client }) => {
  const body = {
    "email": "danielc88@gmail.co",
    "password":"aaa"
}
  const response = await client.post('/api/v1/login').json(body)
  const user = await User.findByOrFail('email',body.email)
  const token = response.header('authorization') as string
  UsersController.verifyToken(token)

  response.assertStatus(200)
  response.assertBodyContains({ "state": true, "id": user.id , "name": UsersController.getFullName(user), "role": await UsersController.getRole(user),"message":"Ingreso exitoso"})
 
})

test('login Error user', async ({ client }) => {
  const error_body = {
    "email": "danielc88@gmai.co",
    "password":"aaa"
}
  const error_response = await client.post('/api/v1/login').json(error_body)

  error_response.assertBodyContains({ "state": false,"message":"contraseña o email inválido"})
})

test('login Error password', async ({ client }) => {
  const error_body = {
    "email": "danielc88@gmail.co",
    "password":""
  }
  const error_response = await client.post('/api/v1/login').json(error_body)

  error_response.assertBodyContains({ "state": false,"message":"contraseña o email inválido"})
})


