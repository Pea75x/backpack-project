import React from 'react';
import { useParams } from 'react-router-dom';
import {
  getFabricById,
  getProductByFabric,
  postProduct
} from '../api/products';
import bag from '../media/bag-body.svg';
import bottom from '../media/bottom.png';
import top from '../media/top.png';
import front from '../media/front.png';

function Products() {
  const { id } = useParams();

  const blankProduct = {
    name: '',
    fabric: '',
    part: '',
    quantity: 0
  };
  const [fabric, setFabric] = React.useState(null);
  const [products, setProducts] = React.useState(null);
  const [newProduct, setNewProduct] = React.useState(blankProduct);
  const [create, setCreate] = React.useState(null);
  const [update, setUpdate] = React.useState(false);
  const [bagImage, setBagImage] = React.useState(null);

  const parts = [
    'front',
    'top',
    'bottom',
    'strap',
    'lining',
    'zip',
    'heart',
    'pocket',
    'clasps',
    'side_strap'
  ];

  React.useEffect(() => {
    const getData = async () => {
      try {
        const productData = await getProductByFabric(id);
        const fabricData = await getFabricById(id);
        setFabric(fabricData);
        setProducts(productData);
      } catch (err) {
        console.log('products error - ', err);
      }
    };
    getData();
  }, [update]);

  function partQuantity(part) {
    const fabricPart = products.filter((product) => product.part === part);

    if (fabricPart.length > 0) {
      return fabricPart[0].quantity;
    } else {
      return 0;
    }
  }

  function editPart(part) {
    if (findImage(part)) {
      setCreate(false);
      const partInfo = products.filter((product) => product.part === part)[0];
      setNewProduct({
        ...blankProduct,
        id: partInfo.id,
        name: partInfo.name
      });
      setBagImage(part);
    } else {
      setCreate(true);
      setNewProduct({
        ...blankProduct,
        name: ` ${part} - ${fabric.name}`,
        part: part,
        fabric: id
      });
    }
  }

  function handleChange(event) {
    setNewProduct({ ...newProduct, quantity: parseInt(event.target.value) });
  }
  function findImage(part) {
    const item = products.filter((product) => product.part === part)[0];
    if (item) {
      return item.image;
    }
  }
  function imageUpload(event) {
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
          setNewProduct({ ...newProduct, image: result.info.secure_url });
        }
      )
      .open();
  }

  function submitCreate(event) {
    event.preventDefault();
    const getData = async () => {
      try {
        await postProduct(newProduct);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    setNewProduct(blankProduct);
    setUpdate(!update);
  }

  return (
    <div className='products-page'>
      {!fabric ? <h1>Loading...</h1> : <h1>{fabric.name}</h1>}
      <div className='products-box flex-center'>
        <div className='product-table'>
          <div className='product-contents title'>
            <p className='column'>Part</p>
            <p className='column'>Quantity</p>
          </div>
          {products ? (
            parts.map((part) => (
              <div
                key={part}
                className='product-contents each-product'
                onClick={() => editPart(part)}
              >
                <p className='column'>{part}</p>
                <p className='column'>{partQuantity(part)}</p>
              </div>
            ))
          ) : (
            <p>hello</p>
          )}
        </div>

        <div className='create-product'>
          {create ? (
            <div>
              <h1>{newProduct.name}</h1>
              <div className='flex-center'>
                <p>quantity</p>
                <input type='number' onChange={handleChange} />
              </div>
              <button onClick={imageUpload}>Upload image</button>
              <button onClick={submitCreate}>Create product</button>
            </div>
          ) : (
            <div>
              <h1>{newProduct.name}</h1>
              <div className='flex-center'>
                <p>quantity</p>
                <input type='number' onChange={handleChange} />
              </div>
              <button>Edit Product</button>
            </div>
          )}
        </div>
        <div className='bag-images'>
          {bagImage ? (
            <img src={bagImage} alt={bagImage} className='bag-part' />
          ) : (
            <p>hello</p>
          )}
          <img src={bag} alt='bag' className='bag-part' />
        </div>
      </div>
    </div>
  );
}

export default Products;
