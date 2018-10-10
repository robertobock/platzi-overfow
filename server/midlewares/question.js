const question = {
  _id: 1,
  titulo: "Esta es una pregunta de Android!",
  description: "Como hacer para conectar 2 activities en android?",
  createdAt: new Date(),
  icon: 'devicon-android-original',
  answers: []
}
export const currentUser = {
  firstName:"Roberto",
  lastName:"Bock",
  email:"robertobock@gmail.com",
  password:"123456"
}
export const questionMiddleware = (req, res, next) =>{
  const { id } = req.params
  const q = questions.find(({_id})=> _id === +id )
  req.question = q
  next()
}
export const questionsMiddleware = (req, res, next) =>{
  req.questions = questions
  next()
}
export const userMiddleware = (req, res, next) => {
  req.user = currentUser;
  next()
}
export const questions = new Array(10).fill(question)
