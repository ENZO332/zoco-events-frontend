import { useState } from "react";

function EventCard({ event, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        name: event.name,
        location: event.location,
        category: event.category
    });

    const [confirming, setConfirming] = useState(false);
    
    const handleSave = () => {
        onUpdate(event._id, form);
        setEditing(false);
    };
    
    if (editing) {
        return (
            <div className="card">
                <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
                <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <div className="card-actions">
                    <button className="btn-save" onClick={handleSave}>Guardar</button>
                    <button className="btn-cancel" onClick={() => setEditing(false)}>Cancelar</button>
                </div>
            </div>
        );
    }
    return (
        <div className="card">
            <h3>{event.name}</h3>
            <p>{event.location}</p>
            <span className={`badge badge-${event.category || 'default'}`}>
                {event.category || 'sin categoría'}
            </span>
            <div className="card-actions">
                <button className="btn-edit" onClick={() => setEditing(true)}>Editar</button>
                {confirming ? (
                    <>
                      <button className="btn-save" onClick={() => { onDelete(event._id); setConfirming(false); }}>
                            Confirmar
                      </button>
                      <button className="btn-cancel" onClick={() => setConfirming(false)}>
                            Cancelar
                      </button>
                    </>
                ) : (
                    <button className="btn-delete" onClick={() => setConfirming(true)}>
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}

export default EventCard;