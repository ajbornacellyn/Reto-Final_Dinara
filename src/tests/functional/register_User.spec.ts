import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Register User', async ({client, assert}) => { 
    const token = await obtenerTokenAutorizacion()   
    let body = {
        firstName: "Name",
        secondName: "SecondName",
        surname: "Surname",
        secondSurName: "SecondSurname",
        typeDocument: 1,
        documentNumber: "31231312",
        email: "test37@gmail.co",
        password:"828282",
        rol:2,
        phone: "2313123"
    }
    const response = await client.post('/api/v1/user/create').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body()) //.isArray(response.body())
})
