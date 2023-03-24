import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Form from "App/Models/Form"
import Question from "App/Models/Question"
import User from 'App/Models/User';




export default class FormsController {
    public async registerForm({request}: HttpContextContract){
        try {
          const {estudianteId, answers} = request.all();
          await User.findOrFail(estudianteId)
          for(let answer of answers ){
              const form = new Form();
              await Answer.findOrFail(answer)
              form.answer_id = answer

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
          let list = await Question.query().preload('options',(builder)=>{
            builder.select('id','answer')          
          }).select('id','question')
          
          return { "state": true, "questions":list}
        } catch {
          return { "state": false, "message": "Error al obtener el listado"}
        }
      }
}
