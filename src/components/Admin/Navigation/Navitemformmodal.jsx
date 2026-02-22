import { useState, useEffect } from "react";
import { X, Loader2, FolderOpen } from "lucide-react";

const EMPTY_FORM = { name: "", slug: "", parentId: "", order: "" };

const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

const NavItemFormModal = ({ open, onClose, onSave, editItem = null, allItems = [] }) => {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState(null);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (editItem) {
      setForm({
        name:     editItem.name     ?? "",
        slug:     editItem.slug     ?? "",
        parentId: editItem.parentId ?? "",
        order:    editItem.order    ?? editItem.sortOrder ?? "",
      });
      setAutoSlug(false);
    } else {
      setForm(EMPTY_FORM);
      setAutoSlug(true);
    }
    setError(null);
  }, [editItem, open]);

  const set = (key) => (e) => {
    const val = e.target.value;
    setForm((f) => {
      const updated = { ...f, [key]: val };
      if (key === "name" && autoSlug) {
        updated.slug = slugify(val);
      }
      if (key === "slug") {
        setAutoSlug(false);
        updated.slug = slugify(val);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(
        {
          name:     form.name,
          slug:     form.slug,
          parentId: form.parentId || null,
          order:    form.order ? Number(form.order) : null,
        },
        editItem?.id ?? editItem?._id ?? null
      );
      onClose();
    } catch (err) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Parents = only root items (no parentId) and not the item being edited
  const parentOptions = allItems.filter(
    (i) => !i.parentId && (i.id ?? i._id) !== (editItem?.id ?? editItem?._id)
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {editItem ? "Edit Category" : "Add Category"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editItem ? "Update category details" : "Create a new navigation category"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Men, Women, Shirts"
              value={form.name}
              onChange={set("name")}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50 placeholder-gray-400"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Slug <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-black/10 focus-within:border-gray-400 transition overflow-hidden">
              <span className="px-3 text-gray-400 text-sm font-medium border-r border-gray-200 py-2.5 bg-gray-100 select-none">
                /
              </span>
              <input
                type="text"
                placeholder="men, women-shirts"
                value={form.slug}
                onChange={set("slug")}
                required
                className="flex-1 px-3 py-2.5 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Auto-generated from name. Used in URLs like <code className="text-gray-500">/collections/{form.slug || "slug"}</code>
            </p>
          </div>

          {/* Parent category */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Parent Category
            </label>
            <select
              value={form.parentId}
              onChange={set("parentId")}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50"
            >
              <option value="">— None (Root category)</option>
              {parentOptions.map((item) => (
                <option key={item.id ?? item._id} value={item.id ?? item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to make this a top-level category.
            </p>
          </div>

          {/* Sort order */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Sort Order
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.order}
              onChange={set("order")}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition bg-gray-50 placeholder-gray-400"
            />
            <p className="text-xs text-gray-400 mt-1">
              Lower numbers appear first in navigation.
            </p>
          </div>

          {/* Error */}
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
              {editItem ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NavItemFormModal;