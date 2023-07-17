import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import 'react-calendar/dist/Calendar.css';
import s from "./Product.module.css";
import { fetchProducts } from "../../services/Store/productSlice";

export const Product = () => {
    const product = useSelector(state => state.product.products);
    const dispatch = useDispatch()
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts(Number(params.id)))
    }, [params, dispatch])

    const formatDate = (date) => {
        if (typeof date === 'string') {
          date = new Date(date);
        }
      
        if (typeof date === 'object' && date instanceof Date) {
          return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          });
        }
        return '';
      };

    const onHandleGoBack = () => {
        const path = "/"
        navigate(path);
    }

    return (
        <div>
            <header>
                <p className={s.title}>{localStorage.getItem("number")}</p>
                <p className={s.subtitle}>Продукция произведенная по заказу-наряду</p>
            </header>
            <ListGroup horizontal={'lg'} className="my-2">
                <ListGroup.Item style={{ width: "25%" }}>ID</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Серийный номер</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Масса, кг</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Дата производства</ListGroup.Item>
            </ListGroup>
                {product.map((item) => (
            <ListGroup horizontal={'lg'} className="my-2" key={item.id}>
                     <ListGroup.Item style={{ width: "25%" }}>{item.id}</ListGroup.Item>
                     <ListGroup.Item style={{ width: "25%" }}>{item.serial}</ListGroup.Item>
                     <ListGroup.Item style={{ width: "25%" }}>{item.weight}</ListGroup.Item>
                     <ListGroup.Item style={{ width: "25%" }}>{formatDate(item.date)}</ListGroup.Item>
            </ListGroup>
                ))}
                <IoChevronBackCircleOutline className={s.icon_big} onClick={() => onHandleGoBack()} />
            </div>
    )
}