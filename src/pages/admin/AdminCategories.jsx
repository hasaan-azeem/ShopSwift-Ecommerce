import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import api from "../../utils/api";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async () => {
    try {
      if (editing) {
        await api.put(`/categories/${editing}`, { name });
        setEditing(null);
      } else {
        await api.post("/categories", { name });
      }
      setName("");
      fetchCategories();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (id, currentName) => {
    setEditing(id);
    setName(currentName);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) { console.error(err); }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Categories</Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          label="Category Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleAdd}>
          {editing ? "Update" : "Add"}
        </Button>
      </Box>
      <List>
        {categories.map(cat => (
          <ListItem key={cat._id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEdit(cat._id, cat.name)}><Edit /></IconButton>
              <IconButton edge="end" onClick={() => handleDelete(cat._id)}><Delete /></IconButton>
            </>
          }>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminCategories;
