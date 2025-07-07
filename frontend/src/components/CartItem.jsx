import Button from "./UI/Button";

export default function CartItem({ item, onClickAdd, onClickDelete }) {
    return (
        <li className="cart-item">
            <p>
                {item.name} - {item.quantity} x ₹{item.price}
            </p>
            <div className="cart-item-actions">
  <Button onClick={onClickAdd}>+</Button>
  <span>{item.quantity}</span>
  <Button onClick={onClickDelete}>-</Button>
</div>
        </li>
    );
}
