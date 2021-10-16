const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22870491-0414a720e7578a2aeb94b7ded';

function fetchPixabay(searchQuery, page) {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(result => {
      return result;
    });
}

export { fetchPixabay };