import {useState, useEffect, useRef} from "react";

function Productos () {

    const [productos,setProductos] = useState(["Cargando..."])

    useEffect(()=>{
        fetch("http://localhost:3000/catalogo//listaApi")
        .then (res=>res.json())
        .then(data=>setProductos([data]))
        .catch(e=>console.log(e))
    },[])

    return (
        <>
            <div>
                <h3>Cantidad de productos: {console.log(productos.total)}</h3>
                
            </div>

        </>
    )
}

export default Productos