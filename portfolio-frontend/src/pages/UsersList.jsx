import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";

function UsersList() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    loadUsers();
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <Link to="/users/new">
          <button className="btn btn-primary">Add User</button>
        </Link>
      </div>

      <div className="table-wrapper">
        {users.length === 0 ? (
          <p>No users yet. Add someone to your team 👥</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.role ? <span className="badge">{u.role}</span> : "-"}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link to={`/users/${u._id}/edit`}>
                        <button className="btn btn-secondary">Edit</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(u._id)}
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

export default UsersList;
