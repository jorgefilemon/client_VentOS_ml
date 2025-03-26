import styles from './invoice.module.css';
// import { useReactToPrint } from 'react-to-print';
// import { useRef } from 'react';


const Invoice = ({ passVenta, passDetallev, passEfectivoPago, passTarjetaPago }) => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.header}>
                <h3>Zapateria Lolita</h3>
                <br></br>
                <p>CSL190711J93</p>
                <p>Julian de los Reyes 226</p>
                <p>Colonia Centro</p>
                <p>CP 78000</p>
                <p>San Luis Potosi</p>
                <br></br>
                <p>ventas@zapaterialolita.com</p>
                <p>444 812 3404</p>
            </div>
            <div className={styles.ticketContainer}>
                <p>TICKET:{passVenta.ticket}</p>
                <p>FECHA: {passVenta.date}</p>
                <p>HORA:  {passVenta.time}</p>
            </div>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <td>Cant.</td>
                            <td>Precio</td>
                            <td>% Desc</td>
                            <td>Importe</td>
                        </tr>
                    </thead>
                    {passDetallev.map((product, index) => (
                        <tbody key={index}>
                            <tr >
                                <td colSpan={4}>{product.descripcion}</td>
                            </tr>
                            <tr>
                                <td>{parseFloat(product.cantidad).toFixed(0)}</td>
                                <td>{parseFloat(product.precioNorCon).toFixed(2)}</td>
                                <td>{parseFloat(product.descPorcentaje).toFixed(1)}%</td>
                                <td>{parseFloat(product.importeNorCon).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>


            </div>
            <div className={styles.venta}>
                <div><p>TOTAL:</p></div>
                <div><p>{passVenta.total}</p></div>
            </div>
            <br />
            <div className={styles.formaPago}>
                <div><p>Forma de pago</p></div>
            </div>
            <div className={styles.venta}>
                <div><p>EFECTIVO:</p></div>
                <div><p>{passEfectivoPago[0]?.total}</p></div>
            </div>
            <div className={styles.venta}>
                <div><p>TARJETA:</p></div>
                <div><p>{passTarjetaPago[0]?.total}</p></div>
            </div>
            <div className={styles.venta}>
                <div><p>CAMBIO:</p></div>
                <div><p>{passVenta.cambio}</p></div>
            </div>
            <div className={styles.garantia}>
                <p>GARANTIA DE CALZADO</p>
                <br></br>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus sit magnam eveniet. At quod illo nobis ipsam cumque quae ullam.</p>
            </div>
        </div>
    );
}

export default Invoice;