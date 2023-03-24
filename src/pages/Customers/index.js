import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiUser} from 'react-icons/fi';
import {useState} from 'react';
import {db} from '../../services/firebaseConnection';
import { addDoc, collection} from 'firebase/firestore';
import {toast} from 'react-toastify';

export default function Customer(){

    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleRegister(e){
        e.preventDefault();

            if(nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"),{
                nomefantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
            setNome('')
            setCnpj('')
            setEndereco('')
            toast.success('Empresa cadastrada com sucesso!')
            })
            .catch((error)=>{
                toast.error('Erro ao cadastrar!')
            })
        }else{
            toast.error('Preencha todos os campos!')
        }
    }
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Novo Cliente">
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Nome Fantasia:</label>
                        <input type='text' placeholder='Nome da Empresa' value={nome} onChange={(e)=>setNome(e.target.value)} />

                        <label>CNPJ:</label>
                        <input type='text' placeholder='CNPJ da Empresa' value={cnpj} onChange={(e)=>setCnpj(e.target.value)} />

                        <label>Endereço:</label>
                        <input type='text' placeholder='Endereço da Empresa' value={endereco} onChange={(e)=>setEndereco(e.target.value)} />

                        <button type='submit'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}