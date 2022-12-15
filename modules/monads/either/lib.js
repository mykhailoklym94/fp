const Right = value => ({
  map: (fn) => Right(fn(value)),
  flatMap: fn => fn(value),
  fold: (fn) => fn(null, value)
})


const Left = (value) => ({
  map: fn => Left(value),
  flatMap: fn => Left(value),
  fold: (fn) => fn(value)
})


const Either = (value) => Right(value);

module.exports = {
  Either
}