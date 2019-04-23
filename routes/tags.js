const express = require('express')
const router = express.Router()
const pool = require('../database')
const queries = require('../queries')

router.get('/', async (req, res, next) => {
  try {
    let tagsList = []
    const tags = await pool.query(queries.tags())

    if (tags.length) {
      tags.forEach(async (tag, key) => {
        const tagJSON = JSON.parse(JSON.stringify(tag))
        
        tagsList.push(tagJSON)

        if (Object.is(tags.length - 1, key)) {
          res.status(200).json({
            "records": tags.length,
            "response": tagsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": tags.length,
        "response": tagsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
