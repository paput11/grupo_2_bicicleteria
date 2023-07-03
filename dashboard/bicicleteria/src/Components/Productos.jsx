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
    }


    useEffect(()=>{
        fetch("http://localhost:3000/catalogo//listaApi")
        .then (res=>res.json())
        .then(data => {
            console.log("data: ", data)
            setProductos(data.data)
        })
        .catch(e=>console.log(e))
    },[])

    return (
        <>
            {details == '' && (
            <div>
                <h3>Cantidad de productos: {productos.length}</h3>
                <ul>
                    {/* {productos.map(producto(i)=>{<li key = i>{producto}</li>})} */}
                    {productos.map((producto, i) => (
                        <>
                            <li key={i} onClick={() => viewDetail(producto)}> {producto.name} </li>
                        </>
                    ))}
                </ul>
                
            </div>)}
            {details !== '' && (
            <DetalleProducto
                details={details}
                reset={handleReset}
            />)}
        </>
    )
}

export default Productos