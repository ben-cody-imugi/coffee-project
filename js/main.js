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
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffeesAdd(e, input) {
    e.preventDefault();
    let filteredCoffees = [];
        input.forEach(coffee => {
                filteredCoffees.push(coffee);
        });
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees.sort(coffees.id).reverse());
}

function updateCoffeesSearch(e, input) {
    e.preventDefault();
    const selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    if (nameSelector.value === "" && roastSelection.value === "all")  {
        filteredCoffees = [...coffees];
                console.log("no input, roast all");
    }
    if (nameSelector.value === "" && roastSelection.value !== "all") {
        for (let i = 0; i < coffees.length; i++) {
            if (coffees[i].roast === roastSelection.value) {
                filteredCoffees.push(coffees[i]);
                console.log("no input, roast selected");
            }
        }
    } else if (input !== undefined && roastSelection.value === "all") {
        filteredCoffees = [...input];
        console.log("input defined, roast all")
    } else if (input !== undefined && roastSelection.value !== "all") {
        input.forEach(coffee => {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
                console.log("input defined, roast selected")
            }
        });
    }
    coffeeDiv.innerHTML = renderCoffees(filteredCoffees.sort(coffees.id).reverse());
}

function updateInput(e) {
    e.preventDefault();
    const nameSelectorNew = nameSelector.value.toLowerCase()
    let filteredCoffees = [];
    if (nameSelectorNew === "") {
        coffees.forEach(coffee => {
            filteredCoffees.push(coffee);
        })
    } else {
        coffees.forEach(coffee => {
                if (coffee.name.toLowerCase().includes(nameSelectorNew)) {
                    filteredCoffees.push(coffee);
                }
            }
        )
    }
    updateCoffeesSearch(e, filteredCoffees);
}

function addCoffee(e, roast, name) {
    e.preventDefault();
    name = document.querySelector("#add-name-selector").value.toLowerCase();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    roast = document.querySelector("#add-roast-selection").value;
    if (roast !== "all" && name !== "") {
        const newCoffee = {
            id: coffees.length + 1,
            name: name,
            roast: roast
        }
        coffees.unshift(newCoffee);
        updateCoffeesAdd(e, coffees);
    }
    document.querySelector("#add-name-selector").value = "";
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
const roastSelectionAdd = document.querySelector('#add-roast-selection');
const nameSelector = document.querySelector('#name-selector');
const nameSelectorAdd = document.querySelector('#add-name-selector');
const addBtn = document.querySelector("#add button");
let roast = "";
let name = "";
document.getElementById("add").addEventListener('submit', addCoffee, false)


coffeeDiv.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener("change", updateCoffeesSearch);
nameSelector.addEventListener("input", updateInput);
addBtn.addEventListener("click", addCoffee);

