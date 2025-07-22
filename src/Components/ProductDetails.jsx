import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("")

  useEffect(() => {
    document.title = "Product Details | E-commerce";
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://task-ecommerce-api.vercel.app/api/products/${id}`);
        // console.log(res.data.data);
        const productID = res.data.data;
        console.log(productID);
        
        setProduct(productID);
        
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) return <p>Loading...</p>;


  const switchImage = (url) => {
    setImage(url)
  }

  return (
    <div className="py-4 coustom_container">
      <h1 className="text-2xl uppercase font-bold mb-4">{product.nameEn}</h1>
      <img  src={image ? image : product.image} alt={product.nameEn} className="rounded-lg w-80 h-80 object-cover mb-4" />
      <div className="flex lg:w-[360px] w-full gap-2 items-center mb-3">
        {product.images.map((ele) => (
            <img  key={ele} onClick={() => switchImage(ele)} className={`${image === ele ? "border-blue-400" : "border-[#EEE]"} w-[100px]  border-[2px] cursor-pointer`} src = {ele} alt={product.name} title={product.name}/>
        ))}
      </div>
      <p className="text-gray-700 mb-2 font-semibold">{product.description}</p>
      <p className="text-lg font-semibold text-green-600">Price: ${product.price}</p>
      <p className="text-sm text-gray-500 line-through">Original: ${product.originalPrice}</p>
      <p className="mt-2">In Stock: {product.inStock ? "Yes" : "No"}</p>
      <div className="mt-4">
        <h2 className="font-bold mb-2">Specifications:</h2>
        <ul className="list-none pl-5">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div className="flex items-center gap-3 mb-2 last:mb-0">
              <FaCheck  className="text-blue-500"/>
              <li className="font-semibold" key={key}>{key}: {value}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
