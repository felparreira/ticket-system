import './header.css';
import avatarImg from '../../assets/avatar.png';
import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import {FiBook, FiUsers, FiSettings, FiSkipBack} from 'react-icons/fi';

export default function Header(){
    const {user, logout} = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome)

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt='Foto do Usuário' />
                <h4>{nome}</h4>
            </div>            
            <Link to='/dashboard'>
                <FiBook color="#fff" size={24} />
                Tickets
            </Link>

            <Link to='/all-customers'>
                <FiUsers color="#fff" size={24} />
                Clientes
            </Link>

            <Link to='/profile'>
                <FiSettings color="#fff" size={24} />
                Perfil
            </Link>

            <Link to='' onClick={()=>logout()}>
                <FiSkipBack color="#fff" size={24} />
                Sair
            </Link>
        </div>        
    )
}