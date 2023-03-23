import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import jwt from "jsonwebtoken";
import Env from "@ioc:Adonis/Core/Env";
import Role from "App/Models/Role";
const bcryptjs = require("bcryptjs");

export default class UsersController {
  public async Register({ request, response }: HttpContextContract) {
    const { firstName, secondName, surname, secondSurName, typeDocument, documentNumber, email, password, rol, phone, } = request.all();
    const salt = bcryptjs.genSaltSync();
    const user = new User();

    user.first_name = firstName;
    user.second_name = secondName;
    user.surname = surname;
    user.second_surname = secondSurName;
    user.type_document = typeDocument;
    user.document_number = documentNumber;
    user.email = email;
    user.rol_id = rol;
    user.phone = phone;
    user.password = await bcryptjs.hashSync(password, salt);

    try {
      await user.save();
      return {
        state: true,
        message: "Estudiante creado correctamente",
      };
    } catch (error) {
      console.log(error);
      response.status(500).json( {
        state: false,
        message:"Fallo en la creación del estudiante",
      });
    }
  }

  public async login({ request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      //consultar si existe usuario con ese correo
      const user = await User.findBy("email", email);
      if (!user) {
        return response.status(404).json({ state: false, message: "contraseña o email invalido" });
      } else {
        //validar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
          return response.status(401).json({ state: false, message: "contraseña o email invalido" });
        }
        //consultar el rol del usuario
        const rol = await Role.findBy("id", user.rol_id);
        if (rol) {
          const payload = {
            name: user.first_name,
            id: user.id,
            rol: rol.name,
          };
          const token: string = this.generarToken(payload);
  
            response.status(200).json({
            state: true,
            id: user.id,
            name:
              user.first_name +
              " " +
              user.second_name +
              " " +
              user.surname +
              " " +
              user.second_surname,
            rol: rol.name,
            message: "Ingreso exitoso",
            token: token,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({ state: false, message: "contraseña o email invalido" });
    }
  }

  public async getUsers({ request, response }: HttpContextContract) {
    try {
      const { perPage, page, filter = {} } = request.all();
      const { name } = filter;
      const usersQuery = User.query();
      if (name) {
        usersQuery
          .where("first_name", "LIKE", `%${filter.name}%`)
          .orWhere("second_name", "LIKE", `%${filter.name}%`)
          .orWhere("surname", "LIKE", `%${filter.name}%`)
          .orWhere("second_surname", "LIKE", `%${filter.name}%`);
      }

      const users = await usersQuery.paginate(page, perPage);
      const usersData = this.changeKeys(users.toJSON().data);

      return {
        state: true,
        message: "Listado de estudiantes",
        users: usersData,
      };
    } catch (error) {
      response.status(400).json( {
        state: false,
        message: "Fallo en el listado de estudiantes",
      });
    }
  }
  public async getUsersById({ request }: HttpContextContract) {
    try {
      const id_user = request.param("id_user");
      const user = await User.find(id_user);
      if (!user) {
        return {
          state: false,
          message: "Error al consultar el detalle del usuario",
        };
      }

      return {
        firstName: user.first_name,
        secondName: user.second_name,
        surname: user.surname,
        secondSurName: user.second_surname,
        typeDocument: user.type_document,
        documentNumber: user.document_number,
        email: user.email,
        phone: user.phone,
      };
    } catch (error) {
      console.error(error);
      return {
        state: false,
        message: "Error al consultar el detalle del usuario",
      };
    }
  }

  public async editUser({ request }: HttpContextContract) {
    try {
      const {
        firstName,
        secondName,
        surname,
        secondSurName,
        typeDocument,
        documentNumber,
        email,
        rol,
        phone,
      } = request.all();

      const id_user = request.param("id_user");
      const user = await User.findBy("id", id_user);
      if (!user) {
        return {
          state: false,
          message: "Error al actualizar",
        };
      }
      user.first_name = firstName;
      user.second_name = secondName;
      user.surname = surname;
      user.second_surname = secondSurName;
      user.document_number = documentNumber;
      user.type_document = typeDocument;
      user.email = email;
      user.rol_id = rol;
      user.phone = phone;
      await user.save();
      return {
        state: true,
        message: "Se actualizo correctamente",
      };
    } catch (error) {
      console.error(error);
      return {
        state: false,
        message: "Error al actualizar",
      };
    }
  }

  public generarToken(payload: any): string {
    const opciones = {
      expiresIn: "30 mins",
    };
    return jwt.sign(payload, Env.get("JWT_SECRET_KEY"), opciones);
  }

  public verificarToken(authorizationHeader: string) {
    let token = authorizationHeader.split(" ")[1];
    token = jwt.verify(token, Env.get("JWT_SECRET_KEY"), (error) => {
      if (error) {
        throw new Error("Token expirado");
      }
    });
    return true;
  }

  public obtenerPayload(authorizationHeader: string) {
    let token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {
      complete: true,
    }).payload;
    return payload;
  }

  public changeKeys(users) {
    const newUsers = users.map((user) => ({
      firstName: user.first_name,
      secondName: user.second_name,
      surname: user.surname,
      secondSurName: user.second_surname,
      typeDocument: user.type_document,
      documentNumber: user.document_number,
      email: user.email,
      phone: user.phone,
    }));
    return newUsers;
  }

  public async tokenVerify(authorizationHeader: string) {
    let token = authorizationHeader.split(' ')[1]
    token = jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error) => {
      if (error) {
        return false
      }
    })
    return true
  }
}
