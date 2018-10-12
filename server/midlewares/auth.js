import jwt from "jsonwebtoken";
import Debug from 'debug'
import {secret} from '../config'
const debug = Debug('platzi-overflow:middleware:auth')
export const comparePasswords = (u, p) => { return u.password === p }
export const createToken = user => jwt.sign({user}, secret, {expiresIn: 86400})
export const required = (req, res, next) => {
  debug('Checking if the user is logged in')
  const token = req.query.token;
  jwt.verify(token, secret, (err, token) => {
    if(err) {
      debug('JWT was not encrypted with pur secret')
      return res.status(401).json({
        message: "Unautorized",
        error:err
      })
    }
    req.user = token.user
    debug(`req.user is ${req.user}`)
    next()
  })
}
