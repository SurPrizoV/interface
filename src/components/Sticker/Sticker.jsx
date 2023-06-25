import s from "./Sticker.module.css"

export const Sticker = ({ weight, setActiveModal }) => {
    return (
        <div className={s.sticker}>
            <p className={s.title}>Название продукта</p>
            <p>Серия продукта:</p>
            <p>Вес продукта: {weight}</p>
            <p>Дата производства: </p>
            <button className={s.button} onClick={() => setActiveModal(false)}>Печать</button>
        </div>
    )
}