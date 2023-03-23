import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

export default class RolesController {
  public async CreateRole({request, response}: HttpContextContract) {
    const {name} = request.all();
    const role = new Role();
    role.name = name;
    try {
        await role.save();
        response.status(200).json({
          "state": true,
          "message": "Rol creado correctamente"
        })
    } catch (error) {
      response.status(500).json({
        "state": false,
        "message": "Fallo en la creación del rol"
      })
    }
  }
}
