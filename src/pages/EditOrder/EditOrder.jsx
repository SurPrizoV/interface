import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Spinner from "react-bootstrap/Spinner";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoCalendarNumberOutline } from "react-icons/io5";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import s from "./EditOrder.module.css";
import { handleOrderChange, handleOrderSave } from "../../services/Store/orderSlice";
import { fetchNomenclature } from "../../services/Store/nomenclatureSlice";

export const EditOrder = () => {
    const order = useSelector(state => state.order.orderById);
    const { status, error } = useSelector(state => state.order);
    const nomenclature = useSelector(state => state.nomenclature.nomenclature);
    const [orderNumber, setOrderNumber] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [orderIsFinished, setOrderIsFinished] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [show, setShow] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(handleOrderChange(Number(params.id)));
        setOrderIsFinished(order.is_finished);
        dispatch(fetchNomenclature());
    }, [dispatch, params, order.is_finished])

    const onHandleCalendarModal = () => {
        setShow(!show);
    }

    const onHandleChangeFinished = () => {
        setOrderIsFinished(!orderIsFinished);
    }

    const formatDate = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return "";
    };

    const onHandleSaveOrder = (id, number, date, finished, material, product) => {
        dispatch(handleOrderSave({ id, number, date, finished, material, product }));
        const path = "/";
        navigate(path);
    }

    const onHandleGoBack = () => {
        const path = "/"
        navigate(path);
    }

    return (
        <div>
            <header>
                <p className={s.title}>{order.number}</p>
            </header>
            <div className={s.options}>
                {status === "loading" ? <Spinner /> : <><ListGroup horizontal={'lg'} className="my-2">
                    <ListGroup.Item style={{ width: "150%" }}>ID</ListGroup.Item>
                    <ListGroup.Item style={{ width: "150%" }}>{order.id}</ListGroup.Item>
                </ListGroup>
                    <ListGroup horizontal={'lg'} className="my-2">
                        <ListGroup.Item style={{ width: "150%" }}>Номер</ListGroup.Item>
                        <ListGroup.Item style={{ width: "150%" }}>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={orderNumber ? orderNumber : order.number}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                />
                            </InputGroup>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal={'lg'} className="my-2">
                        <ListGroup.Item style={{ width: "150%" }}>Дата начала, планируемая</ListGroup.Item>
                        <ListGroup.Item style={{ width: "150%" }}>
                            <div className={s.date}>
                                <InputGroup size="sm" className="mb-3">
                                    <Form.Control
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={orderDate ? formatDate(orderDate) : order.start_date}
                                    />
                                </InputGroup>
                                <IoCalendarNumberOutline className={s.icon} onClick={() => onHandleCalendarModal()} />
                                <Modal show={show} onHide={onHandleCalendarModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Календарь</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ display: "flex", justifyContent: "center" }}><Calendar onChange={setOrderDate} value={orderDate} /></Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={onHandleCalendarModal}>
                                            Закрыть
                                        </Button>
                                        <Button variant="primary" onClick={onHandleCalendarModal}>
                                            Сохранить
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal={'lg'} className="my-2">
                        <ListGroup.Item style={{ width: "150%" }}>Завершен</ListGroup.Item>
                        <ListGroup.Item style={{ width: "150%" }}>{orderIsFinished === true ? <IoChevronDownCircleOutline className={s.icon} onClick={() => onHandleChangeFinished()} /> : <IoCloseCircleOutline className={s.icon} onClick={() => onHandleChangeFinished()} />}</ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal={'lg'} className="my-2">
                        <ListGroup.Item style={{ width: "150%" }}>Сырье</ListGroup.Item>
                        <ListGroup.Item style={{ width: "150%" }}>
                            <DropdownButton id="dropdown-basic-button" title={selectedMaterial.name ? selectedMaterial.name : (order.material && order.material.name)}>
                                {nomenclature && nomenclature.map((item) => (
                                    <Dropdown.Item href={`#/action-${item.id}`} key={item.id} onClick={() => setSelectedMaterial(item)}>{item.name}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup horizontal={'lg'} className="my-2">
                        <ListGroup.Item style={{ width: "150%" }}>Продукция</ListGroup.Item>
                        <ListGroup.Item style={{ width: "150%" }}>
                            <DropdownButton id="dropdown-basic-button" title={selectedProduct.name ? selectedProduct.name : (order.product && order.product.name)}>
                                {nomenclature && nomenclature.map((item) => (
                                    <Dropdown.Item href={`#/action-${item.id}`} key={item.id} onClick={() => setSelectedProduct(item)}>{item.name}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className={s.navigation}>
                        <IoChevronBackCircleOutline className={s.icon_big} onClick={() => onHandleGoBack()} />
                        <Button as="input" type="button" value="Сохранить" onClick={() => onHandleSaveOrder(order.id, orderNumber ? orderNumber : order.number, orderDate ? formatDate(orderDate) : order.start_date, orderIsFinished, selectedMaterial.id ? selectedMaterial.id : order.material.id, selectedProduct.id ? selectedProduct.id : order.product.id)} />
                    </div></>}
                {error && <p>Ошибка на сервере: {error}</p>}
            </div>

        </div>
    )
}