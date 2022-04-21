import Item from "./item.js"

const main = document.querySelector(".itemList")
const cart = document.querySelector("#cart")
let manualEntry = 100;

fetch('./itemList.json')
  .then(response => response.json())
  .then(data => {
      dataToItem(data)
    });

function dataToItem(data) {
    var lists = {}

    // Checks if array exists in dict
    for (let cat in data) if (!lists[cat]) lists[cat] = []

    // Store the keys in an array
    var keys = Object.keys(lists)

    // Loads the data into the dict/array
    keys.forEach(
        key => data[key].forEach(item => lists[key].push(
                new Item(item['id'],item['name'],(item['price']).toFixed(2),item['quantity'])))
    );

    // Sends item data to printItem
    keys.forEach(
        key => printItem(key,lists[key])
    )
}

function printItem(cat,items) {
    const newDiv = document.createElement("div")
    var str = `<div><h2 id=${cat}>${cat}</h2><ul>`;

    if (cat != "MISC") {
        items.forEach(item => {
            const meti = JSON.stringify(item)
            str += stringMe(item)
        })
        str += `</ul></div>`;
        newDiv.innerHTML = str;
        main.append(newDiv);;
    } else {
        const exists = document.getElementById("MISC")
        const meti = JSON.stringify(items)

        if (exists == null) {
            str += stringMe(items)
            str += `</ul></div>`;
            newDiv.innerHTML = str;
            main.append(newDiv);
        } else {
            const parent = document.getElementById(`${items.name}`)
            try {
                if (parent.getAttribute('id') != items.name) {
                    var node = document.createElement('ul')
                    node.innerHTML = stringMe(items)
                    exists.parentElement.appendChild(node)
                } else {
                    var quantity = parent.children[2].innerHTML
                    quantity = parseInt(quantity) + parseInt(items.quantity)
                    parent.children[2].innerHTML = quantity
                }
            } catch (e) {
                var node = document.createElement('ul')
                node.innerHTML = stringMe(items)
                exists.parentElement.appendChild(node)
            }
        }
    }
};

function stringMe(item) {
    const meti = JSON.stringify(item)
    return (`
    <li id="${item.name}">
        <p id="price">$${item.price}</p>
        <p id="name" >${item.name}</p>
        <p id="quantity">${item.quantity}</p>
        <button onclick='addItemToCart(${meti})'>+</button>
    </li>`)
}

function addItemToCart(item) {
    const meti = JSON.stringify(item)
    const newDiv = document.createElement("div")
    newDiv.setAttribute('id', `ID${item.id}`);

    const children = Array.from(cart.children)

    const ids = children.map(child => {return child.id});
    const itemID = `ID${item.id}`

    if (!ids.includes(itemID)) {
        let str = `<p id="name">${item.name}</p>
            <p id="price">$${item.price}x</p>
            <p id="quantity">${0}</p>
            <p id="total">$${0}</p>
            <button onclick='cartRemoveItem(${meti})'>&#x2012</button>
            <button onclick='addItemToCart(${meti})'>+</button>
            <p>Bought?</p>
            <button id="bought" onclick='bought(${meti})'>&#x2714</button>`
        newDiv.innerHTML = str
        cart.append(newDiv)
    }
    cartAddItem(item)
}

function cartAddItem(item) {
    const parent = document.getElementById(`ID${item.id}`)
    const details = parent.children

    var number = details[2].innerHTML
    number++
    details[2].innerHTML = number

    const list = document.getElementById(`${item.name}`)
    const child = list.children
    var quantity = child[2].innerHTML

    if (quantity > 0) {
        quantity--
        child[2].innerHTML = quantity
        totalPrice(details)
        if (quantity == 0) {
            list.style.opacity = 0.5
            list.children[3].disabled = true
            details[5].disabled = true
        }
    }
}

function cartRemoveItem(item) {
    const parent = document.getElementById(`ID${item.id}`)
    const details = parent.children

    // Cart item 
    var number = details[2].innerHTML
    number--
    details[2].innerHTML = number

    // Shopping item
    const list = document.getElementById(`${item.name}`)
    const child = list.children
    var quantity = child[2].innerHTML

    quantity++
    child[2].innerHTML = quantity

    totalPrice(details)

    if (number == 0) parent.remove()
    
    if (quantity != 0) {
        list.style.opacity = 1
        list.children[3].disabled = false
        details[5].disabled = false
    }
}

function bought(item) {
    const parent = document.getElementById(`ID${item.id}`)
    const details = parent.children
    const p = parent.getElementsByTagName('p')
    const bought = details[7]
    
    if (bought.innerHTML == "✔") {
        bought.innerHTML = 'x'
        for (let i = 0; i < p.length; i++) {
            p[i].style.setProperty("text-decoration", "line-through")
        }
        details[4].disabled = true
        details[5].disabled = true
    } else {
        bought.innerHTML = "✔"
        for (let i = 0; i < p.length; i++) {
            p[i].style.setProperty("text-decoration", "none")
        }
        details[4].disabled = false
        details[5].disabled = false
    }    
}

function totalPrice(details) {
    var price = details[1].innerHTML
    price = price.slice(1,price.length-1)
    var amount = details[2].innerHTML

    var total = parseFloat(price) * parseFloat(amount)
    details[3].innerHTML = total.toFixed(2)
    overallPrice()
}

function overallPrice() {
    const parent = document.getElementById("cart")
    const children = Array.from(parent.children)
    const ids = children.map(child => {return child.id});
    var total = 0
    
    ids.forEach(id => {
        if (!(id == "")) {
            const f = Array.from(document.getElementById(id).getElementsByTagName('p'))
            total += Number(f[3].innerHTML)
        }
    })
    
    const cost = document.getElementById("overallCost")
    cost.innerHTML = `$${total}`
    
}

const a = document.getElementById("submit")
a.onclick = function() {
    const name = document.getElementById("itemName").value;
    const price = document.getElementById("itemPrice").value;
    const quantity = document.getElementById("itemQuantity").value;

    if (!(name.length == 0 
        || price.length == 0 
        || quantity.length == 0 
        || isNaN(parseFloat(price))
        || isNaN(parseInt(quantity)))) {
        const item = new Item(`ID${manualEntry}`, name, parseFloat(price).toFixed(2), quantity)
        printItem("MISC",item)
    }
}

// This needs to be included to load the respective function
window.addItemToCart = addItemToCart;
window.cartRemoveItem = cartRemoveItem;
window.bought = bought;
