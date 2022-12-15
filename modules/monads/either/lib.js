const Right = value => ({
  map: (fn) => {
    try {
      return Right(fn(value))
    } catch (error) {
      return Left(error)
    }
  },
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
  Either,
  Left,
  Right
}