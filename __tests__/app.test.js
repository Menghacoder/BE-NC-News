const request = require("supertest")
const app = require('../app.js')
const db = require('../db/connection')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')
// const { idleTimeoutMillis } = require("pg/lib/defaults")
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

    test('status: 400, respond with bad request if the vote is invalid', () =>{
        const updatedVote = {
             inc_vote: 'fifty'
        };
        return request(app)
            .patch(`/api/articles/1`)
            .send(updatedVote)
            .expect(400)
            .then(({body: { msg }}) => {
                expect(msg).toBe("bad request");
        });
     });

});

describe('app', ()=> {
    describe('GET - /api/users', ()=> {
        test('status: 200, responds with an array of users objects', () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then (({body: {users}}) => {
            expect(users).toHaveLength(4);
            users.forEach((user) => {
                expect(user).toEqual(
                    expect.objectContaining({
                        username: expect.any(String),
                    })              
                 );            
             });
          });     
       });

test('status:404, respond with error path not found', () => {
    return request (app)
       .get ("/api/uses")
       .expect(404)
       .then(({body:{ msg }})=> {
            expect(msg).toBe("path not found");
       })

 })

});
});

// **********************************************************


describe('app', ()=> {
    describe('GET - /api/articles', ()=> {
        test('status: 200, responds with an array of articles objects', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then (({body: {articles}}) => {
            expect(articles).toHaveLength(12);
            articles.forEach((article) => {
                expect(article).toEqual(
                    expect.objectContaining({
                        //article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                    })              
                 );            
             });
          });     
       });

       test('status:404, respond with error path not found', () => {
        return request (app)
           .get("/api/articleeeees")
           .expect(404)
           .then(({body:{ msg }})=> {
                expect(msg).toBe("path not found");
           }) 
     })

// ----------------------------------- Not done ----------------------------------------------------------     
        xtest("status: 200, articles are sorted by date, descending order", () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body: {articles}})=>{
                expect(articles).toBeSortedBy("created_at");
            });
        });
// ------------------------------------------------------------------------------------------------------- 


//      test('status: 200, each article has comment_count property', () => {
//         return request(app)
//         .get("/api/articles")
//         .expect(200)
//         .then (({body: {articles}}) => {
//             console.log(articles[0], '<=========================')

//             expect(articles[0].comment_count).toBe("2");
//           });     
//        });

//     });
// });


// ----------------------------------- Not done ----------------------------------------------------------     

// describe("/api/articles/:article_id/comments", () => {
//     xtest("GET - status: 200, responds with all comments associated with the article_id in the query", () => {
//       return request(app)
//         .get(`/api/articles/2/comments`)
//         .expect(200)
//         .then(({ body: { comments } }) => {
//           comments.forEach((comment) => {
//             expect(comments.article_id).toBe(2);
//             console.log(comment)
//           });
//         });
//     });
// });
// ------------------------------------------------------------------------------------------------------- 



// ----------------------------------- Not done ----------------------------------------------------------     
// xdescribe("/api/articles/:article_id", () => {
//     test("GET - status: 200, responds with an array containing the queried article, with a comment_count column added to it ", () => {
//       const num = 3;
//       return request(app)
//         .get(`/api/articles/${num}`)
//         .expect(200)
//         .then(({ body: { article } }) => {
//           expect(article[0]).toHaveProperty("comment_count");
//           expect(article[0]).toMatchObject({
//             article_id: 3,
//             title: "Eight pug gifs that remind me of mitch",
//             topic: "mitch",
//             author: "icellusedkars",
//             body: "some gifs",
//             created_at: 1604394720000,
//             votes: 0,
//         });

//      });

// ----------------------------------- Not done ----------------------------------------------------------     


   });
});



// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
describe.only("/api/comments/:comment_id", () => {
    test("DELETE - status: 204, should respond with no content after deleting a given comment (:comment_id)", () => {
      return request
        .agent(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(() => {
          return request
            .agent(app)
            .delete("/api/comments/1")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toEqual("Comment not found");
            });
        });
    });
 
  });
// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
