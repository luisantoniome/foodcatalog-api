const express = require('express')

const foodsRouter = require('./routes/foods')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/foods', foodsRouter);

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
