import { ProductsContext } from "../Contexts/Context";
import { useContext } from "react";
import "./nav.css";


const Nav = ({ setOpenModal, setPrice, setOpenAjuste, setOpenGenerarVale, setOpenUsarVale,
  setOpenDevolucionDinero, setModalsActive }) => {

  const { products, setproducts } = useContext(ProductsContext);

  const getInapam = () => {
    setproducts(
      products.map((product) =>
        product.active && product.edited !== 0
          ? {
            ...product,
            edited: true,
            inapam: true,
            scheme: 'inapam-background',
            precio: Math.floor(product.precio * 0.19) * 5,
            rebaja: (product.precio - Math.floor((product.precio * 0.95) / 5) * 5) * -1,
            descuento: parseFloat((100 - (Math.floor((product.precio * 0.95) / 5) * 500) / product.precio).toFixed(1)),
            active: false,
          }
          : product
      )
    );
  };

  const descuento = () => {
    products.map((product) =>
      product.active && !product.inapam && product.precio !== 0
        ? [setOpenModal(true), setPrice(product.precio)]
        : null
    );
  };


  // const devolucion = () => {
  //   setproducts(
  //     products.map((product) =>
  //       product.active && product.precio !== 0// && product.precio > 0 && !product.inapam
  //         ? {
  //           ...product,
  //           precio: product.precio * -1,
  //           cantidad: -1,
  //           active: false,
  //           edited: true,
  //           devolucion: true
  //         }
  //         : product
  //     )
  //   );
  // };


  const ajustePrecio = () => {
    products.map((product) =>
      product.active
        &&
        product.precio === product.precio1
        ?// para que no funcione si ya se le ajusto el precio.
        [setOpenAjuste(true), setPrice(product.precio1)]
        : null
    );
  };

  return (
    <nav className="nav-container">

      <button className="inapam-btn" onClick={() => getInapam()}>INAPAM</button>
      <button className="descuento-btn" onClick={() => [descuento(), setModalsActive(true)]}> Descuento </button>
      {/* <button className="devolucion-btn" onClick={() => devolucion()}>Devolucion Calzado</button> */}
      <button className="ajuste-btn" onClick={() => [ajustePrecio(), setModalsActive(true)]}>Devolucion Calzado</button>
      <button className="generar-vale-btn" onClick={() => [setOpenGenerarVale(true), setModalsActive(true)]} >Generar Vale</button>
      <button className="usar-vale-btn" onClick={() => [setOpenUsarVale(true), setModalsActive(true)]}>Usar Vale</button>
      <button className="devolucion-dinero-btn" onClick={() => [setOpenDevolucionDinero(true), setModalsActive(true)]} >Devolucion dinero</button>
      {/* <button className="salida_efectivo_btn">Salida Efectivo</button> */}


    </nav >
  );
};
export default Nav;
