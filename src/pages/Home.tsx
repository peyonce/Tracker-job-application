import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/Auth.module.css";

const API_URL = "http://localhost:5000";

interface Job {
    id: number;
    title: string;
    company: string;
}

export default function Home() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editCompany, setEditCompany] = useState("");
    const navigate = useNavigate();

    const fetchJobs = async () => {
        const res = await fetch(`${API_URL}/jobs`);
        const data = await res.json();
        setJobs(data);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const addJob = async () => {
        if (!title.trim() || !company.trim()) return;
        await fetch(`${API_URL}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, company }),
        });
        setTitle("");
        setCompany("");
        fetchJobs();
    };

    const deleteJob = async (id: number) => {
        await fetch(`${API_URL}/jobs/${id}`, { method: "DELETE" });
        fetchJobs();
    };

    const startEdit = (job: Job) => {
        setEditingId(job.id);
        setEditTitle(job.title);
        setEditCompany(job.company);
    };

    const updateJob = async (id: number) => {
        await fetch(`${API_URL}/jobs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editTitle, company: editCompany }),
        });
        setEditingId(null);
        setEditTitle("");
        setEditCompany("");
        fetchJobs();
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Job Tracker</h2>


            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button className={styles.addButton} onClick={addJob}>
                    Add Job
                </button>
            </div>

            <ul className={styles.jobList}>
                {jobs.map((job) => (
                    <li key={job.id}>
                        {editingId === job.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={editCompany}
                                    onChange={(e) => setEditCompany(e.target.value)}
                                />
                                <button
                                    className={styles.jobButton}
                                    onClick={() => updateJob(job.id)}
                                >
                                    Save
                                </button>
                                <button
                                    className={`${styles.jobButton} ${styles.cancelButton}`}
                                    onClick={() => setEditingId(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                {job.title} — {job.company}
                                <button
                                    className={styles.jobButton}
                                    onClick={() => startEdit(job)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`${styles.jobButton} ${styles.deleteButton}`}
                                    onClick={() => deleteJob(job.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
