const gallery = document.getElementById('gallery');
let users = null;

const fetchData = async (url) =>
  await fetch(url).then((res) =>
    res.json()
  ); /* Reusable function that fetches the URL that is passed as a parameter and converts it to json format*/

fetchData('https://randomuser.me/api/?nat=us,gb&?format=SQL&results=12')
  .then((data) => {
    users = data.results;
    filterUsers(users);
    displayUsers(users);
    return users;
  })
  .catch((err) => console.error(err));

const displayUsers = (users) => {
  const userIndex = users
    .map((user, index) => {
      const { first: firstname, last: lastname } = user.name;
      const { city, state } = user.location;
      const email = user.email;
      const thumbnail = user.picture.thumbnail;

      return `
      <div class="card" data-id=${index}>
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

  for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
    document.querySelectorAll('.card')[i].addEventListener('click', (e) => {
      let dataId = parseInt(e.currentTarget.dataset.id);
      let user = users[dataId];
      showModal(user);

      document
        .getElementById('modal-close-btn')
        .addEventListener('click', () => {
          const modal = document.querySelector('.modal-container');
          document.body.removeChild(modal);
        });
    });
  }
};

const showModal = (user) => {
  const highlightedUser = `
    <div class="modal-container">
              <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="${
                        user.picture.medium
                      }" alt="profile picture">
                      <h3 id="name" class="modal-name cap">${
                        user.name['first'] + ' ' + user.name['last']
                      }</h3>
                      <p class="modal-text">${user.email}</p>
                      <p class="modal-text cap">${user.location.city}</p>
                      <hr>
                      <p class="modal-text">${user.phone}</p>
                      <p class="modal-text">${
                        user.location.street.name +
                        ' ' +
                        user.location.street.number +
                        ', ' +
                        user.location.postcode +
                        ' ' +
                        user.location.country
                      }</p>
                      <p class="modal-text">Birthday: ${user.dob.date}</p>
                  </div>
              </div>
      </div>
    `;
  gallery.insertAdjacentHTML('afterend', highlightedUser);
};

const filterUsers = (users) => {
  const searchField = `
  <div class="search-container">
  <form id="form" action="#" method="get">
    <input
      type="search"
      id="search-input"
      class="search-input"
      placeholder="Search..."
    />
  </form>
</div>
  `;
  document
    .querySelector('.header-text-container')
    .insertAdjacentHTML('afterend', searchField);

  document.forms['form']
    .querySelector('input')
    .addEventListener('keyup', (e) => {
      e.preventDefault();
      const term = e.target.value.toLowerCase();
      const filteredNames = users.filter((user) => {
        return (
          user.name.first.toLowerCase().includes(term) ||
          user.name.last.toLowerCase().includes(term)
        );
      });
      displayUsers(filteredNames);
    });
};
