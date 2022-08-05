import React from 'react';

function BagImage(bag) {
  return (
    <div>
      <img className='order-image' src={bag.front.image} alt={bag.front.part} />
      <img className='order-image' src={bag.top.image} alt={bag.top.part} />
      <img
        className='order-image'
        src={bag.bottom.image}
        alt={bag.bottom.part}
      />
      <img className='order-image' src={bag.strap.image} alt={bag.strap.part} />
      <img
        className='order-image'
        src={bag.side_strap.image}
        alt={bag.side_strap.part}
      />
      <img
        className='order-image'
        src={bag.lining.image}
        alt={bag.lining.part}
      />
      <img className='order-image' src={bag.zip.image} alt={bag.zip.part} />
      <img className='order-image' src={bag.heart.image} alt={bag.heart.part} />
      <img
        className='order-image'
        src={bag.pocket.image}
        alt={bag.pocket.part}
      />
      <img
        className='order-image'
        src={bag.clasps.image}
        alt={bag.clasps.part}
      />
    </div>
  );
}

export default BagImage;
