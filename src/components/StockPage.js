import React from 'react';
import { getFabrics, postFabrics } from '../api/products';
import { Link } from 'react-router-dom';

function StockPage() {
  const [fabrics, setFabrics] = React.useState(null);
  const blankFabric = {
    name: '',
    image: ''
  };
  const [newFabric, setNewFabric] = React.useState(blankFabric);
  const [imageUpload, setImageUpload] = React.useState('Upload an image');
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      const fabricData = await getFabrics();
      setFabrics(fabricData);
    };
    getData();
  }, [update]);

  function handleChange(event) {
    setNewFabric({ ...newFabric, name: event.target.value });
  }

  const handleUpload = (event) => {
    event.preventDefault();

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'pea75x',
          uploadPreset: 'backpack',
          cropping: false
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          setNewFabric({ ...newFabric, image: result.info.secure_url });
          setImageUpload('Successfully Uploaded!');
        }
      )
      .open();
  };

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await postFabrics(newFabric);
        setNewFabric(blankFabric);
        setImageUpload('upload an image');
        setUpdate(!update);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }

  if (fabrics) {
    return (
      <div className='stock-page flex-center'>
        <h1 className='title'>Fabric</h1>
        <div className='fabric-box'>
          <h2>All fabric</h2>
          <div className='fabric-rows flex-center'>
            {fabrics.map((fabric) => (
              <Link key={fabric.id} to={`/fabric/${fabric.id}`}>
                <img
                  key={fabric.id}
                  src={fabric.image}
                  alt={fabric.name}
                  className='fabric-square'
                />
              </Link>
            ))}
          </div>
        </div>
        <div className='fabric-box'>
          <h2>Add new fabric</h2>
          <form className='fabric-form flex-center' onSubmit={handleSubmit}>
            <input
              placeholder='Name'
              name='name'
              onChange={handleChange}
              value={newFabric.name}
              className='fabric-input'
            />
            <button
              onClick={handleUpload}
              className='small-button hover fabric-input'
            >
              {imageUpload}
            </button>
            <button
              type='submit'
              className='fabric-input small-button hover fabric-submit'
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    <p>LOADING</p>;
  }
}

export default StockPage;
