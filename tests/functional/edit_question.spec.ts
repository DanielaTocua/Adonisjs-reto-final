import { test } from '@japa/runner'
import Question from 'App/Models/Question'


test('edit questions', async ({ client }) => {
  const id = (await Question.firstOrFail()).id
  const body ={
    "question": "¿Qué día es hoy?",
    "iscorrect": true
  }
  const response = await client.put(`/api/v1/questions/updateQuestion/${id}`).json(body)
  

  response.assertStatus(200)
  response.assertBody({
    "state":true,
    "message":"Pregunta editada con éxito" 
  })
})


test('edit questions Error', async ({ client }) => {
  const error_body ={
    "question": "¿Qué día es hoy?"
  }
  const error_response = await client.put("/api/v1/questions/updateQuestion/0").json(error_body)
  

  error_response.assertBody({
    "state":false,
    "message":"Error al editar la pregunta" 
  })
})
