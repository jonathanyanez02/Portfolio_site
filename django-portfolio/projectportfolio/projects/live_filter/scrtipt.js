const results = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

filter.addEventListener('input', (e) => filterResults(e.target.value.toLocaleLowerCase()));

fetchUsers();

async function fetchUsers() {
  const url = 'https://randomuser.me/api/?results=50';
  const res = await fetch(url);
  const data = await res.json();
  results.innerHTML = '';
  data.results.forEach((user) => createUserCard(user));
}

function createUserCard(data) {
  const userCard = document.createElement('li');
  userCard.innerHTML = `
    <img src="${data.picture.medium}" alt="Sara" />
    <div class="user-info">
      <h4>${data.name.title ? data.name.title + ' ' : ''}${data.name.first} ${data.name.last}</h4>
      <p>${data.location.city}, ${data.location.country}</p>
    </div>
    `;
  results.appendChild(userCard);
  listItems.push({
    element: userCard,
    searchString: `${data.name.title}|${data.name.first}|${data.name.last}|${data.location.city}|${data.location.country}`.toLocaleLowerCase(),
  });
}

function filterResults(searchString) {
  listItems.forEach((item) => {
    if (item.searchString.includes(searchString)) {
      item.element.classList.remove('hide');
    } else {
      item.element.classList.add('hide');
    }
  });
}
