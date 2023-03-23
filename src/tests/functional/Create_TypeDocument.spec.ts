import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Create type document', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body = {
        name: "test37",
    }
    const response = await client.post('/api/v1/typeDocument/create').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})
