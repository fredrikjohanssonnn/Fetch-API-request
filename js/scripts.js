const gallery = document.getElementById('gallery');

const createElement = (element, className) => {
  const el = document.createElement(element);
  const result = el.add.classList(className);
  return result;
};

const fetchData = (url) => {
  return fetch(url).then((res) => res.json());
};

const displayUsers = () => {
  const card = createElement('div', 'card');
  const cardImgContainer = createElement('div', 'card-img-container');
  const img = createElement('img', 'card-img');
};

fetchData('https://randomuser.me/api/').then((data) => console.log(data));
