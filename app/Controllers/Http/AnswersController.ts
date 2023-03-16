import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';

export default class AnswersController {
    public async updateAnswer({request}: HttpContextContract){
        try {

          const id = request.param('id');
          const updatedAnswer = await Answer.findOrFail(id)
          const {opcion,iscorrect} = request.all();
          updatedAnswer.answer = opcion
          updatedAnswer.is_correct = iscorrect
  
          await updatedAnswer.save()
          return {"state": true,
            "message": "Opción editada con éxito"}      
        } catch {
          return {"state": false,
            "message": "Error al editar la opción"} 

        }
     }
     public async getOptions({request}: HttpContextContract){
        try {
          const questionId = request.param('id');
          await Question.findOrFail(questionId)
          const options = await Database.from('answers').where('question_id','=',questionId).select('answer as opcion','is_correct')
          return {"state":true,
          "message":"Listado de opciones",
          "options":options
        }     
        } catch {
          return {"state": false,
            "message": "Error al obtener el listado de opciones"} 
        }
     }
}
