import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Create Form', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body = {
        "estudianteId": 5,
        "answers": [2,3,4,5]
    }
    const response = await client.post('/api/v1/form/postquestions')
        .header('Authorization', `Bearer ${token}`)
        .json(body)
    response.assertStatus(200)
    assert.exists(response.body)
})


