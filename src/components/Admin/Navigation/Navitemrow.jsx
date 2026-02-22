import { Pencil, Trash2, ChevronRight, FolderOpen, Folder } from "lucide-react";

const NavItemRow = ({ item, allItems, onEdit, onDelete }) => {
  const parent = allItems.find(
    (i) => i.id === item.parentId || i._id === item.parentId
  );

  const children = allItems.filter(
    (i) => i.parentId === (item.id ?? item._id)
  );

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Name */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          {item.parentId ? (
            <>
              <span className="text-gray-300 ml-4"><ChevronRight size={14} /></span>
              <Folder size={15} className="text-gray-400 shrink-0" />
            </>
          ) : (
            <FolderOpen size={15} className="text-sky-500 shrink-0" />
          )}
          <span className="text-sm font-semibold text-gray-800">{item.name}</span>
        </div>
      </td>

      {/* Slug */}
      <td className="px-5 py-4">
        <code className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-mono">
          /{item.slug}
        </code>
      </td>

      {/* Parent */}
      <td className="px-5 py-4">
        {parent ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-medium">
            <FolderOpen size={11} />
            {parent.name}
          </span>
        ) : (
          <span className="text-xs text-gray-400">— Root</span>
        )}
      </td>

      {/* Children count */}
      <td className="px-5 py-4">
        {children.length > 0 ? (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            {children.length} sub{children.length === 1 ? "category" : "categories"}
          </span>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>

      {/* Order */}
      <td className="px-5 py-4 text-sm text-gray-500">
        {item.order ?? item.sortOrder ?? "—"}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-sky-50 hover:text-sky-600 transition"
            title="Edit"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(item.id ?? item._id)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default NavItemRow;