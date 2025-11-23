import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, createUser, updateUser } from "../services/userService";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      const res = await getUserById(id);
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        role: res.data.role || "",
      });
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) await updateUser(id, form);
    else await createUser(form);
    navigate("/users");
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1 className="page-title">{isEdit ? "Edit User" : "Add User"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-input"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            className="form-input"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Developer, QA, PM..."
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserForm;
