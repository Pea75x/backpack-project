import React from 'react';
import dateFormat from 'dateformat';

function OrderStatus(orderStatus) {
  const status = [
    'pending',
    'confirmed',
    'making',
    'created',
    'dispatched',
    'delivered'
  ];

  const orderStatusArray = Object.entries(orderStatus);

  function isStatus(update) {
    const answer = orderStatusArray.filter(
      (status) => status[1].status == update
    );
    return answer;
  }

  return (
    <div>
      <div className='order-status-border'></div>
      <div className='order-status-box'>
        <div className='status-meter-end left-end' id='complete'></div>
        {status.map((update) => (
          <div className='each-status'>
            <div
              className='status-meter center'
              id={isStatus(update).length > 0 ? 'complete' : 'not-complete'}
            ></div>
            {isStatus(update).length > 0 ? (
              <div>
                <h2 className='text'>{update}</h2>
                <div>
                  {dateFormat(
                    isStatus(update)[0][1].created_date,
                    'dddd, mmmm dS'
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        <div
          className='status-meter-end right-end'
          id={isStatus('delivered').length ? 'complete' : 'not-complete'}
        ></div>
      </div>
    </div>
  );
}

export default OrderStatus;
