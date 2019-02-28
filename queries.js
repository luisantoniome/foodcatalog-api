const queries = {
  foods: () => `
    SELECT
      f.id, b.brand_name, f.food_name, f.quantity, f.measure, f.portion, f.unit, f.kcal, f.protein, f.carbs, f.fat, f.saturated_fat, f.trans_fat, f.mono_fat, f.poly_fat, f.sugar, f.fiber, f.sodium, f.vitamin_b12
    FROM
      foods f
    LEFT JOIN
      brands b
    ON
      f.brand_id = b.id
    ORDER BY
      food_name ASC
  `,
  tags: (foodId) => `
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
    WHERE
      ft.food_id = ${foodId}
    `
}

module.exports = queries
