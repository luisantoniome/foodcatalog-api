const express = require('express')
const router = express.Router()
const pool = require('../database')
const queries = require('../queries')

router.get('/', async (req, res, next) => {
  try {
    let plansList = []
    const plans = await pool.query(queries.plans())

    if (plans.length) {
      plans.forEach(async (tag, key) => {
        const tagJSON = JSON.parse(JSON.stringify(tag))
        
        plansList.push(tagJSON)

        if (Object.is(plans.length - 1, key)) {
          res.status(200).json({
            "records": plans.length,
            "response": plansList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": plans.length,
        "response": plansList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

router.get('/meals', async (req, res, next) => {
  try {
    let planMealsList = []
    const planMeals = await pool.query(queries.planMeals(req.query.id))

    if (planMeals.length) {
      planMeals.forEach(async (tag, key) => {
        const tagJSON = JSON.parse(JSON.stringify(tag))
        
        planMealsList.push(tagJSON)

        if (Object.is(planMeals.length - 1, key)) {
          res.status(200).json({
            "records": planMeals.length,
            "response": planMealsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": planMeals.length,
        "response": planMealsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

router.get('/mealfoods', async (req, res, next) => {
  try {
    let mealFoodsList = []
    const mealFoods = await pool.query(queries.mealFoods(req.query.id))

    if (mealFoods.length) {
      mealFoods.forEach(async (tag, key) => {
        const tagJSON = JSON.parse(JSON.stringify(tag))
        
        mealFoodsList.push(tagJSON)

        if (Object.is(mealFoods.length - 1, key)) {
          res.status(200).json({
            "records": mealFoods.length,
            "response": mealFoodsList
          })
        }
      })
    } else {
      res.status(200).json({
        "records": mealFoods.length,
        "response": mealFoodsList
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

module.exports = router
