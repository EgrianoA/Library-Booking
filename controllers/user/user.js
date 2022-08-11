const response = require("../../helpers/response");
const responseError = require("../../helpers/response-error");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userData = require('../../helpers/dummyData/userData.json')
const _ = require('lodash')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')


module.exports = {
  signup: async (req, res) => {
    try {
      if (!Array.isArray(userData)) {
        userData = []
      }
      if (!req.body.email || !req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).json(responseError(400, 'Please input your valid email'));
      }

      if (!req.body.username || !req.body.username.match(/^([a-zA-Z0-9_-]){5,}$/)) {
        return res.status(400).json(responseError(400, 'Please input your username with minimum of 5 character'))
      }

      if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).json(responseError(400, 'Please input your password with minimum of 8 character'))
      }

      const isEmailOrUserFound = _.find(userData, (user) => { return user.email.toLowerCase() === req.body.email.toLowerCase() || user.username.toLowerCase() === req.body.username.toLowerCase() })
      if (isEmailOrUserFound) {
        return res.status(400).json(responseError(400, 'The email or username already exist, please use another email or username'))
      }

      const newUser = {
        _id: uuidv4(),
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
      }
      userData.push(newUser)
      fs.writeFile('helpers/dummyData/userData.json', JSON.stringify(userData), function writeJSON(err) {
        if (err) return console.log(err);
      });
      const userValue = {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      }
      const token = jwt.sign(
        { user: userValue },
        process.env.JWTKEY,
        { expiresIn: '24h' })
      return res.status(200).json(response({ user: userValue, token: token }));
    } catch (e) {
      console.log(e)
      return res.status(400).json(responseError(400, e.toString()));
    }
  },
  login: async (req, res, next) => {
    try {
      const user = _.find(userData, (user) => { return user.email.toLowerCase() === req.body.username.toLowerCase() || user.username.toLowerCase() === req.body.username.toLowerCase() })
      if (!user) return res.status(200).json(responseError(201));
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = {
          user: user._id,
          role: user.role,
          token: jwt.sign(
            {
              user: user._id
            },
            process.env.JWTKEY,
            { expiresIn: "24h" }
          )
        };
        return res.status(200).json(response(token));
      } else {
        return res.status(203).json(responseError(203));
      }
    } catch (error) {
      return res.status(400).json(responseError(400, error.toString()));
    }
  }
}