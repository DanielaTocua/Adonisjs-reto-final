import { test } from '@japa/runner'


test('get questions', async ({ client }) => {
  const response = await client.get('/api/v1/questions/getQuestions')
  

  response.assertStatus(200)
  response.assertBodyContains({
    "state":true,
    "questions": Array<{"question":string, "id": number}> 
  })
})

