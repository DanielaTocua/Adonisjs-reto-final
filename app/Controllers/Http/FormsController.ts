import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database"
import Answer from 'App/Models/Answer';
import Form from "App/Models/Form"
import Question from "App/Models/Question"
import User from 'App/Models/User';




export default class FormsController {
    public async registerForm({request}: HttpContextContract){
        try {
          const {estudianteId, answers} = request.all();
          for(let answer of answers ){
              const form = new Form();
              await Answer.findOrFail(answer)
              form.answer_id = answer
              await User.findOrFail(estudianteId)
              form.student_id = estudianteId
              form.save()
          }
          
          return { "state": true, "message": "Respuestas almacenadas con éxito"}
        } catch {
          return { "state": false, "message": "No se pudieron almacenar las respuestas"}
        }
      }
    public async listQuestionsAndAnswers(){
        try{
          const list = await Question.query().select('question','id') 
          let questionAndOptionsArray:any[] = []
          for (let question of list){
            const options = await Database.from('answers').where('question_id','=',question.id).select('id','answer as option')
            const questionAndOptions =  {'question':question.question,'id': question.id, 'options': options}
            questionAndOptionsArray.push(questionAndOptions)
          }
          return { "state": true, "questions":questionAndOptionsArray}
        } catch {
          return { "state": false, "message": "Error al obtener el listado"}
        }
      }
}
