import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, decreaseQuantity } from "../features/cart/cartSlice";

/**
 * Product Catalog Home View
 * Fetches products from DummyJSON, supports keyword filtering, and syncs cart quantities.
 */
const Home = () => {
  const [limit, setLimit] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Fetch products whenever the requested limit changes
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=${limit}`
        );
        const fetchedList = response.data.products || [];
        setProducts(fetchedList);
        setFilteredProducts(fetchedList);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    }

    fetchProducts();
  }, [limit]);

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

  function handleDecreaseQuantity(productId) {
    dispatch(decreaseQuantity(productId));
  }

  // Filter products by matching title, category, tags, or brand
  function handleProductSearch() {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      setFilteredProducts(products);
      return;
    }

    const matchingProducts = products.filter((product) => {
      const matchesTitle = product.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory = product.category
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesTags = (product.tags || []).some((tag) =>
        tag.toLowerCase().includes(normalizedQuery)
      );
      const matchesBrand = (product.brand || "")
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesTitle || matchesCategory || matchesTags || matchesBrand;
    });

    setFilteredProducts(matchingProducts);
  }

  // Compute total unit count across all cart items
  const totalCartUnits = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-12 p-6">
        E-Commerce Storefront
      </h1>

      <div className="flex justify-between gap-4 p-4 items-center flex-wrap">
        <div className="flex flex-col">
          <label htmlFor="limitInput">Product Limit:</label>
          <input
            id="limitInput"
            value={limit}
            type="number"
            min="0"
            placeholder="Enter product limit"
            className="border border-b-black p-2"
            onChange={(e) => setLimit(Number(e.target.value) || 0)}
          />
        </div>

        <p className="text-xl font-bold">
          Products Displayed: {filteredProducts.length}
        </p>

        <div className="flex justify-center items-center gap-4 p-2">
          <div className="flex flex-col">
            <label htmlFor="searchInput">Search Catalog</label>
            <input
              id="searchInput"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="border border-b-black p-2"
              type="text"
              placeholder="Search by title, brand, or tag"
            />
          </div>

          <button
            onClick={handleProductSearch}
            className="p-2 mt-7 border border-red-600 bg-yellow-400 hover:bg-white cursor-pointer"
          >
            🔎 Search
          </button>
        </div>

        <div>
          <Link to="/addToCart">
            <button className="text-xl font-bold border border-black bg-yellow-400 rounded-xl justify-center items-center p-2 m-4 cursor-pointer mt-12 hover:bg-amber-600">
              🛒 Cart ({totalCartUnits})
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-12 mt-12 pb-12">
        {filteredProducts.map((item) => {
          const cartItem = cartItems.find((entry) => entry.id === item.id);

          return (
            <div
              key={item.id}
              className="w-80 flex justify-center items-center flex-col border border-b-black gap-2 p-4"
            >
              <img
                width={200}
                height={100}
                src={item.images[0]}
                alt={item.title}
              />
              <h2 className="font-semibold text-center">{item.title}</h2>
              <p className="text-sm text-gray-700 text-center">
                {item.description}
              </p>
              <p className="font-bold">Category: {item.category}</p>
              <p className="text-red-600 font-bold">Price: ${item.price}</p>

              {cartItem ? (
                <div className="flex items-center border border-red-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="w-10 h-10 text-xl font-bold bg-red-500 text-white hover:bg-red-700 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-bold">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-10 h-10 text-xl font-bold bg-amber-300 hover:bg-amber-400 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="text-[16px] border border-red-600 bg-amber-300 rounded-xl p-2 hover:bg-zinc-200 cursor-pointer"
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
