import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
import './index.css';

interface IAluno {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}
const Alunos: React.FC = () => {
    const [alunos, setAlunos] = useState<IAluno[]>([])
    const history = useHistory()
    useEffect(() => {
        loadAlunos()
    }, [])
    async function loadAlunos() {
        const response = await api.get('/alunos')
        console.log(response);
        setAlunos(response.data)
    }
    function formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY')
    }
    function newAluno() {
        history.push('/alunos_cadastro')
    }
    function editAluno(id: number) {
        history.push(`/alunos_cadastro/${id}`)
    }
    function viewAluno(id: number) {
        history.push(`/alunos/${id}`)
    }
    async function finishedAluno(id: number) {
        await api.patch(`/alunos/${id}`)
        loadAlunos()
    }
    async function deleteAluno(id: number) {
        await api.delete(`/alunos/${id}`)
        loadAlunos()
    }
    return (
        <div className="container">
            <br />
            <div className="aluno-header">
                <h1>Aluno</h1>
                <Button variant="dark" size="sm" onClick={newAluno}>Nova
                    Tarefa</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Data de Atualização</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alunos.map(aluno => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.title}</td>
                                <td>{formatDate(aluno.updated_at)}</td>
                                <td>{aluno.finished ? "Finalizado" :
                                    "Pendente"}</td>
                                <td>
                                    <Button size="sm"
                                        disabled={aluno.finished} variant="primary" onClick={() =>
                                            editAluno(aluno.id)}>Editar</Button>{' '}
                                    <Button size="sm"
                                        disabled={aluno.finished} variant="success" onClick={() =>
                                            finishedAluno(aluno.id)}>Finalizar</Button>{' '}
                                    <Button size="sm" variant="warning"
                                        onClick={() => viewAluno(aluno.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger"
                                        onClick={() => deleteAluno(aluno.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
export default Alunos;