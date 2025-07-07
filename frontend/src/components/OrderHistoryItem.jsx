

export default function OrderHistoryItem({order}) {
    let sum=order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (
        <li className="order-history-item">
            <h2>Order #{order.id}</h2>
            <p>Total Amount: ₹{sum}</p>
            <ul>
                {order.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - ₹{item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
        </li>
    );

}