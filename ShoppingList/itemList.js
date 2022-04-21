// import Item from "./item.js"

// const main = document.querySelector(".itemList")
// const cart = document.querySelector("#cart")

// fetch('./itemList.json')
//   .then(response => response.json())
//   .then(data => {
//       testPrint(data)
//     });

// function testPrint(data) {
//     var lists = {}

//     // Checks if array exists in dict
//     for (let cat in data) if (!lists[cat]) lists[cat] = []

//     // Store the keys in an array
//     var keys = Object.keys(lists)

//     // Loads the data into the dict/array
//     keys.forEach(
//         key => data[key].forEach(item => lists[key].push(
//                 new Item(item['id'],item['name'],(item['price']).toFixed(2),item['quantity'])))
//     );

//     // Sends item data to printItem
//     keys.forEach(
//         key => printItem(key,lists[key])
//     )
// }

// function printItem(cat,items) {
//     const newDiv = document.createElement("div")
//     var str = `<div><h2 id=${cat}>${cat}</h2><ul>`;

    

//     items.forEach(item => {
//         const meti = JSON.stringify(item)
//         str += `
//         <li id="${item.name}">
//             <p id="price">$${item.price}</p>
//             <p id="name" >${item.name}</p>
//             <p id="quantity">${item.quantity}</p>
//             <button onclick='addItemToCart(${meti})'>+</button>
//         </li>`
//     });

    
//     str += `</ul></div>`;
//     newDiv.innerHTML = str;
//     main.append(newDiv);
// };

// function addItemToCart(item) {
//     const meti = JSON.stringify(item)
//     const newDiv = document.createElement("div")
//     newDiv.setAttribute('id', `ID${item.id}`);

//     const children = Array.from(cart.children)

//     const ids = children.map(child => {return child.id});
//     const itemID = `ID${item.id}`

//     if (!ids.includes(itemID)) {
//         let str = `<p id="name">${item.name}</p>
//             <p id="price">$${item.price}</p>
//             <p id="quantity">${0}</p>
//             <button onclick='cartRemoveItem(${meti})'>&#x2012</button>
//             <button onclick='addItemToCart(${meti})'>+</button>`
//         newDiv.innerHTML = str
//         cart.append(newDiv)
//     }

//     cartAddItem(item)
// }

// function cartAddItem(item) {
//     const parent = document.getElementById(`ID${item.id}`)
//     const details = parent.children

//     var number = details[2].innerHTML
//     number++
//     details[2].innerHTML = number

//     const list = document.getElementById(`${item.name}`)
//     const child = list.children
//     var quantity = child[2].innerHTML

//     if (quantity > 0) {
//         quantity--
//         child[2].innerHTML = quantity
//         if (quantity == 0) {
//             list.style.opacity = 0.5
//             list.children[3].disabled = true
//             details[4].disabled = true
//         }
//     }
// }

// function cartRemoveItem(item) {
//     const parent = document.getElementById(`ID${item.id}`)
//     const details = parent.children

//     // Cart item 
//     var number = details[2].innerHTML
//     number--
//     details[2].innerHTML = number

//     // Shopping item
//     const list = document.getElementById(`${item.name}`)
//     const child = list.children
//     var quantity = child[2].innerHTML

//     quantity++
//     child[2].innerHTML = quantity

//     if (number == 0) parent.remove()
    
//     if (quantity != 0) {
//         list.style.opacity = 1
//         list.children[3].disabled = false
//         details[4].disabled = false
//     }
// }

// window.addItemToCart = addItemToCart;
// window.cartRemoveItem = cartRemoveItem;
