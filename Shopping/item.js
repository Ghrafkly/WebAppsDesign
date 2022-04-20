class Item {
    constructor(
        name,
        price,
        quantity,
        status = true,
    )
    {
        this.name = name;
        this.price = price;
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
