const response = require("../../helpers/response");
const responseError = require("../../helpers/response-error");
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const bookingData = require('../../helpers/dummyData/bookingData.json')
const _ = require('lodash')


const getBookDetail = async (key) => {
    let bookDetailRaw = await axios.get(`https://openlibrary.org/works/${key}.json`).catch(() => { return null })
    if (bookDetailRaw && bookDetailRaw.status === 200) {
        return bookDetailRaw.data
    } else {
        return null
    }
}

module.exports = {
    scheduleBook: async (req, res) => {
        try {
            if (!Array.isArray(bookingData)) {
                bookingData = []
            }
            let [borrower_fullname, borrower_phone, list_book, scheduled_pickup] = [req.body.name, req.body.phone, req.body.book, req.body.scheduled_pickup]
            scheduled_pickup = moment(scheduled_pickup, 'DD/MM/YYYY HH:mm', true)
            if (!borrower_fullname || borrower_fullname.trim().length < 3 || !borrower_fullname.match(/^[a-zA-Z ]+$/)) {
                return res.status(400).json(responseError(400, 'Please input your name with minimum of 3 character'))
            }
            if (!borrower_phone || !borrower_phone.match(/^((?:\+62|62)|0)[2-9]{1}[0-9]{8,11}$/gi)) {
                return res.status(400).json(responseError(400, 'Please input your valid phone number'))
            }
            if (!list_book || list_book.length < 1) {
                return res.status(400).json(responseError(400, 'Please input the book you want to borrow'))
            }
            if (!scheduled_pickup || !scheduled_pickup.isValid()) {
                return res.status(400).json(responseError(400, 'Please input the pickup time of the book'))
            }
            if (scheduled_pickup.hours() < 8 || scheduled_pickup.hours() >= 17) {
                return res.status(400).json(responseError(400, `You can't pickup the book at that time. Please select pickup time in our working hour (8AM - 5PM)`))
            }

            let bookList = await Promise.all(list_book.map(async (id) => {
                const bookDetail = await getBookDetail(id)
                if (bookDetail) {
                    return {
                        key: id,
                        title: bookDetail.title
                    }
                }
            }))

            bookList = _.compact(bookList)
            if (bookList.length < 1) {
                return res.status(400).json(responseError(400, `The book that you're requested is not available`))
            }
            let newBookingData = {
                booking_id: `BOOK-${scheduled_pickup.format('YYMMDD')}-${borrower_phone.slice(-6)}-${moment().unix().toString().slice(-4)}`,
                borrower_name: borrower_fullname,
                borrower_phone: borrower_phone,
                borrowed_book: bookList,
                scheduled_pickup: scheduled_pickup,
                createdAt : moment()
            }
            bookingData.push(newBookingData)
            fs.writeFile('helpers/dummyData/bookingData.json', JSON.stringify(bookingData), function writeJSON(err) {
                if (err) return console.log(err);
            });
            return res.status(200).json(response(newBookingData));
        } catch (error) {
            console.log(error)
            if (error.name) {
                return res.status(200).json(responseError(400, error.name));
            }
            return res.status(200).json(responseError(400, error.toString()));
        }
    },
    getBookScheduleList: async (req, res) => {
        try {
            if (!Array.isArray(bookingData)) {
                bookingData = []
            }
            let scheduleList = bookingData
            const page = req.body.page
            const offset = (req.body.page - 1) * req.body.size
            const limit = offset + page
            console.log({ page, offset, limit })
            let date_range = req.body.date_range
            if (date_range) {
                date_range.from = moment(date_range.from, 'DD/MM/YYYY')
                date_range.to = moment(date_range.to, 'DD/MM/YYYY')
                if (!date_range.from.isSameOrBefore(date_range.to)) {
                    return res.status(400).json(responseError(400, `Please input correct date range`))
                }
            }
            if (date_range) {
                scheduleList = _.filter(scheduleList, (booking) => {
                    return moment(booking.scheduled_pickup).isBetween(date_range.from.startOf('day'), date_range.to.endOf('day'))
                })
            }
            let pagingBookingData = []
            for (let i = offset; i < limit; i++) {
                pagingBookingData.push(bookingData[i])
            }

            if (pagingBookingData.length < 1) {
                return res.status(400).json(responseError(400, `There's no scheduled book pick up at this time`))
            }
            return res.status(200).json(response(pagingBookingData));
        } catch (error) {
            console.log(error)
            if (error.name) {
                return res.status(200).json(responseError(400, error.name));
            }
            return res.status(200).json(responseError(400, error.toString()));
        }
    },
    getBookScheduleByBookingID: async (req, res) => {
        try {
            if (!Array.isArray(bookingData)) {
                bookingData = []
            }
            const scheduledData = _.find(bookingData, (booking) => { return booking.booking_id === req.params.bookingId.toUpperCase() })
            if (scheduledData) {
                return res.status(200).json(response(scheduledData));
            } else {
                return res.status(400).json(responseError(400, `We can't found that Booking ID`))
            }
        } catch (error) {
            console.log(error)
            if (error.name) {
                return res.status(200).json(responseError(400, error.name));
            }
            return res.status(200).json(responseError(400, error.toString()));
        }
    }
}