import { Pencil, Trash2, Package, Tag } from "lucide-react";

const ProductRow = ({ product, onEdit, onDelete }) => {
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : null;

  // FIX: extract image URL from array of objects
  const imageUrl = product.image?.[0]?.url ?? null;

  // FIX: category is a populated object, extract the name
  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Image + Name */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package size={16} className="text-gray-300" />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {product.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              ID:{" "}
              {(product.id ?? product._id)?.toString().slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
          <Tag size={10} />
          {categoryName ?? "No category"}
        </span>
      </td>

      {/* Price */}
      <td className="px-5 py-4">
        <p className="text-sm font-semibold text-gray-800">
          PKR {Number(product.price).toLocaleString()}
        </p>
        {discountedPrice && (
          <p className="text-xs text-emerald-600 mt-0.5">
            After discount: PKR {Number(discountedPrice).toFixed(0)}
          </p>
        )}
      </td>

      {/* Discount */}
      <td className="px-5 py-4">
        {product.discount > 0 ? (
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
            {product.discount}% off
          </span>
        ) : (
          <span className="text-xs text-gray-400">No discount</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(product)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-sky-50 hover:text-sky-600 transition cursor-pointer"
            title="Edit product"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(product.id ?? product._id)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
            title="Delete product"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
