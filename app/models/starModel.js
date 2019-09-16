const knex = require('../../mysql/knex.js')

const columnsByRanking = () => {
  const COUNT_QUERY = knex.raw('COUNT(*) as num')
  return ['brochure_id', COUNT_QUERY]
}

module.exports = {
  columnsByRanking
}
