import React from 'react';
import bag from '../media/bag-body.svg';

function Test() {
  let gridArray = [];
  function grid(number) {
    for (let i = 0; i < number; i++) {
      gridArray.push(i);
    }
  }
  grid(900);
  const pocket = [
    68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 98, 99, 100,
    101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 128, 129,
    140, 141, 142, 143, 173, 158
  ];

  function clickTest(cell) {
    // console.log(cell);
    if (pocket.includes(cell)) {
      console.log('pocket');
    }
  }

  return (
    <div className='container'>
      <img src={bag} alt='bag' className='bag-part' />
      <div className='grid'>
        {gridArray.map((cell) => (
          <div className='cell' onClick={() => clickTest(cell)}></div>
        ))}
      </div>
    </div>
  );
}

export default Test;
