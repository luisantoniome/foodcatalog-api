const queries = {
  foods: () => `
    SELECT * FROM
      foods
    ORDER BY
      food_name ASC
  `,
}

module.exports = queries
