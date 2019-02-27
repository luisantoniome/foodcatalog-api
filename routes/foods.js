const express = require('express')
const router = express.Router()
const pool = require('../database')
const queries = require('../queries')

router.get('/', async (req, res, next) => {
  try {
    const foods = await pool.query(queries.foods())

    if (foods) {
      let foodsListing = []

      foods.forEach(async (food, key) => {
        const foodString = JSON.stringify(food)
        let foodJSON = JSON.parse(foodString)
        try {
          foodsListing.push(foodJSON)
        } catch (err) {
          throw new Error (err)
        }

        if (Object.is(foods.length - 1, key)) {
          res.json({
            "status": 200,
            "error": null,
            "response": foodsListing
          })
        }
      })

    }
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
