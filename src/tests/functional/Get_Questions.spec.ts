import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('get Questions', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const response = await client.get('/api/v1/questions/getQuestions')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})
