import React from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../api/bags';
import bagBody from '../media/bag-body.svg';
import BagImage from './BagImage';
import OrderStatus from './OrderStatus';

function Order() {
  const [order, setOrder] = React.useState(null);
  const { id } = useParams();

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
  }, []);

  console.log(order);
  return (
    <div className='background'>
      {order ? (
        <div className='order-page container'>
          {/* title */}
          <div className='title'>order no: {order.id}</div>
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
          <div>
            <h2>Total items: {order.items.length}</h2>
            <h2>
              Order price: <span className='symbols'>£</span>
              {order.items?.reduce((total, curr) => {
                return total + parseFloat(curr.price);
              }, 0)}
            </h2>
          </div>
          {/* order status */}
          {order.order_status.length > 0 ? (
            <OrderStatus {...order.order_status} />
          ) : (
            <button>PURCHASE ORDER</button>
          )}
        </div>
      ) : (
        <div className='flex-center title'> loading...</div>
      )}
    </div>
  );
}

export default Order;
