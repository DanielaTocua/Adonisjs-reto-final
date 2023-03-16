import { test } from '@japa/runner'

test('create Student', async ({ client }) => {
  const body = {
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1,
    "documentNumber": "123456789",
    "email": "danielc88@gmail.co",
    "password": "aaa",
    "phone": "32123122314"
}
  const response = await client.post('/api/v1/user/create').json(body)

  response.assertStatus(200)
  response.assertBody({ "state": true, "message":"Estudiante creado correctamente" })
})

test('create Student ERROR', async ({ client }) => {
  const error_body = {
    "firstName": 1,
    "typeDocument": 0,

}
  const error_response = await client.post('/api/v1/user/create').json(error_body)
  error_response.assertBody({ "state": false, "message":"Fallo en la creación del estudiante" })
})
