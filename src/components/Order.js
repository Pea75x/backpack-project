import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, postStatus } from '../api/bags';
import bagBody from '../media/bag-body.svg';
import BagImage from './BagImage';
import OrderStatus from './OrderStatus';
import { TiArrowBack } from 'react-icons/ti';
import { getLoggedInUserId } from '../api/auth';
import { isAdmin } from '../api/auth';

function Order() {
  const [order, setOrder] = React.useState(null);
  const [userId, setUserId] = React.useState(getLoggedInUserId());

  const { id } = useParams();
  const [update, setUpdate] = React.useState(false);
  const confirmOrder = {
    order_id: id,
    status: 'pending'
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const orderData = await getOrderById(id);
        setOrder(orderData);
      } catch (err) {
        console.log('order info error - ', err);
      }
    };
    getData();
  }, [update]);

  function purchaseOrder(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await postStatus(confirmOrder);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    setUpdate(!update);
  }

  console.log(order);
  return (
    <div>
      <Link to={isAdmin() ? `/customer-orders` : `/myorders/${userId}`}>
        <TiArrowBack className='back-button hover remove-link' />
      </Link>
      {order ? (
        <div className='order-page container'>
          {/* title */}
          <div className='order-title'>order no: {order.id}</div>
          {/* box with bag items */}
          <div className='orders-container'>
            {order.items.map((bag) => (
              <div key={bag.id} className='order-box'>
                <div className='order-images-container'>
                  <BagImage className='order-image' {...bag} />
                  <img className='order-image' src={bagBody} alt='bag body' />
                </div>
                <h2>Bag no: {bag.id}</h2>
                <h2>{bag.name}</h2>
              </div>
            ))}
          </div>
          {/* order details */}
          <div className='order-details'>
            <h2>Total items: {order.items.length}</h2>
            <h2>
              Order price:
              <span className='symbols'>
                £
                {order.items?.reduce((total, curr) => {
                  return total + parseFloat(curr.price);
                }, 0)}
              </span>
            </h2>
          </div>
          {/* order status */}
          {order.order_status.length > 0 ? (
            <OrderStatus {...order.order_status} />
          ) : (
            <div>
              <Link to={`/create/${id}`}>
                <button className='button hover order-button'>
                  Create new bag
                </button>
              </Link>
              <button
                className='button hover order-button'
                onClick={purchaseOrder}
              >
                Purchase Order
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='flex-center title'> loading...</div>
      )}
    </div>
  );
}

export default Order;
