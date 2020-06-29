const gallery = document.getElementById('gallery');

/* Reusable function that takes an element and a className as parameters. Just to make it easier to read*/

const createElement = (element, className) => {
  const el = document.createElement(element);
  const result = el.add.classList(className);
  return result;
};

/* Reusable function that fetches the URL that is passed as a parameter and converts it to json format*/

const fetchData = (url) => fetch(url).then((res) => res.json());

const displayUsers = () => {
  const card = createElement('div', 'card');
  const cardImgContainer = createElement('div', 'card-img-container');
  const img = createElement('img', 'card-img');
};

fetchData('https://randomuser.me/api/?format=SQL&results=12').then((data) => {
  const users = data.results.map((user) => {
    const { first, last } = user.name;
    const city = user.location.city;
    const email = user.email;
    const thumbnail = user.picture.thumbnail;
  });

  return users;
});
