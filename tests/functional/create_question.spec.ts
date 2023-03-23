import { test } from '@japa/runner'

test('create question', async ({ client }) => {
  const body = {
    "question": "¿que dia es hoy?",
    "options": [
        {
            "opcion":"esta es correcta",
            "iscorrect":true
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        } ]
}

  const response = await client.post('/api/v1/questions/create').json(body)
  

  response.assertStatus(200)
  response.assertBody({
    "state":true,
    "message":"Pregunta creada exitosamente"
})
})

test('create question Error', async ({ client }) => {  
    const error_response = await client.post('/api/v1/questions/create').json({})
    
  
    error_response.assertBody({
      "state":false,
      "message":"Error al crear la pregunta"
  })
  })
