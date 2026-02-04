import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [touched, setTouched] = useState({ email: false, password: false });

    // Validaciones
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'El email es requerido';
        if (!emailRegex.test(email)) return 'Email no válido';
        return '';
    };

    const validatePassword = (password) => {
        if (!password) return 'La contraseña es requerida';
        if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
        if (password.length > 20) return 'La contraseña no puede tener más de 20 caracteres';
        // Opcional: agregar más validaciones
        // if (!/[A-Z]/.test(password)) return 'Debe contener al menos una mayúscula';
        // if (!/[0-9]/.test(password)) return 'Debe contener al menos un número';
        // if (!/[!@#$%^&*]/.test(password)) return 'Debe contener al menos un carácter especial';
        return '';
    };

    // Validar cuando cambian los campos
    useEffect(() => {
        if (touched.email) {
            setErrors(prev => ({ ...prev, email: validateEmail(email) }));
        }
        if (touched.password) {
            setErrors(prev => ({ ...prev, password: validatePassword(password) }));
        }
    }, [email, password, touched]);

    const handleBlur = (field) => () => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Geolocalización no soportada");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );

                        const data = await res.json();

                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            "Ciudad desconocida";

                        const country = data.address.country || "País desconocido";

                        resolve(`${city}, ${country}`);
                    } catch (err) {
                        reject("Error obteniendo ubicación");
                    }
                },
                () => reject("Permiso de ubicación denegado")
            );
        });
    };

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({
            email: emailError,
            password: passwordError
        });

        setTouched({
            email: true,
            password: true
        });

        return !emailError && !passwordError;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            alert('Por favor, corrige los errores en el formulario');
            return;
        }

        setLoading(true);
        try {
            const location = await getLocation();
            console.log(location.latitude, location.longitude);

            const res = await axios.post('http://localhost:4000/auth/login', {
                email,
                password,
                location,
            });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Error en el servidor");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!validateForm()) {
            alert('Por favor, corrige los errores en el formulario');
            return;
        }

        setLoading(true);
        try {
            const location = await getLocation();

            const res = await axios.post('http://localhost:4000/auth/signup', {
                email,
                password,
                location,
            });
            alert(res.data.message || "Usuario registrado exitosamente");
        } catch (err) {
            const errorMsg = err.response?.data?.message ||
                err.response?.data?.error ||
                "Error en el registro";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Verificar si el formulario es válido para habilitar/deshabilitar botones
    const isFormValid = !errors.email && !errors.password && email && password;

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Bienvenido</h2>
                <p className="subtitle">Inicia sesión o crea una cuenta</p>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        onBlur={handleBlur('email')}
                        className={touched.email && errors.email ? 'error' : ''}
                    />
                    {touched.email && errors.email && (
                        <span className="error-message">{errors.email}</span>
                    )}
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Contraseña (mínimo 8 caracteres)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handleBlur('password')}
                        className={touched.password && errors.password ? 'error' : ''}
                    />
                    {touched.password && errors.password && (
                        <span className="error-message">{errors.password}</span>
                    )}
                    <div className="password-info">
                        <small>Mínimo 8 caracteres, máximo 20</small>
                    </div>
                </div>

                <button
                    className="btn primary"
                    onClick={handleLogin}
                    disabled={loading || !isFormValid}
                >
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>

                <button
                    className="btn secondary"
                    onClick={handleSignup}
                    disabled={loading || !isFormValid}
                >
                    Registrarse
                </button>

                <div className="form-info">
                    <p><small>Al registrarte, aceptas nuestros términos y condiciones</small></p>
                    <p><small>Se solicitará permiso para acceder a tu ubicación</small></p>
                </div>
            </div>
        </div>
    );
}