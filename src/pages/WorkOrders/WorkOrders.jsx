import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../components/Search/Search";
import { fetchOrders } from "../../services/Store/orderSlice";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import s from "./WorkOrders.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { IoPencilOutline } from "react-icons/io5";
import { IoReaderOutline } from "react-icons/io5";

export const WorkOrders = () => {
    const workOrders = useSelector(state => state.order.orders.results)
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterOption, setFilterOption] = useState('Все');
    const { status, error } = useSelector(state => state.order);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch])

    const filteredWorkOrders = workOrders && workOrders.filter((order) => {
        return order.number.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1;
    });

    const onHandleFilterOption = (option) => {
        setFilterOption(option);
    }

    const filteredOrdersByFilterOption = () => {
        if (filterOption === 'Все') {
            return filteredWorkOrders;
        } else if (filterOption === 'Завершенные') {
            return filteredWorkOrders.filter((order) => order.is_finished === true);
        } else if (filterOption === 'Не завершенные') {
            return filteredWorkOrders.filter((order) => order.is_finished === false);
        }
    }

    const onHandleEditOrder = (id) => {
        const path = `/edit_order/${id}`
        navigate(path);
    }

    const onHandleGetProducts = (id, number) => {
        localStorage.setItem("number", number);
        localStorage.setItem("ID", id)
        const path = `/products/${id}`
        navigate(path);
    }

    const onHandleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={s.work_order}>
            <header>
                <p className={s.title}>Наряд на производство</p>
                <div className={s.header_items}>
                    <Search setSearchKeyword={setSearchKeyword} />
                    <DropdownButton id="dropdown-basic-button" title="Фильтр" onSelect={onHandleFilterOption}>
                        <Dropdown.Item eventKey="Все">Все</Dropdown.Item>
                        <Dropdown.Item eventKey="Завершенные">Завершенные</Dropdown.Item>
                        <Dropdown.Item eventKey="Не завершенные">Не завершенные</Dropdown.Item>
                    </DropdownButton>
                </div>
            </header>
            <ListGroup horizontal={'lg'} className="my-2">
                <ListGroup.Item style={{ width: "25%" }}>Номер</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Завершен</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Дата начала, планируемая</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Продукция</ListGroup.Item>
                <ListGroup.Item style={{ width: "25%" }}>Редактирование/Продукция</ListGroup.Item>
            </ListGroup>
            <div className={s.options}>
                {status === "loading" && <Spinner />}
                {error && <p>Ошибка на сервере: {error}</p>}
            </div>
            {workOrders && filteredOrdersByFilterOption().map((workorder) => (
                <ListGroup key={workorder.id} horizontal={'lg'} className="my-2">
                    <ListGroup.Item style={{ width: "25%" }}>{workorder.number}</ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}>{workorder.is_finished === true ? <IoChevronDownCircleOutline className={s.icon} /> : <IoCloseCircleOutline className={s.icon} />}</ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}>{workorder.start_date}</ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}>{workorder.product.name}</ListGroup.Item>
                    <ListGroup.Item style={{ width: "25%" }}><IoPencilOutline className={`${s.icon} ${s.hover}`} onClick={() => onHandleEditOrder(workorder.id)} /> / <IoReaderOutline className={`${s.icon} ${s.hover}`} onClick={() => onHandleGetProducts(workorder.id, workorder.number)} /></ListGroup.Item>
                </ListGroup>
            ))}
            <Button as="input" type="button" value="Выйти" onClick={() => onHandleLogout()} />
        </div>
    )
}