const express = require('express')
const router = express.Router()
const pool = require('../database')
const queries = require('../queries')

router.get('/', async (req, res, next) => {
  try {
    let foodsList = []
    const foods = await pool.query(queries.foods())

    if (foods.length) {
      foods.forEach(async (food, key) => {
        const foodJSON = JSON.parse(JSON.stringify(food))

        try {
          const foodTags = await pool.query(queries.tags(food.id))

          if (foodTags) {
            let tags = []
            foodTags.forEach(tag => tags.push(tag.tag))
            foodJSON.tags = tags
          }

          foodsList.push(foodJSON)
        } catch (err) {
          throw new Error (err)
        }

        if (Object.is(foods.length - 1, key)) {
          res.status(200).json({
            "records": foods.length,
            "response": foodsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": foods.length,
        "response": foodsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    let foodsList = []
    const foods = await pool.query(queries.foods(req.query.query))

    if (foods.length) {
      foods.forEach(async (food, key) => {
        const foodJSON = JSON.parse(JSON.stringify(food))

        try {
          const foodTags = await pool.query(queries.tags(food.id))

          if (foodTags) {
            let tags = []
            foodTags.forEach(tag => tags.push(tag.tag))
            foodJSON.tags = tags
          }

          foodsList.push(foodJSON)
        } catch (err) {
          throw new Error (err)
        }

        if (Object.is(foods.length - 1, key)) {
          res.status(200).json({
            "records": foods.length,
            "response": foodsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": foods.length,
        "response": foodsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

router.get('/search-by-brand', async (req, res, next) => {
  try {
    let foodsList = []
    const foods = await pool.query(queries.foodsByBrand(req.query.brandId))

    if (foods.length) {
      foods.forEach(async (food, key) => {
        const foodJSON = JSON.parse(JSON.stringify(food))

        try {
          const foodTags = await pool.query(queries.tags(food.id))

          if (foodTags) {
            let tags = []
            foodTags.forEach(tag => tags.push(tag.tag))
            foodJSON.tags = tags
          }

          foodsList.push(foodJSON)
        } catch (err) {
          throw new Error (err)
        }

        if (Object.is(foods.length - 1, key)) {
          res.status(200).json({
            "records": foods.length,
            "response": foodsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": foods.length,
        "response": foodsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

router.get('/brands', async (req, res, next) => {
  try {
    let brandsList = []
    const brands = await pool.query(queries.brands())

    if (brands.length) {
      brands.forEach((brand, key) => {
        const brandJSON = JSON.parse(JSON.stringify(brand))
        brandsList.push(brandJSON)

        if (Object.is(brands.length - 1, key)) {
          res.status(200).json({
            "records": brands.length,
            "response": brandsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": brands.length,
        "response": brandsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
