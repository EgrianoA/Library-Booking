const chai = require('chai')
const expect = chai.expect
const errResponse = require('../helpers/response-error')

describe('Response Error : 400', () => {
    it("Should returning error response object", done => {
        const result = errResponse(400, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 101', () => {
    it("Should returning error response object", done => {
        const result = errResponse(101, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 102', () => {
    it("Should returning error response object", done => {
        const result = errResponse(102, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 103', () => {
    it("Should returning error response object", done => {
        const result = errResponse(103, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 104', () => {
    it("Should returning error response object", done => {
        const result = errResponse(104, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 105', () => {
    it("Should returning error response object", done => {
        const result = errResponse(105, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 106', () => {
    it("Should returning error response object", done => {
        const result = errResponse(106, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 201', () => {
    it("Should returning error response object", done => {
        const result = errResponse(201, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 202', () => {
    it("Should returning error response object", done => {
        const result = errResponse(202, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 203', () => {
    it("Should returning error response object", done => {
        const result = errResponse(203, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 1001', () => {
    it("Should returning error response object", done => {
        const result = errResponse(1001, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 401', () => {
    it("Should returning error response object", done => {
        const result = errResponse(401, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 403', () => {
    it("Should returning error response object", done => {
        const result = errResponse(403, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 404', () => {
    it("Should returning error response object", done => {
        const result = errResponse(404, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})

describe('Response Error : 500', () => {
    it("Should returning error response object", done => {
        const result = errResponse(500, 'Error Occured')
        expect(result).to.have.property('status')
        expect(result).to.have.property('statusCode')
        expect(result).to.have.property('errorCode')
        expect(result).to.have.property('message')
        done()
    })
})