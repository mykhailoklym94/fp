const { curry } = require("./lib");
const fetch = require("isomorphic-fetch");

const main = () => {
  const createApiClient = (baseUrl, path) => {
    return fetch(`${baseUrl}/${path}`).then(r => r.json);
  }

  const curriedClient = curry(createApiClient);

  const amazonClient = curriedClient('https://api.amazon.com');
  const goodReadsClient = curriedClient('https://api.goodreads.com');

  const amazonBooks = amazonClient('/books');
  const goodReadsBooks = goodReadsClient('/books');
};


main();