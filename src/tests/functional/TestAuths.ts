import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export async function obtenerTokenAutorizacion():Promise<string>{
    let endpoint = "/api/v1/login"
    let body = {
        email: "admin@gmail.co",
        password: "admin"
    }
    let axiosResponse = await axios.post(`${Env.get("PATH_APP") + endpoint}`, body)
    return axiosResponse.data["token"]
}