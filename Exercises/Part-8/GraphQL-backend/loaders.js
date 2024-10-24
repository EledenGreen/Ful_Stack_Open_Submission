const DataLoader = require('dataloader')
const Book = require('./models/Book')
const Author = require('./models/Author')

const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: '$author', count: { $sum: 1 } } },
  ])

  const countMap = {}
  counts.forEach((item) => {
    countMap[item._id.toString()] = item.count
  })

  return authorIds.map((id) => countMap[id.toString()] || 0)
})

const authorLoader = new DataLoader(async (names) => {
  const authors = await Author.find({ name: { $in: names } })

  const authorMap = {}
  authors.forEach((author) => {
    authorMap[author.name] = author
  })

  return names.map((name) => authorMap[name] || null)
})

module.exports = {
  bookCountLoader,
  authorLoader,
}
