const queries = {
  foods: (query = '') => `
    SELECT
      f.id, b.brand_name, f.food_name, f.quantity, f.measure, f.portion, f.unit, f.kcal, f.protein, f.carbs, f.fat, f.saturated_fat, f.trans_fat, f.mono_fat, f.poly_fat, f.sugar, f.fiber, f.sodium, f.vitamin_b12
    FROM
      foods f
    LEFT JOIN
      brands b
    ON
      f.brand_id = b.id
    WHERE
      f.food_name like '%${query}%'
    ORDER BY
      f.food_name ASC
  `,
  brands: () => `
    SELECT
      *
    FROM
      brands
    ORDER BY
      brand_name
  `,
  foodsByBrand: (brandId) => {
    let condition = ''
    if (brandId) condition = `AND f.brand_id = ${brandId}`
    let query = `
      SELECT
        *
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
