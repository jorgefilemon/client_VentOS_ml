import { ProductsContext } from "../Contexts/Context";
import { useContext } from "react";
import "./table.css";

const Table = () => {
  const { products, setproducts } = useContext(ProductsContext);


  // SELECTED AND RESETS DISCOUNTS, ETC IF PRODUCT IS ALREADY SELECTED
  const getActivated = (myIndex) => {
    setproducts(
      products.map((product, index) =>
        index === myIndex ?
          product.edited ?
            {
              ...product,
              precio: product.precio1,
              descuento: 0,
              rebaja: 0,
              inapam: false,
              ajuste: false,
              off: false,
              active: false,
              edited: false,
              cambioPrecio: false,
              devolucion: false,
              cantidad: 1,
            }
            :
            { ...product, active: true }
          :
          { ...product, active: false }
      )
    );
  };

  const deleteproduct = (myIndex, e) => {
    e.stopPropagation();
    setproducts(products.filter((product, index) => index !== myIndex));

  };


  return (
    <div className='product-table'>
      <table >
        <thead>
          <tr>
            <th>borrar</th>
            <th>descripcion</th>
            <th>desc.</th>
            <th>rebaja</th>
            <th>precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              className={
                product.cambioCliente ?
                  'cambioCliente-background'
                  :
                  product.vale ?
                    'vale-background'
                    :
                    product.devolucion ?
                      "devolucion-background"
                      : product.inapam ?
                        "inapam-background"
                        : product.off ?
                          "descuento-background" :
                          product.cambioPrecio ? "cambioPrecio-background"
                            // : product.active && product.ajuste ?
                            //   "active-ajuste-background"
                            : product.ajuste ?
                              "ajuste-background"
                              : product.active ?
                                "active-background"
                                : null
              }
              onClick={() => getActivated(index)}
              key={index}
            >
              <td>
                <button
                  className="borrar-btn"
                  onClick={(e) => deleteproduct(index, e)}
                >
                  X
                </button>
              </td>
              <td>{product.descripcion}</td>
              <td>{product.descuento}%</td>
              <td>{new Intl.NumberFormat('en-US',
                { style: 'currency', currency: 'USD' }).format(product.rebaja)}</td>
              <td>{new Intl.NumberFormat('en-US',
                { style: 'currency', currency: 'USD' }).format(product.precio)}</td>
            </tr>


          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Table;
