import { useEffect, useState } from "react";

import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import AIChat from "../components/AIChat";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  askAI
} from "../services/eventService";

import "../styles/dashboard.css";

function Dashboard() {
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(false);

    const [dialog, setDialog] = useState({ show: false, message: "", type: "" });

    const loadEvents = async () => {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const showDialog = (message, type = "success") => {
        setDialog({ show: true, message, type });
        setTimeout(() => setDialog({ show: false, message: "", type: "" }), 3000);
    };

    const handleCreate = async (form) => {
        try {
            await createEvent(form);
            loadEvents();
            showDialog("Evento creado exitosamente");
        } catch (error) {
            showDialog(error.response?.data?.error || "Error al crear", "error");
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            await updateEvent(id, data);
            loadEvents();
        } catch (error) {
            alert(error.response?.data?.error || "Error al actualizar");
        }
    };

    const handleDelete = async (id) => {
        await deleteEvent(id);
        loadEvents();
        showDialog("Evento eliminado");
    };

    return (
        <div className="container">
            <p>Zoco Events Platform</p>
            <h1>Zoco Events Dashboard</h1>
            <div className="layout">
                <aside className="sidebar">
                    <AIChat onAsk={askAI} />
                </aside>
                <main className="main">
                    <EventForm onCreate={handleCreate} />
                        <div className="events">
                            {loading ? (
                                <div className="spinner"/>
                            ) : (
                                events.map((event) => (
                                    <EventCard
                                        key={event._id}
                                        event={event}
                                        onDelete={handleDelete}
                                        onUpdate={handleUpdate}
                                    />
                                ))
                            )}
                        </div>
                </main>
            </div>
            {dialog.show && (
                <div className={`dialog ${dialog.type === "error" ? "dialog-error" : "dialog-success"}`}>
                    {dialog.message}
                </div>
            )}
        </div>
    );
}

export default Dashboard;