import { useEffect, useState } from "react"
import axios from "axios"
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";



  export default function GetAllProducts(){
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [activeFilter, setActiveFilter] = useState(false)
    const [sortOption, setSortOption] = useState("");
    const [message, setMessage] = useState("")

    useEffect(() => {
    document.title = "Home | E-commerce";
  }, []);

       useEffect(() => {
         if (!sortOption) return;
       
         const sorted = [...products].sort((a, b) => {
           if (sortOption === "asc") return a.price - b.price;
           if (sortOption === "desc") return b.price - a.price;
           return 0;
         });
       
         setProducts(sorted);
      }, [sortOption]);


       const getProducts = async () => {
            try {
          const res = await axios.get("https://task-ecommerce-api.vercel.app/api/products")
          //  console.log(res.data.data.products); // tets
          const currentProducts = res.data.data.products;
          setProducts(currentProducts);
          setAllProducts(currentProducts)
          console.log(currentProducts);
          
           
        } catch (error) {
          console.log(error);
        }
       }
      useEffect(() => {
        getProducts()
        fetchCategories()
      }, [])


    const fetchSearchedProducts = async (searchTerm) => {
       const res = await axios.get(
         `https://task-ecommerce-api.vercel.app/api/products?search=${searchTerm}`
       );
      //  console.log(res.data.data.products);
       const result = res.data.data.products
       setProducts(result);
      
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://task-ecommerce-api.vercel.app/api/categories");
        const currentCategories = res.data.data;
        setCategories([...currentCategories]);
        console.log(currentCategories);
        
        
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };


    const fetchProductsByCategory = async (categoryName) => {
      try {
        if (categoryName === "All") {
          setProducts(allProducts);
        } else {
          const filtered = allProducts.filter(
            (product) =>
              product.category?.name?.toLowerCase() === categoryName.toLowerCase()
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };


    const handlePriceFilter = async () => {
  try {
    let url = `https://task-ecommerce-api.vercel.app/api/products?`;

    if (minPrice) url += `minPrice=${minPrice}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}`;

    const res = await axios.get(url);
    setProducts(res.data.data.products);
    setMinPrice("")
    setMaxPrice("")
  } catch (error) {
    console.error("Error filtering by price:", error);
  }
};


    const handelActiveFilter = () => {
      setActiveFilter(!activeFilter)
    }


    const addToCart = (product) => {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const isExists = existingCart.find((item) => item.id === product.id);
    
      if (!isExists) {
        const updatedCart = [...existingCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        const updateCart = existingCart.map((item) =>  item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
        localStorage.setItem("cart", JSON.stringify(updateCart));
    }
   };


    const handelMessage = () => {
      setMessage("Product added successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    };



    return(
      <section className="p-4 pb-20 coustom_container text-center relative">
        <p
          className={`  transition 
           fixed top-32 left-1/2 -translate-x-1/2 z-40 
           ${message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"} 
          bg-green-100 text-green-700 p-3 rounded-lg w-fit mx-auto`}
        >
         {message}
        </p>
            <div className="flex justify-between items-center flex-row-reverse">
           <select
             value={sortOption}
             onChange={(e) => setSortOption(e.target.value)}
             className="border border-gray-300 px-5 py-3 rounded-lg z-40 focus:outline-blue-400  "
           >
             <option value="">Sort By Price</option>
             <option value="asc">Price: Low to High</option>
             <option value="desc">Price: High to Low</option>
           </select>

           <button onClick={handelActiveFilter}  className={`transition  bg-blue-400 text-white px-5 py-3 rounded-xl cursor-pointer text-lg`}>Filter Of Price</button>
        </div>
        <h1 className="text-center text-3xl font-semibold uppercase">O<span className="text-blue-400">ur Pr</span>oducts</h1>


         
         <div className={`${activeFilter ? "visible opacity-100" : "invisible opacity-0"} transition fixed bg-[#0000008a] w-full h-full left-0 top-0 z-20`}></div>
         <div className={`${activeFilter ? "visible opacity-100" : "invisible opacity-0"} lg:w-[65%] w-[95%] rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#EEE] py-16 px-8`}>
            <FaXmark onClick={handelActiveFilter} className="absolute top-4 right-4 transition hover:text-blue-400 cursor-pointer" size={30}/>
            <div className="flex gap-4 flex-col justify-center">
             <input
               type="number"
               placeholder="Min Price"
               className="border border-gray-300 px-3 py-2 rounded outline-none"
               value={minPrice}
               onChange={(e) => setMinPrice(e.target.value)}
             />
             <input
               type="number"
               placeholder="Max Price"
               className="border border-gray-300 px-3 py-2 rounded outline-none"
               value={maxPrice}
               onChange={(e) => setMaxPrice(e.target.value)}
             />
             <button
               onClick={() => {
                try {
                   handlePriceFilter()
                   handelActiveFilter()
                } catch (error) {
                  console.log(error);
                }
               }}
               className="bg-blue-500 text-white px-4 py-2 rounded"
             >
               Filter
             </button>
           </div>
         </div>
         <input 
         type="text" 
         className="border-[#dee2e6] border-[1px] py-3 px-4 rounded-lg mt-6 outline-1 outline-transparent duration-200  focus:border-blue-500 focus:outline-blue-500 placeholder:duration-200 focus:placeholder:opacity-0 mx-auto lg:w-[65%] w-full" 
         placeholder="Search With Name Product" 
         name="search"
         value={searchTerm}
         onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          fetchSearchedProducts(value)
         }}
         />
         <ul className="flex justify-center gap-3 mt-6 overflow-x-auto whitespace-nowrap px-3 scrollbar-hide">
          <li 
             onClick={() => {
              fetchProductsByCategory("All")
              setActiveCategory("All")
            }
            }
             className={`${activeCategory === "All" ? "bg-blue-400 text-white" : "bg-[#EEE] text-black"} py-3 px-2 rounded-lg cursor-pointer`}
           >
             All
           </li>
          {categories.map((ele) => (
            <li 
            onClick={() => {
              fetchProductsByCategory(ele.name)
              setActiveCategory(ele.name)
            }}
            className={`${activeCategory === ele.name ? "bg-blue-400 text-white" : "bg-[#EEE] text-black"}  py-3 px-2 rounded-lg cursor-pointer`} 
            key={ele.id}>{ele.name}</li>
          ))}
         </ul>
      {
        products.length === 0 ? (
          <p className="text-center text-red-500 text-xl mt-10">No products found for {searchTerm}</p>
        ) : (
          <div className="text-left pt-9 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
            {products.map((ele) => (
              <div className="bg-[#EEE] overflow-hidden rounded-lg relative" key={ele.id}>
                <img src={ele.image} alt={ele.name} title={ele.name} className="w-full" />
                <ul className="absolute top-3 right-3 flex flex-col gap-2">
                  <li className="cursor-pointer bg-[#EEE] p-2 rounded-md group">
                    <Link to={`/${ele.id}`}>
                      <FaEye className=" group-hover:text-blue-400 transition" size={20} />
                    </Link>
                  </li>
                  <li  onClick={() => {
                    addToCart(ele)
                    handelMessage()
                    }} className="cursor-pointer bg-[#EEE] p-2 rounded-md group">
                      <FaCartPlus className=" group-hover:text-blue-400 transition" size={20} />
                  </li>
                </ul>
                <div className="py-2 px-3">
                  <span className="uppercase font-semibold mb-1 block">{ele.brand}</span>
                  <h3 className="font-semibold text-blue-500 mb-2">{ele.name}  {ele.nameEn}</h3>
                  <p className="text-lg">
                    {ele.originalPrice > ele.price && (
                      <s className="text-gray-500 mr-2">{ele.originalPrice} EGP</s>
                    )}
                    <strong className="text-red-700">{ele.price} EGP</strong>
                  </p>
                  <p className="mb-1">{ele.inStock ? "In Stock: YES" : "Out of Stock: NO"}</p>
                  <span className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span>{ele.rating}</span>
                    <span>{ele.reviewCount} reviews</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      }

      </section>
    )
  }