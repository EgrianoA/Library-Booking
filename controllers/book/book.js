const response = require("../../helpers/response");
const responseError = require("../../helpers/response-error");
const axios = require('axios')
const _ = require('lodash')
const parseBookData = (bookData) => {
    return ({
        key: bookData.key,
        title: bookData.title,
        subtitle: bookData.subtitle || '',
        first_publish_year: bookData.first_publish_year,
        edition: bookData.edition_count,
        authors: bookData.author_name,
        coverImg: `http://covers.openlibrary.org/b/olid/${bookData.cover_edition_key}-M.jpg`
    })
}
const bookFieldsParameter = 'key+title+subtitle+first_publish_year+author_name+cover_edition_key+edition_count'
const axiosTimeout = 5000

module.exports = {
    searchBook: async (req, res) => {
        try {
            const offset = (req.params.page - 1) * req.params.size
            let bookListRaw = await axios({
                method: 'get',
                url: `https://openlibrary.org/search.json?q=title:${req.params.bookName}&fields=${bookFieldsParameter}&limit=${req.params.size}&offset=${offset}`,
                timeout: axiosTimeout
            }).catch((err) => { return err })
            if (bookListRaw && bookListRaw.status === 200) {
                let booklistData = bookListRaw.data.docs.map((bookData) => {
                    if (bookData.cover_edition_key) {
                        return parseBookData(bookData)
                    }
                })
                booklistData = _.compact(booklistData)
                return res.status(200).json(response(booklistData));
            } else {
                return res.status(bookListRaw.status).json(response(bookListRaw.data));
            }
        } catch (error) {
            if (error.name) {
                return res.status(400).json(responseError(400, error.name));
            }
            return res.status(400).json(responseError(400, error.toString()));
        }
    },
    getBookGenreList: async (req, res) => {
        const genreList = ['Art', 'Science Fiction', 'Fantasy', 'Biographies', 'Recipes', 'Romance', 'Textbooks', 'Children', 'History', 'Medicine', 'religion', 'Mystery and Detective Stories', 'Plays', 'Music', 'Science'].sort()
        return res.status(200).json(response(genreList));
    },
    getBookByGenre: async (req, res) => {
        try {
            const offset = (req.params.page - 1) * req.params.size
            let bookListRaw = await axios({
                method: 'get',
                url: `https://openlibrary.org/search.json?q=subject:${req.params.genre}&limit=${req.params.size}&offset=${offset}`,
                timeout: axiosTimeout
            }).then((res) => { return res }).catch((err) => { return err })
            if (bookListRaw && bookListRaw.status === 200) {
                let booklistData = bookListRaw.data.docs.map((bookData) => {
                    if (bookData.cover_edition_key) {
                        return parseBookData(bookData)
                    }
                })
                booklistData = _.compact(booklistData)
                return res.status(200).json(response(booklistData));
            } else {
                return res.status(bookListRaw.status).json(response(bookListRaw.data));
            }
        } catch (error) {
            if (error.name) {
                return res.status(400).json(responseError(400, error.name));
            }
            return res.status(400).json(responseError(400, error.toString()));
        }
    },
    getBookByAuthor: async (req, res) => {
        try {
            const offset = (req.params.page - 1) * req.params.size
            let bookListRaw = await axios({
                method: 'get',
                url: `https://openlibrary.org/search.json?q=author:${req.params.authorName}&limit=${req.params.size}&offset=${offset}`,
                timeout: axiosTimeout
            }).catch((err) => { return err })
            if (bookListRaw && bookListRaw.status === 200) {
                let booklistData = bookListRaw.data.docs.map((bookData) => {
                    if (bookData.cover_edition_key) {
                        return parseBookData(bookData)
                    }
                })
                booklistData = _.compact(booklistData)
                return res.status(200).json(response(booklistData));
            } else {
                return res.status(bookListRaw.status).json(response(bookListRaw.data));
            }
        } catch (error) {
            if (error.name) {
                return res.status(400).json(responseError(400, error.name));
            }
            return res.status(400).json(responseError(400, error.toString()));
        }
    }
}