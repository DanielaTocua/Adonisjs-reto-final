import { test } from '@japa/runner'

test('get list of questions and  its options', async ({ client }) => {
  const response = await client.get(`/api/v1/form/getquestions`)
  

  response.assertStatus(200)
  response.assertBodyContains({
    "state":true,
    "questions":Array<{"question":string,"id":number,"options":Array<{"id":number,"option":string}>}>
})
})
