import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderByUser, createOrder } from '../api/bags';
import dateFormat from 'dateformat';
import bag from '../media/bag-body.svg';

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
        await setNewOrderInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData().then(navigate(`/order/${newOrderInfo.id}`));
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
    <div className='container'>
      <h1 className='title'>my orders</h1>
      {orders.length > 0 ? (
        <div className='my-orders-box'>
          {orders.map((order) => (
            <Link to={`/order/${order.id}`} className='each-order'>
              <h1 className='text'>order no. {order.id}</h1>
              <img src={bag} alt='bag' width='100px' />
              <h1 className='text'>
                {dateFormat(order.created_date, 'dddd, mmmm dS')}
              </h1>
              {order.order_status.length ? (
                <h1 className='text order-complete'>Order Complete</h1>
              ) : (
                <h1 className='text order-complete'>Incomplete order</h1>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className='my-orders-box'>
          <h1 className='no-orders'>You have no orders</h1>
        </div>
      )}
      <button className='button hover my-orders-button' onClick={newOrder}>
        Create New Order
      </button>
    </div>
  );
}

export default MyOrders;
