const request = require("supertest")
const app = require('../app.js')
const db = require('../db/connection')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')
//const articles = require("../db/data/test-data/articles.js")
afterAll(() => {
    if(db.end) db.end();
})

beforeEach(()=> seed(testData))
describe('app', ()=> {
    describe('GET - /api/topics', ()=> {
        test('status: 200, responds with an array of topics objects', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then (({body: {topics}}) => {
            expect(topics).toHaveLength(3);
            topics.forEach((topic) => {
                expect(topic).toEqual(
                    expect.objectContaining({
                        //topic_id: expect.any(Number),
                        description: expect.any(String),
                        slug: expect.any(String)

                    })              
                 );            
             });
          });     
       });
    });
});
describe('GET /api/articles/:article:id', () => {
    test('status: 200, respond with a single matching article', () => {
        return request(app)
        .get(`/api/articles/1`)
        .expect(200)
        .then(({ body }) => {
            expect(body.article).toEqual(
                expect.objectContaining({

                //article_id: 1,
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),  


                })
                // article_id: 1,
                // title: "Living in the shadow of a great man",
                // topic: "mitch",
                // author: "butter_bridge",
                // body: "I find this existence challenging",
                // created_at: "2020-07-09T20:11:00.000Z",
                // votes: 100,

            )
        })
    })
    
    test('status:404, respond with error path not found', () => {
        return request (app)
           .get ("/api/articles/5000")
           .expect(404)
           .then(({body:{ msg }})=> {
                expect(msg).toBe("article not found");
           })
  
     })

     test('status: 400, respond with err msg for invalid article_id', () =>{
        return request(app)
            .get(`/api/articles/two`)
            .expect(400)
            .then(({body: { msg }}) => {
                expect(msg).toBe("bad request");
        });
     });

})