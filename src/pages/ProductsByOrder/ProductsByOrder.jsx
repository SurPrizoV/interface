import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./ProductsByOrder.module.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { getProductsByOrder } from "../../services/ApiServices/ApiServices";
import { Modal } from "../../components/Modal/Modal"
import { Sticker } from "../../components/Sticker/Sticker";

export const ProductsByOrder = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [weight, setWeight] = useState("");
    const [activeModal, setActiveModal] = useState(false);

    useEffect(() => {
        getProductsByOrder(Number(params.id)).then((data) => {
            setData(data);
        })
    }, [params])

    const onHandleSaveProduct = () => {
        setActiveModal(true)
    }

    return (
        <div className={s.product_by_order}>
            <p className={s.title}>Производственный процесс</p>
            <div className={s.params}>
                <input className={s.input} type="text" placeholder="Введите массу" onKeyPress={(event) => {
                    const charCode = (event.which) ? event.which : event.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                        event.preventDefault();
                    }
                }} onChange={(e) => { setWeight(e.target.value) }} />
                <button className={s.button} onClick={() => onHandleSaveProduct()}>Сохранить</button>
            </div>
            <p className={s.subtitle}>Произведенная продукция</p>
            {data.map((item) => (
                <div className={s.items} key={item.id}>
                    <p>Серия: {item.serial}</p>
                    <p>Вес: {item.weight}</p>
                    <p>Дата: {item.date}</p>
                </div>
            ))}
            <Link className={s.icon_back} to="/">
                <IoArrowBackCircle />
            </Link>
            <Modal active={activeModal} setActive={setActiveModal}>
                <Sticker weight={weight} setActiveModal={setActiveModal} />
            </Modal>
        </div>
    )
}