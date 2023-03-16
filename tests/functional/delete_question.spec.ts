import { test } from '@japa/runner'
import Question from 'App/Models/Question'


test('delete questions', async ({ client }) => {
  const id = (await Question.firstOrFail()).id
  const response = await client.delete(`/api/v1/questions/deleteQuestion/${id}`)
  

  response.assertStatus(200)
  response.assertBody({
    "state":true,
    "message":"Pregunta eliminada con éxito" 
  })
})

test('delete questions Error', async ({ client }) => {
  const error_response = await client.delete("/api/v1/questions/deleteQuestion/0")
  
  error_response.assertBody({
    "state":false,
    "message":"Error al eliminar la pregunta" 
  })
})
