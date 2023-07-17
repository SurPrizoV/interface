import s from "./ItemOnMain.module.css";
import { IoAddSharp } from "react-icons/io5";

export const ItemOnMain = ({item, handleChange, handleAdd}) => {
    return (
        <div className={s.item}>
            <p className={s.info} onClick={()=>handleChange()}>{item}</p>
            <p className={s.info} onClick={()=>handleAdd()}>{<IoAddSharp />}Добавить</p>
        </div>
    )
}