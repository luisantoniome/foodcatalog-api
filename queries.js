const queries = {
  foods: (query = '') => `
    SELECT
      f.id, b.brand_name, f.food_name, f.quantity, f.measure, f.portion, f.unit, f.kcal, f.protein, f.carbs, f.fat, f.saturated_fat, f.trans_fat, f.mono_fat, f.poly_fat, f.sugar, f.fiber, f.sodium, f.cholesterol, f.vitamin_b12, f.dairy
    FROM
      foods f
    LEFT JOIN
      brands b
    ON
      f.brand_id = b.id
    WHERE
      f.food_name like '%${query}%'
    ORDER BY
      b.brand_name ASC
  `,
  brands: () => `
    SELECT
      *
    FROM
      brands
    ORDER BY
      brand_name
  `,
  tags: () => `
    SELECT
      *
    FROM
      tags
    ORDER BY
      tag
  `,
  filter: (brand) => {
    let condition = ''
    if (brand == 0) condition = `AND f.brand_id IS NULL`
    if (brand > 0) condition = `AND f.brand_id = ${brand}`
    let query = `
      SELECT
        f.id, b.brand_name, f.food_name, f.quantity, f.measure, f.portion, f.unit, f.kcal, f.protein, f.carbs, f.fat, f.saturated_fat, f.trans_fat, f.mono_fat, f.poly_fat, f.sugar, f.fiber, f.sodium, f.cholesterol, f.vitamin_b12, f.dairy
      FROM
        foods f
      LEFT JOIN
        brands b
      ON
        f.brand_id = b.id
      WHERE 1
        ${condition}
      ORDER BY
        f.food_name ASC
    `
    return query
  },
  foodTags: (foodId, tagId) => {
    let condition = ''
    condition += `AND ft.food_id = ${foodId}`
    if (tagId) condition += ` AND ft.tag_id = ${tagId}`
    let query = `
      SELECT
        t.tag
      FROM
        foods_tags ft
      INNER JOIN
        foods f
      ON
        ft.food_id = f.id
      INNER JOIN
        tags t
      ON
        ft.tag_id = t.id
      WHERE 1
        ${condition}
    `
    return query
  },
  plans: () => `
    SELECT
      *
    FROM
      plans
  `,
  planMeals: planId => `
    SELECT
      *
    FROM
      plans_meals
    WHERE
      plan_id = ${planId}
  `,
  mealFoods: mealId => `
    SELECT
      f.food_name, f.brand_id, mf.food_quantity, f.measure, f.portion, f.unit, f.kcal, f.protein, f.carbs, f.fat, f.saturated_fat, f.trans_fat, f.mono_fat, f.poly_fat, f.sugar, f.fiber, f.sodium, f.cholesterol, f.vitamin_b12, f.dairy
    FROM
      meals_foods mf
    LEFT JOIN
      foods f
    ON
      mf.food_id = f.id
    WHERE
      mf.meal_id = ${mealId}
  `,
}

module.exports = queries
