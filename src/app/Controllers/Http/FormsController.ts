import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Form from 'App/Models/Form';

export default class FormsController {

  public async getQuestionOptions({response}: HttpContextContract) {
    try {
      const questions = await Database.from('questions').select([ 'question', 'id']);
      for (let index = 0; index < questions.length; index++) {
        const options = await Database.from('answers').select(['id', 'answer as option']).where('question_id', questions[index].id);
        questions[index].options = options;
      }
      response.status(200).json({
        "state": true,
        "questions": questions
      })
    } catch (error) {
      console.log(error);
      return{
        "state": false,
        "message": "Error al listar las preguntas"
      }
    }
  }

  public async postForm({request, response}: HttpContextContract) {
    const {estudianteId, answers} = request.all();
    try {
      for (let index = 0; index < answers.length; index++) {
        const form = new Form();
        form.student_id = estudianteId;
        form.answer_id = answers[index]
        await form.save();
      }
      response.status(200).json({
        "state": true,
        "message": "Respuestas almacenadas con exito"
      })
    }
    catch (error) {
      console.log(error);
      response.status(500).json({
        "state": false,
        "message": "No se pudieron almacenar las respuestas"
      })
    }

  }
  public async stundentForms({request, response}: HttpContextContract) {
    const {estudianteId} = request.all();
    try {
      const forms = await Form.query().select(['forms.id', 'questions.question', 'answers.answer']).where('forms.student_id', estudianteId).innerJoin('answers', 'forms.answer_id', 'answers.id');
      response.status(200).json({
        "state": true,
        "forms": forms
      })
    } catch (error) {
      console.log(error);
      response.status(500).json({
        "state": false,
        "message": "Error al listar las respuestas"
      })
    }
  }
}
