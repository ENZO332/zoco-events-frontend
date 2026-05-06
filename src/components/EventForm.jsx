import { useState } from "react";

function EventForm({ onCreate }) {
    const [form, setForm] = useState({
        name: "",
        location: "",
        category: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onCreate(form);
        
        setForm({
            name: "",
            location: "",
            category: ""
        });
    };
  
    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                placeholder="Nombre"
                value={form.name}
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
            />

            <input
                placeholder="Dirección"
                value={form.location}
                onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                }
            />

            <input
                placeholder="Categoría"
                value={form.category}
                onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                }
            />

            <button type="submit">
                Crear evento
            </button>
        </form>
    );
}

export default EventForm;