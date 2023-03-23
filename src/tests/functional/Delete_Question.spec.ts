import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Delete Question', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const response = await client.delete('/api/v1/questions/deleteQuestion/4')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})