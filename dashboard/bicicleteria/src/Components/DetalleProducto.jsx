import React, { useEffect, useState } from 'react';

function DetalleProducto(details, children) {
    const [data, setData] = useState('')
    
    useEffect(() => {
        fetch(`http://localhost:3000/catalogo/detalleApi/${details.id}`)
        .then(res => res.json())
        .then((res) => {
            setData(res.data)
        })

    },[])
  return (
    <>
        {/* <h2>Detalle: {data.descripcion}</h2> */}
        
        {/* <h4> Precio: {data.precio}</h4> */}
        {/* <h4>Color {data.color}</h4> */}
        {/* <img src ={ data.image} alt= "Sin Imagen" ></img> */}
        <br></br>
        {children}

    </>
  )
}

export default DetalleProducto