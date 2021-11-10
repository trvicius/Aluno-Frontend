import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';

interface IAluno {
    title: string;
    description: string;
}
const Alunos: React.FC = () => {
    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [model, setModel] = useState<IAluno>({
        title: '',
        description: ''
    })
    useEffect(() => {
        console.log(id)
        if (id != undefined) {
            findAluno(id)
        }
    }, [id])
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (id != undefined) {
            const response = await api.put(`/alunos/${id}`, model)
        }
        else {
            const response = await api.post('/alunos', model)
        }
        back()
    }
    function back() {
        history.goBack()
    }
    async function findAluno(id: string) {
        const response = await api.get(`alunos/${id}`)
        console.log(response)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }
    return (
        <div className="container">
            <br />
            <div className="aluno-header">
                <h1>Novo Aluno</h1>
                <Button variant="dark" size="sm"
                    onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={(e:
                                ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={model.description}
                            onChange={(e:
                                ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
export default Alunos;