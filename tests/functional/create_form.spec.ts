import { test } from '@japa/runner'
import Answer from 'App/Models/Answer'
import User from 'App/Models/User'

test('create Forms', async ({ client }) => {
  const answers = (await Answer.query().select('id').limit(2))
  const answerIds: number[] = []
  for (let answer of answers){
    answerIds.push(answer.id)
  }
  const studentId = (await User.firstOrFail()).id

  const body = {
    "estudianteId": studentId,
    "answers": answerIds
  }
  const response = await client.post('/api/v1/form/postquestions').json(body)

  response.assertStatus(200)
  response.assertBody({ "state": true, "message":"Respuestas almacenadas con éxito" })
})

test('create Forms', async ({ client }) => {

  const body = {
    "estudianteId": 0,
    "answers": 0
  }
  const response = await client.post('/api/v1/form/postquestions').json(body)

  response.assertBody({ "state": false, "message":"No se pudieron almacenar las respuestas" })
})
