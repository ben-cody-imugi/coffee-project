"use strict"

function renderCoffee(coffee) {
    let html = '<div class="col-12 col-md-6 col-lg-4 col-xl-3 d-flex py-1"><div class="coffee bg-primary p-2 text-light rounded m-auto d-flex align-items-end justify-content-between d-md-block">';
    html += `<h2 class="m-0">${coffee.name}</h2>`;
    html += `<p class="m-0">${coffee.roast}</p>`;
    html += '</div></div>';

    return html;
}

function renderCoffees(coffees) {
    coffees.sort(coffees.id);
    coffees.reverse();
    console.log(coffees)
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e, input) {
    e.preventDefault();
    const selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    if (input === undefined && roastSelection.value === "all") {
        filteredCoffees = [...coffees];
    } else if (input === undefined && roastSelection.value !== "all") {
        for (let i = 0; i < coffees.length; i++) {
            if (coffees[i].roast === roastSelection.value) {
                filteredCoffees.push(coffees[i]);
            }
        }
    } else if (input !== undefined && roastSelection.value === "all") {
        filteredCoffees = [...input];
    } else if (input !== undefined && roastSelection.value !== "all") {
        filteredCoffees = [...input];
    }
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees);
}

function updateInput(e) {
    e.preventDefault();
    const nameSelectorNew = nameSelector.value.toLowerCase()
    let currentRoast = [];
    if (nameSelectorNew === "") {
        coffees.forEach(coffee => {
            currentRoast.push(coffee);
        })
    } else {
        coffees.forEach(coffee => {
                if (coffee.name.toLowerCase().includes(nameSelectorNew)) {
                    currentRoast.push(coffee);
                }
            }
        )
    }
    updateCoffees(e, currentRoast);
}

function addCoffee(e, roast, name) {
    e.preventDefault();
    name = document.querySelector("#add-name-selector").value.toLowerCase();
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    name = nameCapitalized;
    roast = document.querySelector("#add-roast-selection").value;
    if (roast !== "all" && name !== "") {
        const newCoffee = {
            id: coffees.length + 1,
            name: name,
            roast: roast
        }
            coffees.unshift(newCoffee);
            updateCoffees(e, coffees);
    }
}

function submitTest(e) {
    e.preventDefault();
    console.log("submitted");
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

const coffeeDiv = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-selection');
const nameSelector = document.querySelector('#name-selector');
const addBtn = document.querySelector("#add button");
let roast = "";
let name = "";
document.getElementById("add").addEventListener('submit', addCoffee, false)


coffeeDiv.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener("change", updateCoffees);
nameSelector.addEventListener("input", updateInput);
addBtn.addEventListener("click", addCoffee);
document.querySelector("#add-name-selector").addEventListener("submit", submitTest);

