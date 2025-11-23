import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectById,
  createProject,
  updateProject,
} from "../services/projectService";

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      const res = await getProjectById(id);
      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        link: res.data.link || "",
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
    if (isEdit) await updateProject(id, form);
    else await createProject(form);
    navigate("/projects");
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1 className="page-title">
          {isEdit ? "Edit Project" : "Add Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="form-input"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Project Link</label>
          <input
            id="link"
            className="form-input"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/projects")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProjectForm;
