import { useState } from "react";

type Fields = {
    name: string;
    type: string;
    barcode: string;
    price: number;
    solde: number;
    supplier: string;
    image: string;
    stockName: string;
    quantity: number;
    city: string;
};

const useValidation = () => {
    const validateFields = (fields: Fields) => {
        let errors: { [key: string]: string } = {};

        const { name, type, barcode, price, solde, supplier, image, stockName, quantity, city } = fields;

        if (!name.trim()) errors.name = "Name is required.";
        if (!type.trim()) errors.type = "Type is required.";
        if (!barcode.trim()) errors.barcode = "Barcode is required.";
        if (!price) errors.price = "Price is required.";
        if (!solde) errors.solde = "Solde is required.";
        if (!supplier.trim()) errors.supplier = "Supplier is required.";
        if (!image.trim()) errors.image = "Image is required.";
        if (!stockName.trim()) errors.stockName = "Stock name is required.";
        if (!quantity) errors.quantity = "Quantity is required.";
        if (!city.trim()) errors.city = "City is required.";

        if (isNaN(price) || price <= 0) errors.price = "Price must be a positive number.";
        if (isNaN(solde) || solde < 0) errors.solde = "Solde must be a non-negative number.";
        if (isNaN(quantity) || quantity < 0) errors.quantity = "Quantity must be a non-negative number.";

        if (!/^\d+$/.test(barcode)) errors.barcode = "Barcode must contain only numbers.";
        if (!/\.(jpg|jpeg|png)$/i.test(image)) errors.image = "Image must be a valid file (jpg, jpeg, png).";

        return errors;
    };

    return { validateFields };
};

export default useValidation;