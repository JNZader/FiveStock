import styled, { keyframes } from "styled-components"; // 1. Importar keyframes
import { Link } from "react-router-dom";
import { DataModulosConfiguracion } from "../../utils/dataEstatica";
import { Mensaje } from "../moleculas/Mensaje";

// 2. Definir la animación para la entrada de las tarjetas
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 3. Crear un componente estilizado para aplicar la animación con retardo
const CardLink = styled(Link)`
  /* ... (Copiaremos aquí los estilos de .card) ... */
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 260px;
  flex-direction: column;
  position: relative;
  width: 300px;
  border: 1px solid transparent; /* Borde sutil por defecto */
  
  /* Animación */
  opacity: 0; /* Empieza invisible */
  animation: ${fadeInUp} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.index * 0.1}s; /* El truco está aquí: retardo dinámico */

  /* Transiciones suaves para todos los cambios */
  transition: all 0.3s ease-in-out; 

  /* Eliminamos el .card:hover de aquí porque lo manejaremos directamente en CardLink */
  &:hover {
    border-color: ${(props) => (props.disabled ? "#D9534F" : props.theme.bg5)}; /* Borde rojo si está deshabilitado, azul si no */
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
    
    .card-image img {
      filter: grayscale(0);
    }
  }

  /* El resto de los estilos que estaban en .card se aplican aquí */
  &::before,
  &::after {
    border-radius: inherit;
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
  }

  &::before {
    z-index: 3;
  }

  &::after {
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.15),
      transparent 40%
    );
    z-index: 1;
  }

  & > .card-content {
    background-color: ${({ theme }) => theme.bgcards};
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    inset: 1px;
    padding: 10px;
    position: absolute;
    z-index: 2;
  }
`;

export function ConfiguracionTemplate() {
  // Pequeña función para manejar el efecto de brillo en las tarjetas
  const handleOnMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <Container>
      <div id="cards">
        {DataModulosConfiguracion.map((item, index) => {
          return (
            // 4. Usar el nuevo componente CardLink y pasarle el index
            <CardLink
              to={item.state ? item.link : ""}
              key={index}
              index={index}
              onMouseMove={handleOnMouseMove}
              disabled={!item.state}
            >
              <Mensaje state={item.state} />
              <div className="card-content">
                <div className="card-image">
                  <img src={item.icono} alt={item.title} />
                </div>
                <div className="card-info-wrapper">
                  <div className="card-info">
                    {/* 5. Se elimina el ícono genérico de unicornio */}
                    <div className="card-info-title">
                      <h3>{item.title}</h3>
                      <h4>{item.subtitle}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </CardLink>
          );
        })}
      </div>
    </Container>
  );
}

// Se simplifica el CSS de Container ya que los estilos de card se movieron a CardLink
const Container = styled.div`
  background-color: ${({ theme }) => theme.bgtotal};
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  
  #cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px; /* Un poco más de espacio */
    max-width: 650px; /* Ajustado para el nuevo gap */
    width: 100%;
    justify-content: center;
  }
  
  /* Se mueven los estilos de tipografía y de imagen aquí para no repetirlos en CardLink */
  h3, h4 {
    font-family: "Poppins", sans-serif; /* Usamos una fuente más consistente con el resto de la app */
    margin: 0px;
  }

  h3 {
    font-size: 1.1em;
    font-weight: 600;
    color: ${({ theme }) => theme.colortitlecard};
  }

  h4 {
    color: ${({ theme }) => theme.colorsubtitlecard};
    font-size: 0.85em;
    margin-top: 8px;
    font-weight: 400; /* Un peso más ligero para el subtítulo */
  }

  .card-image {
    align-items: center;
    display: flex;
    height: 140px;
    justify-content: center;
    
    img {
      transition: all 0.3s ease;
      height: 60px; /* Un tamaño de ícono más definido */
      width: 60px;
      filter: grayscale(100%);
      opacity: 0.7;
    }
  }

  .card-info-wrapper {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    padding: 0px 20px;
  }

  .card-info {
    align-items: flex-start;
    display: flex;
    gap: 10px;
  }
`;