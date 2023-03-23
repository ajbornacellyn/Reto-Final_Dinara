import { test } from '@japa/runner'


test('Login User', async ({client, assert}) => {
    const body =  {
        email: "admin@gmail.co",
        password: "admin"
    }
    const response = await client.post('/api/v1/login').json(body)
    response.assertStatus(200)
    assert.exists(response.body)
})

test('Login User # 2', async ({client, assert}) => {
    const body =  {
        email: "adminx@gmail.co",
        password: "admin"
    }
    const response = await client.post('/api/v1/login').json(body)
    response.assertStatus(404)
    assert.exists(response.body)
})


test('Login User # 3', async ({client, assert}) => {
    const body =  {
        email: "admin@gmail.co",
        password: "admin3312"
    }
    const response = await client.post('/api/v1/login').json(body)
    response.assertStatus(401)
    assert.exists(response.body)
})





