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
};

const showModal = () => {};

gallery.addEventListener('click', (e) => {
  if (e.target !== gallery) {
    const dataId = e.target.dataset.id;
    console.log(users[dataId].name['first']);
    const highlightedUser = `
    <div class="modal-container">
              <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                      <h3 id="name" class="modal-name cap">${users[dataId].name['first']}</h3>
                      <p class="modal-text">email</p>
                      <p class="modal-text cap">city</p>
                      <hr>
                      <p class="modal-text">(555) 555-5555</p>
                      <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                      <p class="modal-text">Birthday: 10/21/2015</p>
                  </div>
              </div>
    `;
    gallery.insertAdjacentHTML('afterend', highlightedUser);
  }
});
