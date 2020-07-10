const gallery = document.getElementById('gallery');
let users = null;

const fetchData = async (url) =>
  await fetch(url).then((res) =>
    res.json()
  ); /* Reusable function that fetches the URL that is passed as a parameter and converts it to json format*/

fetchData(
  'https://randomuser.me/api/?nat=us,gb&?format=SQL&results=12'
) /* Fetch the data with nationalities, 12 results and
call the functions and passing the parameter users which contains the array of objects (the result)*/
  .then((data) => {
    users = data.results;
    filterUsers(users);
    displayUsers(users);
    return users;
  })
  .catch((err) =>
    console.error(err)
  ); /* Log an error to the console in case somethings wrong (e.g. the URL is broken)*/

const displayUsers = (users) => {
  /* Map through the array. Destructure some properties for readability. Return the elements with a template literal
  and set the innerHTML of the gallery div with this content*/
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
    /* Loop through all the card elements. When a user clicks each card, it will pass the index number that was set to each user (data-id).
    then pass that one to the showModal function so it displays the correct user. */
    document.querySelectorAll('.card')[i].addEventListener('click', (e) => {
      let dataId = parseInt(e.currentTarget.dataset.id);
      let user = users[dataId];
      showModal(user);

      document /* Remove the current modal */
        .getElementById('modal-close-btn')
        .addEventListener('click', () => {
          const modal = document.querySelector('.modal-container');
          document.body.removeChild(modal);
        });
    });
  }
};

const showModal = (user) => {
  /* Using template literal to show the content of the user that was called in the displayUsers function */
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
  /* Add the form element to the page. It'll then add an eventlistener to the input element. */
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
      /* When the user press a button. It'll then compare the input against the names in the users array, and filter away the elements that doesn't include the user input */
      e.preventDefault();
      const term = e.target.value.toLowerCase();
      const filteredNames = users.filter((user) => {
        return (
          user.name.first.toLowerCase().includes(term) ||
          user.name.last.toLowerCase().includes(term)
        );
      });
      displayUsers(
        filteredNames
      ); /* Update the displayUsers with the new parameter which contains the new array that was passed through the filter function */
    });
};
