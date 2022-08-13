import React from 'react';
import bag from '../media/bag-body.svg';
import { getProductByPart } from '../api/products';
import { postBag } from '../api/bags';
import { useNavigate, useParams } from 'react-router-dom';

function BagFactory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [partName, setPartName] = React.useState('');
  const [textColor, setTextColor] = React.useState('');
  const [partInfo, setPartInfo] = React.useState(null);
  const [newBag, setNewBag] = React.useState({
    order_id: id,
    front: '',
    top: '',
    bottom: '',
    strap: '',
    side_strap: '',
    lining: '',
    zip: '',
    heart: '',
    pocket: '',
    clasps: '',
    name: '',
    price: 30
  });

  const [parts, setParts] = React.useState([
    { name: 'Front', code: 'front' },
    { name: 'Top', code: 'top' },
    { name: 'Bottom', code: 'bottom' },
    { name: 'Strap', code: 'strap' },
    { name: 'Side Strap', code: 'side_strap' },
    { name: 'Lining', code: 'lining' },
    { name: 'Zip', code: 'zip' },
    { name: 'Heart', code: 'heart' },
    { name: 'Pocket', code: 'pocket' },
    { name: 'Clasps', code: 'clasps' }
  ]);

  function clickPart(part) {
    const getData = async () => {
      try {
        const data = await getProductByPart(part);
        setPartInfo(data);
        setPartName(part);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }

  function fabricChange(part) {
    const index = parts.findIndex((element) => element.code == part.part);
    // change image on webpage
    const newArray = [...parts];
    newArray[index].image = part.image;
    setParts(newArray);
    // Add to newBag object
    setNewBag({ ...newBag, [part.part]: part.id });
  }

  function addName(event) {
    setNewBag({ ...newBag, name: event.target.value });
  }

  function createBag(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await postBag(newBag);
        navigate(`/order/${id}`);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }

  function changeTextColor(event) {
    setTextColor(event.target.value);
  }

  console.log('part info: ', partInfo);
  console.log('new Bag: ', newBag);

  return (
    <div className='container'>
      <p className='factory-title'>Bag Factory</p>
      <div className='box flex-center'>
        <div className='bag-images'>
          {/* chose fabric icons */}
          {parts.map((part) => (
            <div
              key={part.name}
              className={`moving-box flex-center hover ${
                part.image ? 'done' : 'notDone'
              } ${partName == part.code ? 'clicked-part' : 'not-clicked'}`}
              id={part.code}
              onClick={() => clickPart(part.code)}
            >
              <p className='text'>{part.name}</p>
              {partName == part.code ? (
                <div className='flex-center moving-box-circle-container'>
                  {partInfo.map((part) => (
                    <img
                      key={part.name}
                      src={part.fabric.image}
                      className='fabric-circle hover'
                      alt={part.fabric.name}
                      onClick={() => fabricChange(part)}
                    />
                  ))}
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          ))}

          {/* BAG DIAGRAM IMAGES */}
          {parts.map((part) =>
            part.image ? (
              <img src={part.image} alt={part.name} className='bag-part' />
            ) : (
              <div></div>
            )
          )}
          <p className={`name-text ${textColor}`}>{newBag.name}</p>
          <img src={bag} alt='bag' className='bag-part' />
        </div>
        {/* FINAL TOUCHES BOX */}
        <div className='final-touches'>
          <div className='flex-center add-name'>
            <h3 className='text'>Add a name (optional):</h3>
            <input onChange={addName} className='input-textbox' />
            <div className='radio-buttons'>
              <div>
                <input
                  type='radio'
                  id='black'
                  name='font-color'
                  value='black'
                  onChange={changeTextColor}
                />
                <label for='black'>black</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='white'
                  name='font-color'
                  value='white'
                  onChange={changeTextColor}
                />
                <label for='white'>White</label>
              </div>
            </div>
          </div>
          <button className='button hover' onClick={createBag}>
            Create!
          </button>
        </div>
      </div>
    </div>
  );
}

export default BagFactory;
