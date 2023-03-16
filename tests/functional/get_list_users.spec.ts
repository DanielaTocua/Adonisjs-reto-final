import { test } from '@japa/runner'
import User from 'App/Models/User'

test('list users', async ({ client }) => {
  const body =  {
    "perPage" : 10,
    "page":1,
    "filter":{
      "name":"a",
      "surname":"a"
    }

  }
  const response = await client.post('/api/v1/user/getUsers').json(body)

  response.assertBodyContains({ "state": true, "message":"Listado de estudiantes","users":Array<User>})
})
test('list users Error', async ({ client }) => {
  const error_response = await client.post('/api/v1/user/getUsers')

  error_response.assertBodyContains({ "state": false, "message":"Fallo en el listado de estudiantes"})
})

test('list users 2', async ({ client }) => {
  const body =  {
    "perPage" : 10,
    "page":1,
    "filter":{
      "name":"",
      "surname":""
    }

  }
  const response = await client.post('/api/v1/user/getUsers').json(body)

  response.assertBodyContains({ "state": true, "message":"Listado de estudiantes","users":Array<User>})
})
