const request = require('supertest');
const app = require('../app.js')

describe('post /cars', ()=>{
  it('sends error message when params are missing', async () =>{
    const res = await request(app)
      .post('/cars')
      .expect(422)
    // It matters that the error message mentions
    // the missing query params, so we use regexp to look
    // just for that term in the string
    expect(res.body.message).toMatch(/query parameters/)
  })

  // All the required query params to build the string consistently
  let n = "name=Ford&"
  let m = "mpg=28&"
  let w = "weight=3000&"
  let o = "origin=USA&"
  let y = "year=2022"

  it('requires name param', async () =>{
    const res = await request(app)
      .post('/cars?'+m+w+o+y)
      .expect('Content-Type', /json/)
      .expect(422)
  })
  it('requires mpg param', async () =>{
    const res = await request(app)
      .post('/cars?'+n+w+o+y)
      .expect('Content-Type', /json/)
      .expect(422)
  })
  it('requires weight param', async () =>{
    const res = await request(app)
      .post('/cars?'+n+m+o+y)
      .expect('Content-Type', /json/)
      .expect(422)
  })
  it('requires origin param', async () =>{
    const res = await request(app)
      .post('/cars?'+n+m+w+y)
      .expect('Content-Type', /json/)
      .expect(422)
  })
  it('requires year param', async () =>{
    const res = await request(app)
      .post('/cars?'+n+m+w+o)
      .expect('Content-Type', /json/)
      .expect(422)
  })
  it('returns a car obj on success', async () =>{
    const res = await request(app)
      .post('/cars?'+n+m+w+o+y)
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.body.message).toBeUndefined()
    expect(res.body.data.id).not.toBeUndefined()
  })

})

describe('get /cars', ()=>{
  it('sends error message when id param is missing', async () =>{
    const res = await request(app)
      .get('/cars')
      .expect(422)
    // It matters that the error message mentions
    // the missing query params, so we use regexp to look
    // just for that term in the string
    expect(res.body.message).toMatch(/query parameter/)
  })
  it('sends error message when car can\'t be found', async () =>{
    const res = await request(app)
      .get('/cars?id=banana')
      .expect(404)
    // It matters that the error message mentions the problem
    expect(res.body.message).toMatch(/no car/)
  })
  it('returns a car obj on successful find', async () =>{
    const res = await request(app)
      .get('/cars?id=2')
      .expect('Content-Type', /json/)
      .expect(200)

    // It matters that a car obj is returned,
    // but not what all the fields are within it,
    // so just test for two
    expect(res.body.data.id).not.toBeUndefined()
    expect(res.body.data.name).not.toBeUndefined()
  })
})


