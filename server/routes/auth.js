import express from 'express'
import Debug from 'debug'
import {secret} from '../config'
import {createToken} from '../midlewares'
import {hashSync as hash, compareSync as comparePasswords} from 'bcryptjs'
import {User} from '../models'
const debug = new Debug('platzi-overflow:auth')
const app = express.Router()

const handleError = (res, error) => {
  return res.status(401).json({
    message: 'Login failed',
    error: error || 'Email and password dom\'t match'
  })
}
// POST api/auth/
app.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({email})
  debug(`User is ${user}`)
  if(!user) {
    debug(`User mail ${email} not found`)
    return handleError(res)
  }
  if(!comparePasswords(password, user.password)){
    debug(`Provided password ${password} not match with user password ${user.password}`)
    return handleError(res, 'Email and password does not match')
  }
  const token = createToken(user)
  res.status(200).json({
    message:'Login succeded',
    token,
    userId:user.userId,
    email:user.email,
    firstName: user.firstName,
    lastName: user.lastName
  })
})

app.post('/signup', async (req, res) => {
  debug("Creando usuario")
  const {firstName, lastName, email, password} = req.body
  const u = new User({
    firstName,
    lastName,
    email,
    password: hash(password, 10)
  })
  const user = await u.save()
  const token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    token,
    firstName,
    lastName,
    email
  })
})
export default app
