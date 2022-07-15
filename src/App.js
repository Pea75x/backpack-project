import './App.css';
import bag from './media/bag-body.svg';
import purpleCordLining from './media/lining/lining-purple-cord.png';
import heart from './media/heart-tqscales.png';
import bottom from './media/bottom-tqscales.png';
import front from './media/front-tqscales.png';
import lining from './media/lining-tqscales.png';
import pocket from './media/pocket-tqscales.png';
import strap from './media/strap-tqscales.png';
import top from './media/top-tqscales.png';
import zip from './media/zip-tq.png';
import sidestrap from './media/sidestrap-tqscales.png';
import dring from './media/Dring-darksilver.png';

function App() {
  return (
    <div className='App'>
      <p>Hey girl how you doing</p>
      <div className='box'>
        <div className='bag-images'>
          <img src={lining} alt='lining' className='bag-part' />
          <img src={heart} alt='heart' className='bag-part' />
          <img src={bottom} alt='bottom' className='bag-part' />
          <img src={front} alt='front' className='bag-part' />
          <img src={pocket} alt='pocket' className='bag-part' />
          <img src={strap} alt='strap' className='bag-part' />
          <img src={top} alt='top' className='bag-part' />
          <img src={zip} alt='zip' className='bag-part' />
          <img src={sidestrap} alt='zip' className='bag-part' />
          <img src={dring} alt='zip' className='bag-part' />
          <img src={bag} alt='bag' className='bag-part' />
        </div>
      </div>
    </div>
  );
}

export default App;
