import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Update user', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body = {
        firstName: "daniel",
        secondName: "jose",
        surname: "cruz",
        secondSurName: "casallas",
        typeDocument: 1,
        documentNumber: "1312316253",
        email: "danielc88@gmail.co,",
        phone: "32123122314"
    }
    
    const response = await client.put('/api/v1/user/update/9').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})

