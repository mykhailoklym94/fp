const curry = fn => x => y => fn(x, y);

module.exports = {
  curry
}