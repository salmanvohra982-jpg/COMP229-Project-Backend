import api from "./apiClient";

// GET all projects
export async function getProjects() {
  return api.get("/projects");
}

// GET single project
export async function getProjectById(id) {
  return api.get(`/projects/${id}`);
}

// CREATE project
export async function createProject(data) {
  return api.post("/projects", data);
}

// UPDATE project
export async function updateProject(id, data) {
  return api.put(`/projects/${id}`, data);
}

// DELETE
export async function deleteProject(id) {
  return api.delete(`/projects/${id}`);
}
