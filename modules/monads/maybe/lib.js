const Just = value => ({
  type: "just",
  map: fn => Maybe(fn(value)),
  flatMap: fn => fn(),
  getOr: substitute => value,
  filter: fn => fn(value) ? Just(value) : Nothing()
});

const Nothing = () => ({
  type: "nothing",
  map: fn => Nothing(),
  flatMap: fn => fn(),
  getOr: substitute => substitute,
  filter: fn => Nothing()
});

const Maybe = value =>
  value === null ||
    value === undefined ||
    typeof value === "object" && value.type === "nothing"
    ? Nothing()
    : Just(value);

module.exports = {
  Maybe
}