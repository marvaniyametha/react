import generateUniqueId from 'generate-unique-id';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router'
import { getStorageData, setStorageData } from '../Services/Storage';

const Addmovie = () => {
    const initialState = {
        id: "",
        name: "",
        desc: "",
        price: "",
        Languages:"",
        category: "",
        img: ""
    };

    const navigate = useNavigate();
    const [inputForm, setInputForm] = useState(initialState);
    const [error, setError] = useState({})

    const validationForm = () => {
        let formError = {};

        if (inputForm.name == "") {
            formError.name = "Name is Not Empty"
        }
        if (inputForm.desc == "") {
            formError.desc = "Description is Not Empty"
        }
        if (inputForm.price == "") {
            formError.price = "Price is Not Empty"
        }
        if (inputForm.Languages == "") {
            formError.Languages = "Language is Not Empty"
        }
        if (inputForm.category == "") {
            formError.category = "Category is Not Empty"
        }
        if (inputForm.img == "") {
            formError.img = "Image is Not Empty"
        }

        setError(formError);

        return Object.keys(formError).length !== 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validationForm()) {
            inputForm.id = generateUniqueId({
                length: 3,
                useLetters: false
            })

            let oldData = getStorageData();
            oldData.push(inputForm);
            setStorageData(oldData);
            setInputForm(initialState);
            navigate('/')
        }

        // console.log(inputForm);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...inputForm,
            [name]: value
        });
        // console.log(e);
    };
    return (
        <>
            <Container>
                <h2 align="center">Add Movies</h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Movie Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control style={{ borderColor: error.name ? "red" : "" }} type="text" value={inputForm.name} placeholder="Movie Name" name="name" onChange={handleChange} />
                             {error.name ? <span>{error.name}</span> : ""}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control style={{ borderColor: error.desc ? "red" : "" }} type="text" value={inputForm.desc} placeholder="Movie Description" name="desc" onChange={handleChange} />
                            {error.desc ? <span>{error.desc}</span> : ""}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Category
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select style={{ borderColor: error.category ? "red" : "" }} name="category" value={inputForm.category} onChange={handleChange} >
                                <option>Select Movie Category</option>
                                {['Horror', 'Drama', 'Suspense', 'Comedy'].map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </Form.Select>
                            {error.category ? <span>{error.category}</span> : ""}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Languages
                        </Form.Label>
                        <Col sm="8">
                            <Form.Select style={{ borderColor: error.Languages ? "red" : "" }} value={inputForm.Languages} name="Languages" onChange={handleChange} >
                                <option>Select Movie Languages</option>
                                {['Gujarati', 'Hindi', 'English', 'Marathi', 'Telugu'].map((v, i) => (
                                    <option key={i} value={v}>{v}</option>
                                ))}
                            </Form.Select>
                            {error.Languages ? <span>{error.Languages}</span> : ""}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Ticket Price
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control style={{ borderColor: error.price ? "red" : "" }} value={inputForm.price} type="number" placeholder="Movie Ticket Price" name="price" onChange={handleChange} />
                            {error.price ? <span>{error.price}</span> : ""}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">
                            Ticket Image
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control style={{ borderColor: error.img ? "red" : "" }} type="text" value={inputForm.img}  placeholder="Enter Movie URL" name="img" onChange={handleChange} />
                            {error.img ? <span>{error.img}</span> : ""}
                        </Col>
                    </Form.Group>

                    <Button type="submit" className="px-4">
                        Add Movie
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Addmovie;