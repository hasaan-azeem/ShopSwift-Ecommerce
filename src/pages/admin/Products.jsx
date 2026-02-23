import { useEffect, useState } from "react";
import { Package, Plus, Loader2, Search } from "lucide-react";
import ProductRow from "../../components/Admin/Product/Productrow";
import ProductFormModal from "../../components/Admin/Product/Productformmodal";
import api from "../../utils/api";

const TABLE_HEADERS = [
  "Product",
  "Category",
  "Price (PKR)",
  "Discount",
  "Actions",
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data);
    } catch {
      /* empty */
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSave = async (formData, id) => {
    if (id) {
      await api.put(`/admin/products/${id}`, formData);
    } else {
      await api.post("/admin/products", formData);
    }
    await fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await api.delete(`/admin/products/${id}`);
    setProducts((prev) => prev.filter((p) => (p.id ?? p._id) !== id));
  };

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      (typeof p.category === "string"
        ? p.category.toLowerCase().includes(search.toLowerCase())
        : p.category?.name?.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
            <Package size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Manage Products
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {products.length} product{products.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition shrink-0 cursor-pointer
          "
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full max-w-sm shadow-sm">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading products...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-red-500 text-sm mb-3">{error}</p>
          <button
            onClick={fetchProducts}
            className="text-xs px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <Package size={36} className="mb-3 text-gray-200" />
          <p className="text-sm">
            {search
              ? "No products match your search."
              : "No products yet. Add your first one!"}
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {TABLE_HEADERS.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <ProductRow
                    key={product.id ?? product._id}
                    product={product}
                    onEdit={(p) => {
                      setEditProduct(p);
                      setModalOpen(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editProduct={editProduct}
        categories={categories}
      />
    </div>
  );
};

export default Products;
