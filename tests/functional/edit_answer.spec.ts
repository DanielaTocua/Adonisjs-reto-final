import { test } from '@japa/runner'
import Answer from 'App/Models/Answer'

test('edit answers', async ({ client }) => {
  const id = (await Answer.firstOrFail()).id
  const body ={
    "opcion": "correcta",
    "iscorrect":true
}
  const response = await client.put(`/api/v1/questions/updateAnswer/${id}`).json(body)
  

  response.assertStatus(200)
  response.assertBody({
    "state":true,
    "message":"Opción editada con éxito" 
  })
})

test('edit answersError', async ({ client }) => {
  const body ={
    "opcion": "correcta",
    "iscorrect":true
}
  const response = await client.put(
    "/api/v1/questions/updateAnswer/0").json(body)

  response.assertBody({
    "state":false,
    "message":"Error al editar la opción" 
  })
})
