import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'


test('Get Options and Questions', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    const response = await client.get('/api/v1/form/getquestions')
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})