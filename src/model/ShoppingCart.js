import _ from "lodash";
import Order from "./Order.js";

export default class ShoppingCart {
    constructor(customer, products) {
        this.customer = customer;
        this.products = products;
    };

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (product) => {
        _.remove(this.products, product);
    };

    checkout = () => {
        let totalPrice = 0;
        let loyaltyPointsEarned = 0;
        let amountOfProducts = 0;
        let bulkProducts = []

        this.products.forEach(product => {
            let discount = 0;
            if (product.code.startsWith("BULK_BUY_2_GET_1")) {
                bulkProducts.push(product);
                
            } else {
                if (product.code.startsWith("DIS_10")) {
                    discount = product.price * 0.1;
                    loyaltyPointsEarned += product.price / 10;
                } else if (product.code.startsWith("DIS_15")) {
                    discount = product.price * 0.15;
                    loyaltyPointsEarned += product.price / 15;
                } else {
                    loyaltyPointsEarned += product.price / 5;
                }
    
                totalPrice += product.price - discount;
            }
        });

        amountOfProducts = Math.ceil(bulkProducts.length / 3 * 2);
        console.log('>>>>> ', bulkProducts.indexOf(0));
        totalPrice += amountOfProducts * bulkProducts[0].price;

        if(totalPrice >= 500){
            totalPrice = totalPrice * 0.95;
        }

        return new Order(totalPrice, loyaltyPointsEarned);
    
    };

    displaySummary = () =>  {
        return "Customer: " + this.customer.name + "\n" + 
            "Bought:  \n" + this.products.map(p => "- " + p.name + ", " + p.price).join('\n');
    }
};
