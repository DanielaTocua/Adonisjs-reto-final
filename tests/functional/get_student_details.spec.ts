import { test } from '@japa/runner'
import User from 'App/Models/User'

test('get student details', async ({ client }) => {
  const id = (await User.firstOrFail()).id
  const response = await client.get(`/api/v1/user/getUser/${id}`)
  const user = await User.findOrFail(id)
  

  response.assertStatus(200)
  response.assertBody({
    firstName: user.first_name,
    secondName: user.second_name,
    surname:user.surname,
    secondSurName:user.second_sur_name,
    typeDocument:user.type_document,
    documentNumber:user.document_number,
    email:user.email,
    phone:user.phone
})
})

test('get student details Error', async ({ client }) => {
  const response = await client.get('/api/v1/user/getUser/0')
  

  response.assertBody({
    "state":false,
    "message":"Error al consultar el detalle del usuario"
})
})
