const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const timeoutLimit = 10000

describe('Book Controller : Search book', () => {
    it("Should returning status 200 with returning array of book data", done => {
        chai.request(app).get('/api/book/harry potter/1/2').send().end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.lengthOf.above(0)
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Book Controller : Search book with big size to test if timeout', () => {
    it("Should returning error status", done => {
        chai.request(app).get('/api/book/animal/1/200').send().end((err, res) => {
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Book Controller : Get genre list', () => {
    it("Should returning status 200 with returning book data", done => {
        chai.request(app).get('/api/book/genre').send().end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.lengthOf.above(0)
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Book Controller : Search book with genre', () => {
    it("Should returning status 200 with returning book data", done => {
        chai.request(app).get('/api/book/genre/recipe/1/2').send().end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.lengthOf.above(0)
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Book Controller : Search book of genre with big size to test if timeout', () => {
    it("Should returning error status", done => {
        chai.request(app).get('/api/book/genre/recipe/1/200').send().end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Book Controller : Search book with author', () => {
    it("Should returning status 200 with returning book data", done => {
        chai.request(app).get('/api/book/author/rowling/1/2').send().end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('array')
            expect(res.body.data).to.have.lengthOf.above(0)
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Book Controller : Search book of author with big size to test if timeout', () => {
    it("Should returning error status", done => {
        chai.request(app).get('/api/book/author/rowling/1/200').send().end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})