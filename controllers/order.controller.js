const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

// Place order from cart
const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");  // ✅ make sure product info is available

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        const totalAmount = cart.items.reduce(
            (sum, item) => sum + (item.product.price * item.quantity),
            0
        );

        const order = new Order({
            user: req.user.id,
            items: cart.items,
            totalAmount // ✅ required field
        });

        await order.save();
        await Cart.findOneAndDelete({ user: req.user.id }); // clear cart

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
};


// Admin: Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

module.exports = { placeOrder, updateOrderStatus };
