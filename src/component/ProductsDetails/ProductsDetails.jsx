import { useParams } from "react-router-dom";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useFetchProductsDetails from "../../hooks/useFetchProductsDetails";

const ProductsDetails = () => {
  const { id } = useParams();
  const { product, loading } = useFetchProductsDetails(id);

  const [activeImage, setActiveImage] = useState(0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="py-8 text-center">Product not found</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Product Overview */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
              {/* <img
                src={product.images[activeImage] || product.thumbnail}
                alt={product.title}
                className="object-cover object-center w-full h-96"
              /> */}

              <LazyLoadImage
                className="object-cover object-center w-full h-96"
                alt={product.title}
                effect="blur"
                wrapperProps={{
                  // If you need to, you can tweak the effect transition using the wrapper style.
                  style: { transitionDelay: "1s" },
                }}
                src={product.images[activeImage] || product.thumbnail}
              />
            </div>
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-md overflow-hidden h-24 ${
                      activeImage === index ? "ring-2 ring-primary-500" : ""
                    }`}>
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                  ${product.price}
                </p>
                {product.discountPercentage > 0 && (
                  <span className="ml-4 px-2.5 py-0.5 text-sm font-medium text-green-600 bg-green-100 rounded-md">
                    Save {product.discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {product.rating} out of 5 stars
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="pt-8 mt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Product Details
              </h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Weight:</span> {product.weight}{" "}
                  kg
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Stock:</span> {product.stock}{" "}
                  units
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={
                      product.stock > 10 ? "text-green-600" : "text-red-600"
                    }>
                    {product.availabilityStatus}
                  </span>
                </p>
              </div>
            </div>

            {/* Shipping & Warranty */}
            <div className="pt-8 mt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Shipping & Returns
              </h3>
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Shipping:</span>{" "}
                  {product.shippingInformation}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Warranty:</span>{" "}
                  {product.warrantyInformation}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Return Policy:</span>{" "}
                  {product.returnPolicy}
                </p>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="mt-8">
              <div className="flex space-x-4">
                <button className="flex-1 px-6 py-3 text-white rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  Add to Cart
                </button>
                <button className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 rounded-md dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pt-8 mt-8 border-t border-gray-200">
              <h3 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {review.reviewerName}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
