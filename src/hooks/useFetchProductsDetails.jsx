import React, { useEffect, useState } from "react";

const useFetchProductsDetails = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return { product, loading };
};

export default useFetchProductsDetails;
