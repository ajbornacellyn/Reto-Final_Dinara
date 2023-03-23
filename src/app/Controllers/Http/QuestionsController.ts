import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import Answer from 'App/Models/Answer';

export default class QuestionsController {

  public async CreateQuestion({request, response}: HttpContextContract) {
    const {question, options} = request.all();

    try {
      const quest = new Question();
      quest.question = question;
      await quest.save();

      for (let index = 0; index < options.length; index++) {
        const answer = new Answer();
        answer.answer = options[index].opcion;
        answer.is_correct = options[index].iscorrect;
        answer.question_id = quest.id;
        await answer.save();
      }
      response.status(200).json({
        "state": true,
        "message": "Pregunta creada exitosamente"
      })

    }catch (error) {
      response.status(500).json({
          "state": false,
          "message": "Error al crear la pregunta"
      })

    }

  }

  public async getQuestions({response}: HttpContextContract) {
    try {
      const questions = await Question.query().select(['id', 'question'])
      response.status(200).json({
        "questions": questions,
        "state": true
      })

    } catch (error) {
      response.status(500).json({
        "state": false,
        "message": "Error al listar las preguntas"
      })
    }
  }
 


  public async deleteQuestion({request, response}: HttpContextContract) {
    try {
      const idQuestion = request.param('id');
      const question = await Question.find(idQuestion);
      if(question){
        question.state = false;
        await question?.save();
        response.status(200).json({
        "state": true,
        "message":  "Pregunta Eliminada con exito"
      })
      }
      

    } catch (error) {
      console.log(error);
      response.status(500).json({
        "state": false,
        "message":  "Error al eliminar la pregunta"
      })
    }
  }

  public async updateQuestion({request, response}: HttpContextContract) {
    try{
      const idQuestion = request.param('id_question');
      const {question} = request.all();
      const quest = await Question.find(idQuestion);
      if(quest){
        quest.question = question;
        await quest.save();
        response.status(200).json({
          "state": true,
          "message":  "Pregunta Actualizada con exito"
        })
      }else{
        response.status(500).json({
          "state": false,
          "message":  "Error al editar la pregunta"
        })
    }
  }catch (error) {
    console.log(error);
    response.status(500).json({
      "state": false,
      "message":  "Error al editar la pregunta"
    })
  }
  }

  public async listOptions({request, response}: HttpContextContract) {
    try {
      const idQuestion = request.param('id_question');
      const options = await Answer.query().where('question_id', idQuestion).select(['id', 'answer'])
      response.status(200).json({
        "status": true,
        "message": "Listado de opciones",
        "options": options

      })
    } catch (error) {
      response.status(500).json({
        "state": false,
        "message": "Error al listar las opciones"
      })
    }
  }
}
