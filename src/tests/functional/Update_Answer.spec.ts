import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './TestAuths'

test('Update Answer', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body ={
        opcion: "correcta",
        iscorrect:true
    }
    const response = await client.put('/api/v1/questions/updateAnswer/3').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.exists(response.body)
})


test('Update Answer #2', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body ={
        opcion: "correcta",
        iscorrect:true
    }
    const response = await client.put('/api/v1/questions/updateAnswer/1').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.exists(response.body)
})


test('Update Answer #3', async ({client, assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body ={
        opcion: "correcta",
        iscorrect:"true"
    }
    const response = await client.put('/api/v1/questions/updateAnswer/0').json(body)
        .header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.exists(response.body)
})
