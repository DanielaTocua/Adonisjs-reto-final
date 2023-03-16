import { test } from '@japa/runner'
import Question from 'App/Models/Question'

test('get options from a question', async ({ client }) => {
  const questionId = (await Question.firstOrFail()).id
  const response = await client.get(`/api/v1/questions/getOptions/${questionId}`)
  

  response.assertStatus(200)
  response.assertBodyContains({
    "state":true,
    "message":"Listado de opciones",
    "options":Array<{"id":number,"option":string}>
})
})
test('get options from a question Error', 
async ({ client }) => {
  const response = await client.get("/api/v1/questions/getOptions/0")
  
  response.assertBody({
    "state":false,
    "message":"Error al obtener el listado de opciones",
})
})
