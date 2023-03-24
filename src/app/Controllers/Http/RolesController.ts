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
  public async getRoles({response}: HttpContextContract) {
    try {
      const roles = await Role.query().select(['id', 'name']);
      response.status(200).json({
        "state": true,
        "roles": roles
      })
    } catch (error) {
      response.status(500).json({
        "state": false,
        "message": "Error al listar los roles"
      })
    }
  }
  public async putRole({request, response}: HttpContextContract) {
    const {id, name} = request.all();
    try {
      const role = await Role.find(id);
      if(role){
        role.name = name;
        await role.save();
        response.status(200).json({
        "state": true,
        "message": "Rol actualizado correctamente"
      })
      }else{
        response.status(500).json({
          "state": false,
          "message": "No se encontro el rol"
        })
      }
    } catch (error) {
      response.status(500).json({
        "state": false,
        "message": "Error al actualizar el rol"
      })
    }
  }
}
