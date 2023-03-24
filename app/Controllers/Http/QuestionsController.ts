import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';


export default class QuestionsController {
    public async registerQuestion({request}: HttpContextContract){
        try {
  
          const {question, options} = request.all();
          const newQuestion = new Question();
          newQuestion.question = question
            
          await newQuestion.save();
          for (let answerOption of options){
            const newAnswer = new Answer();
            newAnswer.answer = answerOption.opcion
            newAnswer.is_correct =
            answerOption.iscorrect
            newAnswer.question_id = newQuestion.id 
            await newAnswer.save();
            
          }
          return { "state": true, "message": "Pregunta creada exitosamente"}
        } catch {
          return { "state": false, "message": "Error al crear la pregunta"}
        }
      }
      public async listQuestions(){
        try{
          const list = await Question.query().select('question','id')
          return { "state": true, "questions":list}
        } catch {
          return { "state": false, "message": "Error al listar las preguntas"}
        }
      }

      public async deleteQuestion({request}:HttpContextContract){
        try{
            const id = request.param('id');
            await (await Question.findOrFail(id)).delete()
            return { "state": true, "message": "Pregunta eliminada con éxito"}
        } catch {
            return { "state": false, "message": "Error al eliminar la pregunta"}
        }
     }

     public async updateQuestion({request}: HttpContextContract){
        try {

          const id = request.param('id');
          const updatedQuestion = await Question.findOrFail(id)
          const {question} = request.all();
          updatedQuestion.question = question
  
          await updatedQuestion.save()
          return {"state": true,
            "message": "Pregunta editada con éxito"}      
        } catch {
          return {"state": false,
            "message": "Error al editar la pregunta"} 

        }
     }
}
