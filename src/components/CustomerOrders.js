import React from 'react';
import { getOrders, postStatus } from '../api/bags';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';

const updateTemplate = {
  order_id: '',
  status: ''
};

function CustomerOrders() {
  const [allOrders, setAllOrders] = React.useState([]);
  const [filteredOrders, setFilteredOrders] = React.useState('clicktoview');
  const [update, setUpdate] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState('pending');
  const [nextStatus, setNextStatus] = React.useState(null);
  const [createUpdate, setCreateUpdate] = React.useState(updateTemplate);

  const status = [
    'pending',
    'confirmed',
    'making',
    'created',
    'dispatched',
    'delivered'
  ];

  React.useEffect(() => {
    const getData = async () => {
      try {
        const orderData = await getOrders();
        setAllOrders(orderData);
      } catch (err) {
        console.log('order info error - ', err);
      }
    };
    getData();
  }, [update]);

  function filterOrderByStatus(statusUpdate) {
    // get the name of the NEXT update to come
    const updateIndex = status.indexOf(statusUpdate) + 1;
    setNextStatus(status[updateIndex]);
    setCurrentStatus(statusUpdate);

    const ordersByStatus = [];
    const orderByNextStatus = [];

    // get all orders with the status
    allOrders.map(function (order) {
      if (
        order.order_status.filter((orderStatus) =>
          orderStatus.status.includes(statusUpdate)
        ).length > 0
      ) {
        ordersByStatus.push(order);
      }
    });
    // get all orders with the next status
    allOrders.map(function (order) {
      if (
        order.order_status.filter((orderStatus) =>
          orderStatus.status.includes(status[updateIndex])
        ).length > 0
      ) {
        orderByNextStatus.push(order);
      }
    });
    // get rid of those orders that have the next status too
    const array3 = ordersByStatus.filter(function (obj) {
      return orderByNextStatus.indexOf(obj) == -1;
    });
    setFilteredOrders(array3);
  }

  function clickOnOrder(status, orderId) {
    setCreateUpdate({
      ...createUpdate,
      order_id: orderId,
      status: status
    });
  }

  function postUpdate() {
    const getData = async () => {
      try {
        await postStatus(createUpdate);
        await setUpdate(!update);
        filterOrderByStatus(currentStatus);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }

  console.log('filtered orders', filteredOrders);

  return (
    <div className='background'>
      <div className='container overflow-container'>
        <h1 className='title'>Customer orders</h1>

        {filteredOrders ? (
          <Tabs className='order-tab-container'>
            <TabList className='order-tabs'>
              {status.map((update) => (
                <Tab
                  onClick={() => filterOrderByStatus(update)}
                  className='each-order-tab'
                >
                  {update}
                </Tab>
              ))}
            </TabList>
            <div className='tab-panel-background'>
              {status.map((update) => (
                <TabPanel className='tab-panel'>
                  {filteredOrders != 'clicktoview' ? (
                    filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className='customer-order-details hover'
                        onClick={() => clickOnOrder(nextStatus, order.id)}
                      >
                        <p>order no. {order.id}</p>
                        <p>items: {order.items.length}</p>
                        {nextStatus && createUpdate.order_id == order.id ? (
                          <button
                            className='small-button'
                            onClick={postUpdate}

                            // onClick={sendNewUpdate}
                          >
                            send to {nextStatus}
                          </button>
                        ) : (
                          <Link to={`/order/${order.id}`}>
                            <button className='small-button'>View Order</button>
                          </Link>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className='clicktoview flex-center'>
                      <p>Please click on a status to view orders</p>
                    </div>
                  )}
                </TabPanel>
              ))}
            </div>
          </Tabs>
        ) : (
          <div className='title'>loading..</div>
        )}
      </div>
    </div>
  );
}

export default CustomerOrders;
