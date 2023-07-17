import s from "./NotFound.module.css"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate()

    const onHandleGoBack = () => {
        const path = "/";
        navigate(path);
    }

    return (
        <div className={s.not_found}>
            <p className={s.title}>Такой страницы не существует</p>
            <Button as="input" type="button" value="Вернуться на главную" onClick={() => onHandleGoBack()} />
        </div>
    )
}