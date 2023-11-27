"use strict";

function renderCoffee(coffee) {
    let html = '<div class="col-12 col-md-6 col-lg-4 col-xl-3 d-flex py-1"><div class="coffee p-2 rounded m-auto d-flex align-items-end justify-content-between d-md-block">';
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

//---------updates displayed list by roast----------------
function updateRoast(e) {
    e.preventDefault();
    const currentRoast = roastSelection.value;
    let filteredCoffees = [];
    if (currentRoast === "all") {
        filteredCoffees = [...coffees];
    } else {
        coffees.forEach(coffee => {
            if (coffee.roast === currentRoast) {
                filteredCoffees.push(coffee);
            }
        })
    }
    if (nameSelection.value === "") {
        coffeeDiv.innerHTML = renderCoffees(filteredCoffees.sort(coffees.id).reverse());
    } else {
        updateName(e, filteredCoffees);
    }
}

// --------updates displayed list according to name--------
function updateName(e, roast) {
    e.preventDefault();
    const nameSelectionNew = nameSelection.value.toLowerCase()
    const currentRoast = roastSelection.value;
    let filteredCoffees = [];
    let coffeesByRoast = [];
    coffees.forEach(coffee => {
        if (coffee.roast === currentRoast) {
            coffeesByRoast.push(coffee);
        } else {
            coffeesByRoast.push(coffee);
        }
    });
    if (roast !== undefined) {
        roast.forEach(coffee => {
                if (coffee.name.toLowerCase().includes(nameSelectionNew)) {
                    filteredCoffees.push(coffee);
                }
            }
        )
        coffeeDiv.innerHTML = renderCoffees(filteredCoffees.sort(coffees.id).reverse());
    } else {
        coffeesByRoast.forEach(coffee => {
                if (coffee.name.toLowerCase().includes(nameSelectionNew)) {
                    filteredCoffees.push(coffee);
                }
            }
        )
        coffeeDiv.innerHTML = renderCoffees(filteredCoffees.sort(coffees.id).reverse());
    }
}

// ------------adds new coffee to list--------------------
    function createNewCoffee(e) {
        e.preventDefault();
        let name = document.querySelector("#add-name-selector").value.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        let roast = document.querySelector("#add-roast-selection").value;
        if (roast !== "all" && name !== "") {
            const newCoffee = {
                id: coffees.length + 1,
                name: name,
                roast: roast
            }
            coffees.unshift(newCoffee);
            coffeeDiv.innerHTML = renderCoffees(coffees.sort(coffees.id).reverse());
        } else {
            alert("Roast and name required.");
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
    const nameSelection = document.querySelector('#name-selector');
    const addBtn = document.querySelector("#add button");
    document.getElementById("add").addEventListener('submit', createNewCoffee, false)

    coffeeDiv.innerHTML = renderCoffees(coffees);

    roastSelection.addEventListener("change", updateRoast);
    nameSelection.addEventListener("input", updateName);
    addBtn.addEventListener("click", createNewCoffee);

