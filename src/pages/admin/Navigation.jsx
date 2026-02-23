/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Plus,
  Loader2,
  Search,
  FolderOpen,
  Folder,
} from "lucide-react";
import NavItemRow from "../../components/Admin/Navigation/Navitemrow";
import NavItemFormModal from "../../components/Admin/Navigation/Navitemformmodal";

const TABLE_HEADERS = [
  "Name",
  "Slug",
  "Parent",
  "Subcategories",
  "Order",
  "Actions",
];

const Navigation = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const API = "https://shopswift-backend-kykw.onrender.com/api/admin";
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/categories`, { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch categories");
      setItems(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (payload, id) => {
    const url = id ? `${API}/categories/${id}` : `${API}/categories`;
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save category");
    await fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await fetch(`${API}/categories/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      setItems((prev) => prev.filter((i) => (i.id ?? i._id) !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setModalOpen(true);
  };
  const openEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  // Sort: root items first (no parentId), then children grouped under their parent
  const sorted = [...items].sort((a, b) => {
    const aRoot = !a.parentId;
    const bRoot = !b.parentId;
    if (aRoot && !bRoot) return -1;
    if (!aRoot && bRoot) return 1;
    return (a.order ?? 0) - (b.order ?? 0);
  });

  const filtered = sorted.filter(
    (i) =>
      i.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.slug?.toLowerCase().includes(search.toLowerCase()),
  );

  const rootCount = items.filter((i) => !i.parentId).length;
  const subCount = items.filter((i) => i.parentId).length;

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
            <LayoutGrid size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Navigation
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage category slugs and hierarchy
            </p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition shrink-0"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Categories",
            value: items.length,
            icon: LayoutGrid,
            color: "from-sky-500 to-sky-700",
          },
          {
            label: "Root Categories",
            value: rootCount,
            icon: FolderOpen,
            color: "from-violet-500 to-violet-700",
          },
          {
            label: "Subcategories",
            value: subCount,
            icon: Folder,
            color: "from-emerald-500 to-emerald-700",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white shrink-0`}
            >
              <Icon size={15} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-xl font-bold text-gray-900 leading-tight">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full max-w-sm shadow-sm">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search by name or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading categories...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-red-500 text-sm mb-3">{error}</p>
          <button
            onClick={fetchItems}
            className="text-xs px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <LayoutGrid size={36} className="mb-3 text-gray-200" />
          <p className="text-sm">
            {search
              ? "No categories match your search."
              : "No categories yet. Add your first one!"}
          </p>
          {!search && (
            <button
              onClick={openAdd}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition"
            >
              <Plus size={13} />
              Add Category
            </button>
          )}
        </div>
      )}

      {/* Table */}
      {!loading && !error && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Legend */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <FolderOpen size={13} className="text-sky-500" /> Root category
            </span>
            <span className="flex items-center gap-1.5">
              <Folder size={13} className="text-gray-400" /> Subcategory
            </span>
          </div>
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
                {filtered.map((item) => (
                  <NavItemRow
                    key={item.id ?? item._id}
                    item={item}
                    allItems={items}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <NavItemFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editItem={editItem}
        allItems={items}
      />
    </div>
  );
};

export default Navigation;
