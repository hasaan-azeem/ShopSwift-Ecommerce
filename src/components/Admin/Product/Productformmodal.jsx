import { useState, useEffect, useRef } from "react";
import { X, Upload, ImagePlus, Loader2 } from "lucide-react";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  discount: 0,
  category: "",
  brand: "",
  material: "",
  gender: "Unisex",
  sizes: "",
  colors: "",
  countInStock: "",
  isNewArrival: false,
  isBestSeller: false,
  isFeatured: false,
  image: null,
};

const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  prefix,
  suffix,
  required,
  readOnly,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide"
    >
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-sm text-gray-400 font-medium pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        className={`w-full border border-gray-200 rounded-xl py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50 placeholder-gray-400 ${prefix ? "pl-12" : "pl-3"} ${suffix ? "pr-9" : "pr-3"} ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
      />
      {suffix && (
        <span className="absolute right-3 text-sm text-gray-400 font-medium pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const Toggle = ({ label, desc, value, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {desc && <p className="text-xs text-gray-400">{desc}</p>}
    </div>
    <button
      type="button"
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors relative ${value ? "bg-black" : "bg-gray-300"}`}
    >
      <span
        className={`block w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${value ? "translate-x-6" : "translate-x-0.5"}`}
      />
    </button>
  </div>
);

