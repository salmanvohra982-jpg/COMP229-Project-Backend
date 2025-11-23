import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, deleteProject } from "../services/projectService";

function ProjectsList() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await deleteProject(id);
    loadProjects();
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <Link to="/projects/new">
          <button className="btn btn-primary">Add Project</button>
        </Link>
      </div>

      <div className="table-wrapper">
        {projects.length === 0 ? (
          <p>No projects yet. Add your first one ✨</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="badge"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link to={`/projects/edit/${p._id}`}>
                        <button className="btn btn-secondary">Edit</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default ProjectsList;
