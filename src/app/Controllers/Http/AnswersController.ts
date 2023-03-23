import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';

export default class AnswersController {

  public async updateAnswer({request, response}: HttpContextContract) {
    try{
      const idAnswer = request.param('id_opcion');
      const {opcion, iscorrect} = request.all();
      const answer = await  Answer.find(idAnswer);

      if(answer){
        answer.answer = opcion;
        answer.is_correct = iscorrect;
        await answer.save();

        response.status(200).json({
          "state": true,
          "message":  "opcion Editada con exito"
        })
      }else{
        response.status(404).json({
          "state": false,
          "message": "Error al editar la opcion"
      })

    }
  }catch (error) {
    console.log(error);
    response.status(400).json({
      "state": false,
      "message": "Error al editar la opcion"
    })

    }
  }

}
