const pipe = (accumulator, fns) => {
  return fns.reduce((acc, fn) => fn(acc), accumulator)
}

module.exports = {
  pipe
}