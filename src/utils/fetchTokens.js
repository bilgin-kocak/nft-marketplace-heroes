// Fetch from url and return tokens
const fetchURLS = async (urls) => {
  const promises = urls.map((url) => {
    return fetch(url).then((response) => response.json());
  });
  const responses = await Promise.all(promises);
  return responses;
};
export { fetchURLS };
