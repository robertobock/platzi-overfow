import jwt from "jsonwebtoken";
import Debug from 'debug'
import {secret} from '../config'
const debug = Debug('platzi-overflow:questions-middleware')
export const users = [{
  firstName:"Roberto",
  lastName:"Bock",
  email:"robertobock@gmail.com",
  password:"123456",
  userId:"12345"
}]
export const findUserByEmail = e => { return users.find(({email}) => { return email === e })}
export const comparePasswords = (u, p) => { return u.password === p }
export const createToken = user => jwt.sign({user}, secret, {expiresIn: 86400})
export const required = (req, res, next) => {
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
    next()
  })
}
