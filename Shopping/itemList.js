import Item from "./item.js"

const main = document.querySelector(".itemList")

fetch('./itemList.json')
  .then(response => response.json())
  .then(data => {
      testPrint(data)
    });

function testPrint(data) {
    var lists = {}

    // Checks if array exists in dict
    for (let cat in data) if (!lists[cat]) lists[cat] = []

    // Store the keys in an array
    var keys = Object.keys(lists)

    // Loads the data into the dict/array
    keys.forEach(
        key => data[key].forEach(item => lists[key].push(
                new Item(item['name'],item['price'])))
    );

    // Sends item data to printItem
    keys.forEach(
        key => printItem(key,lists[key])
    )
}

function addItemToCart() {
    console.log("Hello");
}

function printItem(cat,items) {
    const newDiv = document.createElement("div")
    var str = `<div><h2>${cat}</h2><ul>`

    items.forEach((item, idx) => {
        str += `
        <li id="no${idx}">
            $${(item.price).toFixed(2)}  ${item.name}
            <button onclick="console.log(${item.name})">&#x2713</button>
            <button>&#x2715</button>
        </li>`
    });

// <button onclick="console.log(document.querySelector('#no${idx}').innerHTML)">&#x2713</button>
// <button onclick="console.log(document.querySelector(#${idx}).innerHTML)">&#x2713</button>

    str += `</ul></div>`
    newDiv.innerHTML = str
    main.append(newDiv)
}


// function addItemToCart(index) {
//     console.log(item);
// }

// function printItem(cat,items) {
//     const newDiv = document.createElement("div")
//     var str = `<div><h2>${cat}</h2><ul>`

//     items.forEach((item, index) => {
//         str += `
//         <li>
//             $${(item.price).toFixed(2)}  ${item.name}
//             <button onclick="addItemToCart(${index})">&#x2713</button>
//             <button>&#x2715</button>
//         </li>`
//     });

//     str += `</ul></div>`
//     newDiv.innerHTML = str
//     main.append(newDiv)
// }
