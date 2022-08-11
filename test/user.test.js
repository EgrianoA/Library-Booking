const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const timeoutLimit = 10000
const randomChar = (length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


describe('User Controller : Signup', () => {
    it("Should returning status 200", done => {
        chai.request(app).post('/api/user/signup').send({
            "email": `${randomChar(5)}@a.com`,
            "username": randomChar(6),
            "password": "abcd1234"
        }).end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('object')
            expect(res.body.data).to.have.lengthOf.above(0)
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Signup - exist user', () => {
    it("Should returning error", done => {
        chai.request(app).post('/api/user/signup').send({
            "email": "abc123",
            "username": "testt",
            "password": "abcd1234"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Signup - invalid email', () => {
    it("Should returning error", done => {
        chai.request(app).post('/api/user/signup').send({
            "email": "abc123",
            "username": "testt",
            "password": "abcd1234"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Signup - invalid username', () => {
    it("Should returning error", done => {
        chai.request(app).post('/api/user/signup').send({
            "email": "a@a.com",
            "username": "tes",
            "password": "abcd1234"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Signup - invalid password', () => {
    it("Should returning error", done => {
        chai.request(app).post('/api/user/signup').send({
            "email": "a@a.com",
            "username": "testt",
            "password": "ab"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Login', () => {
    it("Should returning status 200", done => {
        chai.request(app).post('/api/user/login').send({
            "username": "a@a.com",
            "password": "abcd1234"
        }).end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('object')
            expect(res.body.data).to.have.lengthOf.above(0)
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Signup - invalid username', () => {
    it("Should returning error", done => {
        chai.request(app).post('/api/user/login').send({
            "username": "a@azzz.com",
            "password": "abcd1234"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('User Controller : Signup - invalid password', () => {
    it("Should returning error", done => {
        chai.request(app).post('/api/user/login').send({
            "username": "a@a.com",
            "password": "abcd1234xxxa"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})