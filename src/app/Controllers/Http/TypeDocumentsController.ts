import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypesDocument from 'App/Models/TypeDocument';

export default class TypeDocumentsController {

  public async CretaTypeDocument({request, response}: HttpContextContract) {
    const {name} = request.all();
    const typeDocument = new TypesDocument();
    typeDocument.name = name;
    try {
        await typeDocument.save();
        response.status(200).json({
          "state": true,
          "message": "Tipo de documento creado correctamente"
        })
    } catch (error) {
      console.log(error);
      response.status(500).json({
        "state": false,
        "message": "Fallo en la creación del tipo de documento"
      })
    }
  }
}
