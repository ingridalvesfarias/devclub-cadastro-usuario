import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'

import Button from '../../../components/Button'
import TopBackground from '../../../components/TopBackground'
import Trash from '../../../assets/trash.svg'

import {
    Container,
    Title,
    ContainerUsers,
    CardUsers,
    TrashIcon,
    AvatarUser
} from './styles'

function ListUsers() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getUsers() {
            const { data } = await api.get('/usuarios')

            setUsers(data)
        }
        getUsers()
    }, [])

    useEffect(() => {

        async function getUsers() {
            const { data } = await api.get('/usuarios')
            console.log(data)
        }
        getUsers()
    }, [])

    async function deleteUser(id) {
        await api.delete(`/usuarios/${id}`)

        const updatedUsers = users.filter(user => user.id !== id)

        setUsers(updatedUsers)
    }

    // TODA VEZ que a tela carregar, o useEffect é chamado
    // TODA VEZ que uma determinada variável MUDA de valor, ele é chamado

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>

            <ContainerUsers>
                {users.map(user => (
                    <CardUsers key={user.id}>
                        <AvatarUser src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user.name}`} alt='avatar' />
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.age}</p>
                            <p>{user.email}</p>
                        </div>
                        <TrashIcon src={Trash} alt="Lixeira" onClick={() => deleteUser(user.id)} />
                    </CardUsers>
                ))}

            </ContainerUsers>
            <Button type="button" onClick={() => navigate('/')}>Voltar</Button>
        </Container>
    )
}

export default ListUsers
