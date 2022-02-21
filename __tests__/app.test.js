const request = require("supertest")
const app = require('../app.js')
const db = require('../db/connection')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')
const { idleTimeoutMillis } = require("pg/lib/defaults")
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
                    article_id: 1,
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),  
                })
           

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

describe('PATCH /api/articles/:article_id', () => {
    test('status:200, responds with the updated article (increminted vote)', () => {
        const updatedVote = {
            inc_vote: 50
        };
        return request(app)
            .patch('/api/articles/1')
            .send(updatedVote)
            .expect(201)
            .then((result) => {                                                                                                                                                                                                                                                               
                expect(result.body.votes).toBe(150);
            });
    });

    // test.only('status: 400, respond with bad request if the vote is invalid', () =>{
    //     const updatedVote = {
    //          inc_vote: 'fifty'
    //     };
    //     return request(app)
    //         .patch(`/api/articles/1`)
    //         .send(updatedVote)
    //         .expect(400)
    //         .then(({body: { msg }}) => {
    //             expect(msg).toBe("bad request");
    //     });
    //  });

    
});