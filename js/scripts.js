const gallery = document.getElementById('gallery');

/* Reusable function that fetches the URL that is passed as a parameter and converts it to json format*/

const fetchData = (url) => fetch(url).then((res) => res.json());

fetchData('https://randomuser.me/api/?format=SQL&results=12').then((data) => {
  const users = data.results.map((user) => {
    const { first, last } = user.name;
    const { city, state } = user.location;
    const email = user.email;
    const thumbnail = user.picture.thumbnail;

    gallery.innerHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${first} ${last}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>
    `;
    console.log(gallery);
  });

  return users;
});
