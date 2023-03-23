import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class ValidarAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader: any = ctx.request.header('authorization')      

    try{
      const usuariosController = new UsersController()
      const {rol} = await usuariosController.obtenerPayload(authorizationHeader)
      if( rol != 'administrador'){
        return ctx.response.status(401).json({
          msj: 'No tiene permisos para acceder a esta ruta',
        })
      }
      await next()
    }catch(error){            
      console.log(error);
      ctx.response.status(400).json({"msj": "Token no valido"})
    }    
  }
}