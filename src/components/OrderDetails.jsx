import React from 'react'

const OrderDetails = ({order, confirmOrder}) => {
  return (
    <div data-cy="order-details">
      <h3>Your order</h3>
      <ul data-cy="order-items">
        {order.items.map(item => {
          return (
            <li key={item.id}>
              {item.name}
            </li>
          )
        })}

      </ul>
      <button
        // data-order_id = {order.id}
        onClick={() => confirmOrder()}
      >
        Confirm
        </button>
    </div>
  )
}

export default OrderDetails
