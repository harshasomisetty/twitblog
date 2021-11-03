const { client, index, type } = require('./elastic')

module.exports = {
  /** Query ES index for the provided term */
  queryTerm (term, offset = 0) {
    const body = {
      from: offset,
      query: { match: {
        text: {
          query: term,
          operator: 'and',
          fuzziness: 'auto'
        } } },
      highlight: { fields: { text: {} } }
    }

    return client.search({ index, type, body })
  }
}


