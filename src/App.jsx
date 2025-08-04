import { useState, useEffect, useRef } from "react";

function App() {
  const [tiempo, setTiempo] = useState(0);
  const [activo, setActivo] = useState(false);
  const intervalo = useRef(null);

  useEffect(() => {
    if (activo) {
      intervalo.current = setInterval(() => {
        setTiempo((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(intervalo.current);
    }

    return () => clearInterval(intervalo.current);
  }, [activo]);

  const formatearTiempo = (segundos) => {
    const min = String(Math.floor(segundos / 60)).padStart(2, "0");
    const sec = String(segundos % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Cronómetro</h1>
      <h2>{formatearTiempo(tiempo)}</h2>
      <button onClick={() => setActivo(!activo)}>
        {activo ? "Pausar" : "Iniciar"}
      </button>
      <button onClick={() => { setTiempo(0); setActivo(false); }}>
        Reiniciar
      </button>
    </div>
  );
}

export default App;
