import styles from "./Register.module.css"
import { useState } from "react"

const Register = () => {
    const [form, setForm] = useState({
        
        name: "",
        apellido:"",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        name: "",
        apellido: "",
        email: "",
        password: ""
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
    });
    validateField(name, value);
    }

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors };
        switch (fieldName) {
            case "name":
                newErrors.name = value.length < 2 ? "El nombre debe tener al menos 2 caracteres" : "";
                break;
            case "lastname":
                newErrors.lastname = value.length < 2 ? "El apellido debe tener al menos 2 caracteres" : "";
                break;
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Debe ingresar un correo electrónico.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = "Debe ingresar un correo electrónico válido.";
                } else {
                    newErrors.email = "";
                }
                break;
            case "password":
                
                if (!value.trim()) {
                    newErrors.password = "Debe ingresar una contraseña.";
                } else if (value.length < 6) {
                    newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
                } else if (!/(?=.*[A-Z])/.test(value)) {
                    newErrors.password = "La contraseña debe contener al menos una letra mayúscula.";
                } else if (!/(?=.*\d)/.test(value)) {
                    newErrors.password = "La contraseña debe contener al menos un número.";
                } else {
                    newErrors.password = "";
                }
                break;
            default:
                break;

        }
        setErrors(newErrors);
    }
    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Validar cada campo del formulario
        Object.keys(form).forEach((fieldName) => {
            validateField(fieldName, form[fieldName]);
            if (newErrors[fieldName] !== "") {
                isValid = false;
            }
        });
                // Actualizar el estado de errores
                setErrors(newErrors);
                setSubmitButtonDisabled(!isValid);
        
                return isValid;
            };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = axios.post('http://localhost:3000/users/register', {user:form});
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div style={{marginTop:"150px",
        backgroundColor:"rgba(64, 27, 113, 0.73)",
        color:"rgb(237, 216, 80)",
        textShadow: "2px 2px 1px black",
        borderRadius:"15px"
        }}>
            <h1 style={{
                color:"violet",
                textShadow: "3px 3px 4px #000000",
                textAlign:"center"}}>Registro</h1>
            <form  className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.lb}>Nombre</label>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
                <label className={styles.lb}>Apellido</label>
                <input
                    className={styles.input}
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleInputChange}
                    required
                />
                {errors.apellido && <p className={styles.error}>{errors.lastname}</p>}
                <label className={styles.lb}>Email</label>
                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
                <label className={styles.lb}>Password</label>
                <input

                    className={styles.input}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    required
                />
                {errors.password && <p className={styles.error}>{errors.password}</p>}
                
            </form>
        </div>
    )
}
export default Register