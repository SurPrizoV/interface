import s from "./NotFound.module.css"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className={s.not_found}>
            <p className={s.title}>Такой страницы не существует</p>
            <Link className={s.link} to="/">
                <button className={s.button}>Вернуться</button>
            </Link>
        </div>
    )
}