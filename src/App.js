import './App.css';
import bag from './media/bag.svg';
import lining from './media/lining.svg';
import heart from './media/heart/blue-heart.png';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Hey girl how you doing</p>
        <div className='box'>
          <div className='bag-images column'>
            <img src={bag} alt='bag' className='bag-body ' />
            <img src={lining} alt='lining' className='lining' />
            <img src={heart} alt='heart' className='heart' />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
