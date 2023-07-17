import s from "./Search.module.css";
import { IoSearchSharp } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Search = ({ setSearchKeyword }) => {
    const handleInputChange = (event) => setSearchKeyword(event.target.value);

    return (
        <div className={s.search}>
            <IoSearchSharp className={s.icon} />
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Введите номер наряда"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleInputChange}
                />
            </InputGroup>
        </div>
    )
}