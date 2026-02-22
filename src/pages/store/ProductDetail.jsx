import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { toast } from "sonner";
import api from "../../utils/api";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.image?.[0]?.url || "");
      })
      .catch(() => toast.error("Product not found."))
      .finally(() => setLoading(false));
  }, [id]); // re-fetches whenever the URL id changes

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.");
      return;
    }
    setIsButtonDisabled(true);
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image?.[0]?.url,
        size: selectedSize,
        color: selectedColor,
        quantity,
      }),
    );
    setTimeout(() => {
      toast.success("Added to cart!");
      setIsButtonDisabled(false);
    }, 500);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found.
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col space-y-4">
          {product.image?.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.altText || product.name}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img.url ? "border-black" : "border-gray-200"}`}
              onClick={() => setMainImage(img.url)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="md:w-1/2">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg border"
          />
          <div className="md:hidden flex overflow-x-scroll space-x-4 mt-4">
            {product.image?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.altText || product.name}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 shrink-0 ${mainImage === img.url ? "border-black" : "border-gray-200"}`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2">
          {product.category?.name && (
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
              {product.category.name}
            </p>
          )}
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {product.name}
          </h1>
          {product.oldPrice && (
            <p className="text-base text-gray-400 line-through">
              PKR {product.oldPrice.toLocaleString()}
            </p>
          )}
          <p className="text-2xl font-bold text-black mb-4">
            PKR {product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-4">
              <p className="font-medium mb-2">Color:</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded ${selectedColor === color ? "border-black bg-gray-100 font-medium" : "border-gray-300"}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Size:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${selectedSize === size ? "border-black bg-black text-white" : "border-gray-300"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isButtonDisabled}
            className={`bg-black text-white py-3 px-6 rounded w-full text-lg font-medium mb-4 ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
          >
            {isButtonDisabled ? "Adding..." : "Add to Cart"}
          </button>

          <div className="mt-6 border-t pt-4">
            <table className="w-full text-sm text-gray-700">
              <tbody>
                {product.brand && (
                  <tr className="border-b">
                    <td className="py-2 font-medium w-24">Brand</td>
                    <td>{product.brand}</td>
                  </tr>
                )}
                {product.material && (
                  <tr className="border-b">
                    <td className="py-2 font-medium">Material</td>
                    <td>{product.material}</td>
                  </tr>
                )}
                {product.gender && (
                  <tr>
                    <td className="py-2 font-medium">Gender</td>
                    <td>{product.gender}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
