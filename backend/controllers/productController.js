import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC`;

        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !image || price == null) {
        return res.status(400).json({ success: false, message: "name, price and image are required" });
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name, price, image)
            VALUES (${name}, ${price}, ${image})
            RETURNING *`;

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct[0],
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await sql`
            SELECT * FROM products
            WHERE id = ${id}`;

        if (!product || product.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: product[0] });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, price = ${price}, image = ${image}
            WHERE id = ${id}
            RETURNING *`;

        if (!updatedProduct || updatedProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        return res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await sql`
            DELETE FROM products
            WHERE id = ${id}
            RETURNING *`;

        if (!deletedProduct || deletedProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ success: true, message: "Product deleted successfully", data: deletedProduct[0] });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};