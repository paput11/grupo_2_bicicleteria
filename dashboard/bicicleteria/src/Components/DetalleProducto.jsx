import React from 'react'

function DetalleProducto(details, reset) {
  return (
    <>
        <h2>Detalle: {details.descricion}</h2>
        
        <h4> Precio: {details.precio}</h4>
        <h4>Color {details.color}</h4>
        <img src = {"http://localhost:3000/images/trek/"+ details.imagen} alt= "Sin Imagen" ></img>
        <br></br>
        <button onClick={reset}>Regresar</button>

    </>
  )
}

export default DetalleProducto