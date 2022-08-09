import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderByUser, createOrder } from '../api/bags';

function MyOrders() {
  const [orders, setOrders] = React.useState([]);
  const [newOrderInfo, setNewOrderInfo] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const customerOrderId = {
    customer_id: parseInt(id)
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const orderData = await getOrderByUser(id);
        setOrders(orderData);
      } catch (err) {
        console.log('order info error - ', err);
      }
    };
    getData();
  }, []);

  function newOrder(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        const data = await createOrder(customerOrderId);
        setNewOrderInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    navigate(`/order/${newOrderInfo.id}`);
  }
  function findLatestUpdate(orderstatus) {
    let latestStatus = orderstatus[0];
    orderstatus.forEach((o) => {
      if (o.id > latestStatus.id) {
        latestStatus = o;
      }
    });
    return latestStatus;
  }

  return (
    <div className='my-orders'>
      <h1 className='title'>my orders</h1>
      {orders.length > 0 ? (
        <div className='my-orders-box'>
          {orders.map((order) => (
            <div className='each-order'>
              <h1>{order.id}</h1>
              <h1>{order.created_date}</h1>
              <h1>
                {order.order_status.filter((orderstatus) => Math.max(order.))}
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className='my-orders-box'>You have no orders</h1>
        </div>
      )}
      <button className='button hover' onClick={newOrder}>
        Create New Order
      </button>
    </div>
  );
}

export default MyOrders;
