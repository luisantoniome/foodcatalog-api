const express = require('express')

const foodsRouter = require('./routes/foods')
const tagsRouter = require('./routes/tags')
const plansRouter = require('./routes/plans')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/api/v1/foods', foodsRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/plans', plansRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error')
})

module.exports = app
