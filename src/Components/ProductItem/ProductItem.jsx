import { FaHeart, FaStar } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';

export default function ProductItem({ product, addProduct }) {
  const { addToWishlist, removeWishlistItem } = useContext(WishlistContext);
  const [liked, setLiked] = useState(false);


  useEffect(() => {
    const savedLiked = localStorage.getItem(`liked-${product.id}`);
    if (savedLiked === 'true') {
      setLiked(true);
    }
  }, [product.id]);


  async function handleLikeToggle(){
    const newLikedState = !liked;
    setLiked(newLikedState);

    if (newLikedState) {
      await addToWishlist(product.id);
    } else {
      await removeWishlistItem(product.id);
    }

    localStorage.setItem(`liked-${product.id}`, newLikedState);
  };

  return (
    <div className="product p-2 border border-1 rounded-md">
      <div className="mb-2 flex justify-end">
        {liked ? (
          <FaHeart className="text-2xl text-main cursor-pointer" onClick={handleLikeToggle} />
        ) : (
          <CiHeart className="text-2xl text-main cursor-pointer" onClick={handleLikeToggle} />
        )}
      </div>

      <Link to={`/productDetails/${product.id}`}>
        <img src={product.imageCover} className="w-full" alt={product.title} />
        <small className="my-2 font-semibold">{product.category?.name}</small>
        <h5 className="font-bold text-main my-2">
          {product.title.split(' ').slice(0, 3).join(' ')}
        </h5>
        <div className="flex justify-between my-2">
          <p className="font-semibold">{product.price} EGP</p>
          <div className="flex items-center font-semibold">
            <FaStar className="text-yellow-300 mx-1" />
            {product.ratingsAverage}
          </div>
        </div>
      </Link>

      <button
        onClick={() => addProduct(product.id)}
        className="bg-main w-full text-center rounded-md btn p-2 text-white hover:bg-green-700"
      >
        Add to cart
      </button>
    </div>
  );
}

