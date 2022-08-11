const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)
const timeoutLimit = 10000

describe('Booking Controller : Set Schedule', () => {
    it("Should returning status 200 with returning object data", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "082244432496",
            "book": [
                "OL82563W"
            ],
            "scheduled_pickup": "25/09/2022 14:51"
        }).end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('object')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule invalid name', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "as",
            "phone": "082244432496",
            "book": [
                "OL82563W"
            ],
            "scheduled_pickup": "25/09/2022 14:51"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule invalid phone', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "xxxx",
            "book": [
                "OL82563W"
            ],
            "scheduled_pickup": "25/09/2022 14:51"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule - book invalid format', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "082244432496",
            "book": 'book',
            "scheduled_pickup": "25/09/2022 14:51"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule - empty book', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "082244432496",
            "book": [],
            "scheduled_pickup": "25/09/2022 14:51"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule - invalid book id', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "082244432496",
            "book": [
                "book123"
            ],
            "scheduled_pickup": "25/09/2022 14:51"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule - invalid schedule (wrong format)', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "082244432496",
            "book": [
                "OL82563W"
            ],
            "scheduled_pickup": "today evening"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Set Schedule - invalid schedule (outside library working hour)', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/set-schedule/').send({
            "name": "Jajang",
            "phone": "082244432496",
            "book": [
                "OL82563W"
            ],
            "scheduled_pickup": "25/09/2022 21:51"
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})


describe('Booking Controller : Get Schedule list', () => {
    it("Should returning status 200 with returning object data", done => {
        chai.request(app).post('/api/booking/schedule-list').set({
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMThlMWQwNTgtMjcxZC00YmJjLWEwMjktNTE3MmNlMWExMjcxIiwiaWF0IjoxNjYwMjIwODc0LCJleHAiOjE2NjAzMDcyNzR9.XHll7wgo7F7MkwlH0qtHEk6d-QLVVuKuguU2Paq529c"
        }).send({
            "page": 1,
            "size": 2,
            "date_range": {
                "from": "24/08/2022",
                "to": "27/10/2022"
            },
        }).end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('object')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule list - invalid page/size', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/schedule-list').set({
            "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMThlMWQwNTgtMjcxZC00YmJjLWEwMjktNTE3MmNlMWExMjcxIiwiaWF0IjoxNjYwMjIwODc0LCJleHAiOjE2NjAzMDcyNzR9.XHll7wgo7F7MkwlH0qtHEk6d-QLVVuKuguU2Paq529c"
        }).send({
            "page": 'xxxx',
            "size": 2,
            "date_range": {
                "from": "24/08/2022",
                "to": "27/10/2022"
            },
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule list - not including auth', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/schedule-list').send({
            "page": 1,
            "size": 2,
            "date_range": {
                "from": "24/08/2022",
                "to": "27/10/2022"
            },
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule list - invalid date (from > to)', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/schedule-list').send({
            "page": 1,
            "size": 2,
            "date_range": {
                "from": "24/09/2022",
                "to": "27/10/2022"
            },
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule list - invalid date (invalid format)', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/schedule-list').send({
            "page": 1,
            "size": 2,
            "date_range": 'abc123',
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule list - invalid date (invalid format)', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/schedule-list').send({
            "page": 1,
            "size": 2,
            "date_range": {
                "from": "abc234",
                "to": "27/10/2022"
            },
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule list - list not available at that time', () => {
    it("Should returning error status", done => {
        chai.request(app).post('/api/booking/schedule-list').send({
            "page": 1,
            "size": 2,
            "date_range": {
                "from": "27/10/2011",
                "to": "27/10/2012"
            },
        }).end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule by booking id', () => {
    it("Should returning status 200 with returning object data", done => {
        chai.request(app).get('/api/booking/find/BOOK-220925-432496-4049').send().end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('status').to.equal('success')
            expect(res.body).to.not.have.property('errorCode')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.a('object')
            done()
        })
    }).timeout(timeoutLimit);
})

describe('Booking Controller : Get Schedule by booking id - invalid booking id', () => {
    it("Should returning error status", done => {
        chai.request(app).get('/api/booking/find/BOOK-220925-432496-404z').send().end((err, res) => {
            expect(res.body).to.have.property('status').to.equal('error')
            expect(res.body).to.have.property('statusCode')
            expect(res.body).to.have.property('errorCode')
            expect(res.body).to.have.property('message')
            done()
        })
    }).timeout(timeoutLimit);
})