import '../styles/components/pages/ContactoPage.css';
import React, { useState } from "react";
import axios from 'axios'
import { useLinkClickHandler } from 'react-router-dom';

const ContactoPage = (props) => {

    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            oldData,
            [name]: value //forma dinamica
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const response = await
            axios.post(`${process.env.REACT_APP_API_URL}/api/contacto`, formData);
        setSending(false);
        setMsg(response.data.message);
        if (response.data.error === false) {
            setFormData(initialForm)
        }
    }
    <form className='formulario' onSubmit={handleSubmit}>
        <p>
            <label>Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </p>
        <p>
            <label>Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </p>
        <p>
            <label>Telefono</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
        </p>
        <p>
            <label>Comentario</label>
            <textarea name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
        </p>
        {sending ? <p>Enviando...</p> : null}
        {msg? <p>{msg}</p> : null}
        <p className="centrar"><input type="submit" value="Enviar" /></p>
    </form>
}

export default ContactoPage;