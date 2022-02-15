const request = require("supertest")
const app = require('../app.js')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')

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