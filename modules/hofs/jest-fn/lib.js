const defaultArgument = () => { };

const fn = (fn = defaultArgument) => {
  const state = {
    results: [],
    args: []
  }

  const wrapper = (...args) => {
    state.args.push(args);

    try {
      const value = fn(...args);
      state.results.push({
        type: "return",
        value: value
      });
      return value;
    } catch (error) {
      state.results.push({
        type: "error",
        error: error
      });

      throw error;
    }
  };

  wrapper.state = state;


  return wrapper;
}


module.exports = {
  jest: {
    fn
  }
}