// Destructuring
const dom = [
    document.getElementById('main'),
    document.getElementById('add-user'),
    document.getElementById('double'),
    document.getElementById('show-millionaires'),
    document.getElementById('sort'),
    document.getElementById('calculate-wealth'),
]

const [main, addUserBtn, doubleBtn, showMillionairesBtn, sortBtn, calculateWealthBtn] = dom;

let data = [];

// Fetch random user API and add money
async function getRandomUser () {
   const res = await fetch('https://randomuser.me/api/');
   const data = await res.json();
   
   const user = data.results[0]; // console.log(user);

   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random()*1000000)
   } // console.log(newUser);
        
    addData(newUser); // Add newUser to function addData 
}

for (var i = 1; i < 7; i++) getRandomUser(i); // call getRandomUser 3times

// Map
doubleMoney = () => {
    data = data.map((user) => {
        return {...user, money: user.money * 2};
    });

    updateDom();
}

// Sort
sortByRichest = () => {
    data.sort((a, b) => b.money - a.money);

    updateDom();
}

// Filter
showMillionaires = () => {
    data = data.filter((user => user.money > 1000000));

    updateDom();
}

// Reduce
calculateWealth = () => {
    const wealth = data.reduce((acc, user) =>  (acc += user.money), 0);

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// Add new obj to data arr
addData = (obj) => {
    data.push(obj);

    updateDom();
};

// Update DOM
updateDom = (providedData = data) => {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`; // Clear main div
    
    providedData.forEach((item) => { 
        // Create div Element
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

formatMoney = (number) => '₦' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser); // To Add User
doubleBtn.addEventListener('click', doubleMoney); // To Double Money
sortBtn.addEventListener('click', sortByRichest); // To Sort By Richest
showMillionairesBtn.addEventListener('click', showMillionaires); // To Filter Show Millionaires
calculateWealthBtn.addEventListener('click', calculateWealth); // To Reduce Calculate Wealth
