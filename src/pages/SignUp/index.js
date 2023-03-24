import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {useContext, useState} from 'react';
import './signup.css';
import { AuthContext } from '../../contexts/auth';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){
           await signUp(email, password, name)
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo Sistema de Chamados'/>
                    <div>
                        <h1>Tickets System</h1>
                        <h3>Gerenciador de Chamados</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastre-se</h1>
                    <input type='text' placeholder='nome' value={name} onChange={(e)=> setName(e.target.value)}/>
                    <input type='text' placeholder='email@email.com' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    <input type='password' placeholder='******' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    
                    <button type='submit'>
                        {loadingAuth ? 'Carregando...' :  'Cadastrar'}
                    </button>
                    <Link to='/'>Já possui uma conta? Faça login!</Link>
                </form>
            </div>
        </div>
    )
}