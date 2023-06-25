import { useNavigate } from "react-router-dom";
import s from "./SignUp.module.css";
import { useEffect, useState } from "react";
import { Authorization } from "../../services/ApiServices/ApiServices";

export const SignUp = ({ login, setLogin, password, setPassword }) => {
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (login !== "" && password !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [login, password])

    const onHandleSignUp = () => {
        Authorization(login, password).then((data) => {
            localStorage.setItem("user", login);
            localStorage.setItem("token", data.token);
        });
        const path = "/";
        navigate(path);
    }

    return (
        <div className={s.sign_up}>
            <p className={s.title}>Регистрация пользователя</p>
            <input className={s.input} type="text" placeholder="Введите логин" onChange={(e) => { setLogin(e.target.value) }} />
            <input className={s.input} type="password" placeholder="Введите пароль" onChange={(e) => { setPassword(e.target.value) }} />
            <button className={disabled ? `${s.hidden}` : `${s.button}`} disabled={disabled} onClick={() => onHandleSignUp()}>Войти</button>
        </div>
    )
}