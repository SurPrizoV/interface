import s from "./Main.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWorkOrders } from "../../services/ApiServices/ApiServices";

export const Main = () => {
    const [product, setProduct] = useState([]);

    const onHandleSignout = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        getWorkOrders().then((data) => {
            setProduct(data.results);
        });
    }, [])

    return (
        <div className={s.main}>
            <p className={s.title}>Список заказов-нарядов</p>
            <div className={s.items}>
                {product.map((item) => (
                    <div className={s.item} key={item.id}>
                        <Link className={s.item_info} to={`/products/${item.id}`}>
                            <p>{item.number}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <button className={s.button} onClick={() => onHandleSignout()}>Выйти</button>
        </div>
    )
}