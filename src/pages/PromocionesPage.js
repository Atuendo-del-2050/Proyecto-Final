import React, { useState, useEffect } from "react";
import axios from 'axios';
import PromocionItem from '../components/promociones/PromocionItem';


const PromocionesPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [promociones, setPromociones] = useState([]);

    useEffect(() => {
        const cargarPromociones = async () => {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacto`, formData);
            setPromociones(response.data);
            setLoading(false);
        };
        cargarPromociones();
    }, []);

    return (
        <section className="holder">
            <h2>Promociones</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                promociones.map(item => <PromocionItem key={item.id}
                    title={item.titulo} 
                    subtitle={item.subtitulo}
                    imagen={item.imagen}
                    body={item.cuerpo} />)
            )}
            <div class="Promociones">
                <h3>50% off en vestidos que superen los $100k</h3>
                <h4>25% off en vestidos cortos</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nulla sed nostrum. Soluta, impedit
                    necessitatibus. Consequuntur animi, aliquid dicta accusantium sequi qui aut vitae, facilis hic earum
                    ratione, mollitia sint.</p>

            </div>
            <div className="Promociones">
                <h3>2x1</h3>
                <h4>Promo válida hasta el 15 de Diciembre</h4>
                <h6>(o hasta agotar stock, lo que suceda primero...)</h6>  </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nulla sed nostrum. Soluta, impedit
                necessitatibus. Consequuntur animi, aliquid dicta accusantium sequi qui aut vitae, facilis hic earum
                ratione, mollitia sint.</p>
            <div />

        </section>
    );
}
export default PromocionesPage;