import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Get users', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body = {
        perPage: 10,
        page: 1,
        filter: {
            name: "j"
        }
    }
    const response = await client.post('/api/v1/user/getUsers').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})


test('Get users #2', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const response = await client.post('/api/v1/user/getUsers')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})