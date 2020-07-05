const gallery = document.getElementById('gallery');
let users = null;
/* Reusable function that fetches the URL that is passed as a parameter and converts it to json format*/

const fetchData = async (url) => await fetch(url).then((res) => res.json());

fetchData('https://randomuser.me/api/?format=SQL&results=12')
  .then((data) => {
    users = data.results;
    displayUsers();
    return users;
  })
  .catch((err) => console.error(err));

const displayUsers = () => {
  const userIndex = users
    .map((user) => {
      const { first: firstname, last: lastname } = user.name;
      const { city, state } = user.location;
      const email = user.email;
      const thumbnail = user.picture.thumbnail;

      return `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${thumbnail}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${firstname} ${lastname}</h3>
              <p class="card-text">${email}</p>
              <p class="card-text cap">${city}, ${state}</p>
          </div>
      </div>
  `;
    })
    .join('');

  gallery.innerHTML = userIndex;
};

const showModal = () => {};

gallery.addEventListener('click', (e) => {
  if (e.target !== gallery) {
    showModal();
  }
});
