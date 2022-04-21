class Item {
    constructor(
        id,
        name,
        price,
        quantity,
        status = true,
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
    }
    updateName(name) {
        this.name = name;
    }
    updatePrice(price) {
        this.price = price;
    }
    updateQuantity(quantity) {
        this.quantity = quantity;
    }
    updateStatus(status) {
        this.status = status;
    }
}

export default Item;
