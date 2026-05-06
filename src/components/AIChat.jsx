import { useState } from "react";

function AIChat({ onAsk }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAsk = async () => {
        const response = await onAsk(question);
        setAnswer(response);
    };

    return (
        <div className="ai">
            <h2>Agente IA</h2>

            <div className="ai-controls">
                <input
                    placeholder="Preguntá algo..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />

                <button onClick={handleAsk}>
                    Consultar
                </button>
            </div>

            {answer && (
                <div className="answer">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default AIChat;