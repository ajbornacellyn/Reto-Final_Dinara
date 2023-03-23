import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Create question', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body = {
    question: "¿que dia es hoy?",
    options: [
        {
            opcion:"esta es correcta",
            iscorrect:true
        },{
            opcion:"incorrecta",
            iscorrect:false
        },{
            opcion:"incorrecta",
            iscorrect:false
        },{
            opcion:"incorrecta",
            iscorrect:false
        } ]
    }
    const response = await client.post('/api/v1/questions/create').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})
