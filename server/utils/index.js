export const handleError = (error, res) => {
  console.log(error)
  res.status(500).json({
    message: 'An error has ocurred',
    error
  })
}
