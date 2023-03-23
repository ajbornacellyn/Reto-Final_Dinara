import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('get User', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const response = await client.get('/api/v1/user/getUser/5')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})