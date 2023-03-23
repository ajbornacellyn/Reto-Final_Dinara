import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Create Role', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body = {
        "name": "test37",
    }
    const response = await client.post('/api/v1/role/create')
        .header('Authorization', `Bearer ${token}`).json(body)
    response.assertStatus(200)
    assert.exists(response.body)
})