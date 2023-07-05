import {useState, useEffect, useRef} from "react";
import {link,route,routes} from "react"
import DetalleProducto from "./DetalleProducto";

function Productos () {

    const [productos,setProductos] = useState(["Cargando..."]);
    const [details,setDetails] = useState('');

    const viewDetail = (product) => {
        console.log(product);
        setDetails(product);
    }; 
    const handleReset = () => {
        setDetails('');
        console.log(details)
    }


    useEffect(()=>{
        fetch("http://localhost:3000/catalogo/listaApi")
        .then (res=>res.json())
        .then(data => {
            setProductos(data)
        })
        .catch(e=>console.log(e))
    },[])

    return (
        <>
            {details == '' && (
            <div>
                <h3>Cantidad de productos: {productos.total}</h3>
                <ul>
                        {/* {productos.map((producto, i) => (
                            <>
                                <li key={i} onClick={() => viewDetail(producto)}> {producto.name} </li>
                            </>
                        ))} */}
                </ul>
                
            </div>)}
            
            {details !== '' && (
            <DetalleProducto
                details={details}
            >
                <button onClick={handleReset}>Regresar</button>
            </DetalleProducto>)}
        </>
    )
}

export default Productos