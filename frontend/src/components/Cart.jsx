import React, { useContext } from 'react';
import UserProgressContext from '../Store/UserProgressContext.jsx';
import CartContext from '../Store/CartContext.jsx';
import Modal from './UI/Modal.jsx';
import Button from './UI/Button.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
    const cartcontxt = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const CartTotal = cartcontxt.items.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
    }, 0);

    function handleGoToCheckout() {
        userProgressContext.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressContext.progress === 'cart'}>
            <h2>YOUR CART</h2>
            <ul>
                {cartcontxt.items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onClickAdd={() => cartcontxt.addItem(item)}
                        onClickDelete={() => cartcontxt.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">Total: ₹{Number(CartTotal).toFixed(2)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={userProgressContext.hideCart}>Close</Button>

                {cartcontxt.items.length > 0 && ( <Button onClick={handleGoToCheckout}>Checkout</Button>)}
 

            </p>
        </Modal>
    );
}
