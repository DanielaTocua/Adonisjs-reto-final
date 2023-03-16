import { test } from '@japa/runner'

test('update Student', async ({ client }) => {
  const body = {
    "firstName": "danilo",
    "secondName": "pancracio",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 2,
    "documentNumber": "987654321",
    "email": "danielc88@gmail.co",
    "phone": "32123122314"
}
  const response = await client.put('/api/v1/user/update/1').json(body)

  response.assertStatus(200)
  response.assertBody({ "state": true, "message":"Se actualizó correctamente" })
})

test('update Student Error', async ({ client }) => {

  const response = await client.put('/api/v1/user/update/0')
  response.assertBody({ "state": false, "message":"Error al actualizar" })
})