const ProductFormModal = ({
  open,
  onClose,
  onSave,
  editProduct = null,
  categories = [],
}) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name ?? "",
        description: editProduct.description ?? "",
        price: editProduct.price ?? "",
        oldPrice: editProduct.oldPrice ?? "",
        discount: editProduct.discount ?? 0,
        category: editProduct.category?._id ?? editProduct.category ?? "",
        brand: editProduct.brand ?? "",
        material: editProduct.material ?? "",
        gender: editProduct.gender ?? "Unisex",
        sizes: Array.isArray(editProduct.sizes)
          ? editProduct.sizes.join(", ")
          : (editProduct.sizes ?? ""),
        colors: Array.isArray(editProduct.colors)
          ? editProduct.colors.join(", ")
          : (editProduct.colors ?? ""),
        countInStock: editProduct.countInStock ?? "",
        isNewArrival: editProduct.isNewArrival ?? false,
        isBestSeller: editProduct.isBestSeller ?? false,
        isFeatured: editProduct.isFeatured ?? false,
        image: null,
      });
      const existingImg =
        editProduct.image?.[0]?.url ??
        editProduct.image_url ??
        editProduct.image ??
        null;
      setPreview(typeof existingImg === "string" ? existingImg : null);
    } else {
      setForm(EMPTY_FORM);
      setPreview(null);
    }
    setError(null);
  }, [editProduct, open]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => () => setForm((f) => ({ ...f, [key]: !f[key] }));

  // Auto calculate discount when price or oldPrice changes
  const handlePriceChange = (key) => (e) => {
    const val = e.target.value;
    setForm((f) => {
      const updated = { ...f, [key]: val };
      const price = parseFloat(key === "price" ? val : f.price);
      const oldPrice = parseFloat(key === "oldPrice" ? val : f.oldPrice);
      if (price > 0 && oldPrice > price) {
        updated.discount = Math.round(((oldPrice - price) / oldPrice) * 100);
      } else {
        updated.discount = 0;
      }
      return updated;
    });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("description", form.description || form.name);
      payload.append("price", form.price);
      payload.append("oldPrice", form.oldPrice || "");
      payload.append("discount", form.discount || "0");
      payload.append("category", form.category);
      payload.append("brand", form.brand || "ShopSwift");
      payload.append("material", form.material || "");
      payload.append("gender", form.gender || "Unisex");
      payload.append("sizes", form.sizes || "");
      payload.append("colors", form.colors || "");
      payload.append("countInStock", form.countInStock || "0");
      payload.append("isNewArrival", form.isNewArrival);
      payload.append("isBestSeller", form.isBestSeller);
      payload.append("isFeatured", form.isFeatured);
      if (form.image) payload.append("image", form.image);

      await onSave(payload, editProduct?.id ?? editProduct?._id ?? null);
      onClose();
    } catch (err) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {editProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editProduct
                ? "Update product details"
                : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Product Image
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="group relative border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-xl overflow-hidden cursor-pointer transition-all bg-gray-50 hover:bg-gray-100"
              style={{ height: 160 }}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <Upload size={20} className="text-white" />
                    <span className="text-white text-sm">Change image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                  <ImagePlus size={28} className="text-gray-300" />
                  <p className="text-sm">Click to upload image</p>
                  <p className="text-xs text-gray-300">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </div>

          {/* Name */}
          <InputField
            label="Product Name"
            id="name"
            placeholder="e.g. Classic White Hoodie"
            value={form.name}
            onChange={set("name")}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Description
            </label>
            <textarea
              placeholder="Product description..."
              value={form.description}
              onChange={set("description")}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50 placeholder-gray-400 resize-none"
            />
          </div>

          {/* Price + Old Price */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Price"
              id="price"
              type="number"
              placeholder="0"
              value={form.price}
              onChange={handlePriceChange("price")}
              prefix="PKR"
              required
            />
            <InputField
              label="Old Price"
              id="oldPrice"
              type="number"
              placeholder="0"
              value={form.oldPrice}
              onChange={handlePriceChange("oldPrice")}
              prefix="PKR"
            />
          </div>

          {/* Auto calculated discount display */}
          {form.discount > 0 ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
              <span className="text-emerald-600 text-sm font-semibold">
                {form.discount}% off
              </span>
              <span className="text-emerald-500 text-xs">
                auto calculated from price difference
              </span>
              <InputField
                label=""
                id="discount"
                type="number"
                value={form.discount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, discount: Number(e.target.value) }))
                }
                suffix="%"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Set Old Price higher than Price to auto-calculate discount
            </p>
          )}

          {/* Brand + Gender */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Brand"
              id="brand"
              placeholder="ShopSwift"
              value={form.brand}
              onChange={set("brand")}
            />
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Gender
              </label>
              <select
                value={form.gender}
                onChange={set("gender")}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50"
              >
                <option value="Unisex">Unisex</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
          </div>

          {/* Sizes + Colors */}
          <InputField
            label="Sizes (comma separated)"
            id="sizes"
            placeholder="S, M, L, XL"
            value={form.sizes}
            onChange={set("sizes")}
          />
          <InputField
            label="Colors (comma separated)"
            id="colors"
            placeholder="Black, White, Navy"
            value={form.colors}
            onChange={set("colors")}
          />

          {/* Material + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Material"
              id="material"
              placeholder="100% Cotton"
              value={form.material}
              onChange={set("material")}
            />
            <InputField
              label="Stock"
              id="countInStock"
              type="number"
              placeholder="0"
              value={form.countInStock}
              onChange={set("countInStock")}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Category <span className="text-red-400">*</span>
            </label>
            {categories.length > 0 ? (
              <select
                value={form.category}
                onChange={set("category")}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id ?? c.id ?? c} value={c._id ?? c.id ?? c}>
                    {c.name ?? c}
                  </option>
                ))}
              </select>
            ) : (
              <InputField
                id="category"
                placeholder="e.g. Hoodies"
                value={form.category}
                onChange={set("category")}
              />
            )}
          </div>

          {/* Toggles */}
          <Toggle
            label="New Arrival"
            desc="Show in New Arrivals section on homepage"
            value={form.isNewArrival}
            onChange={toggle("isNewArrival")}
          />
          <Toggle
            label="Best Seller"
            desc="Show as Best Seller section on homepage"
            value={form.isBestSeller}
            onChange={toggle("isBestSeller")}
          />
          <Toggle
            label="Featured"
            desc="Mark as featured product"
            value={form.isFeatured}
            onChange={toggle("isFeatured")}
          />

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {editProduct ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
