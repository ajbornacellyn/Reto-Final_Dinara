import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Get Options', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const response = await client.get('/api/v1/questions/getOptions/5')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})