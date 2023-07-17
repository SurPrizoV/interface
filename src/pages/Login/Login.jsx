import s from "./Login.module.css"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, handlePassword } from "../../services/Store/userSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Authorization } from "../../services/Store/userSlice";
import { UserContext } from "../../services/Context/UserContext";

export const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const data = useSelector(state => state.user.data);
    const { status, error } = useSelector(state => state.user)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (login !== "" && password !== "") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        dispatch(handleLogin({ login }));
        dispatch(handlePassword({ password }));
        setIsButtonDisabled(status === "loading" && true);
    }, [login, password, dispatch, status])

    const onHandleSubmit = async (event) => {
        event.preventDefault();
        await dispatch(Authorization(data));
        const path = "/";
        navigate(path);
        setUser(localStorage.getItem("token"));
    }

    return (
        <Form onSubmit={onHandleSubmit} className={s.form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" placeholder="Введите логин" value={login} onChange={(e) => setLogin(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isButtonDisabled}>
                Войти
            </Button>
            <div className={s.options}>
                {status === "loading" && <Spinner />}
                {error && <p>{error}</p>}
            </div>
        </Form>
    )
}