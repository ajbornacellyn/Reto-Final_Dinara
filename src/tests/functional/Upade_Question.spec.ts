import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Update Question', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body =  {
        question: "¿que dia es hoy?"
    }

    const response = await client.put('/api/v1/questions/updateQuestion/5')
        .header('Authorization', `Bearer ${token}`).json(body)
    response.assertStatus(200)
    assert.exists(response.body)
})