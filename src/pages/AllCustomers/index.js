import { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiDelete } from 'react-icons/fi'

import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, startAfter, query, doc, deleteDoc, limit} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { format } from 'date-fns'
import {toast} from 'react-toastify'


const listRef = collection(db, "customers")

export default function AllCustomers(){

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const [customers, setCustomers] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true);
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        async function loadCustomers(){
          const q = query(listRef, orderBy('nomefantasia', 'asc'));
    
          const querySnapshot = await getDocs(q)
          setCustomers([]);
    
          await updateState(querySnapshot)
    
          setLoading(false);
    
        }
    
        loadCustomers();
    
    
        return () => { }
      }, [])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;
    
        if(!isCollectionEmpty){
          let lista = [];
    
          querySnapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomefantasia: doc.data().nomefantasia,
              cnpj: doc.data().cnpj,
              endereco: doc.data().endereco,              
            })
          })
    
          const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // Pegando o ultimo item
    
          setCustomers(customers => [...customers, ...lista])
        
    
        }else{
          setIsEmpty(true);
        }        
      }
      
    async function handleMore(){
        setLoadingMore(true);
    
        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs),  limit(1));
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);    
      }
      
    function toggleModal(item){
        setShowPostModal(!showPostModal)
        setDetail(item)
      }
    
      async function excluirCliente(id){
        const docRef = doc(db, "customers", id)
        await deleteDoc(docRef)
        toast.success("Cliente excluído com sucesso!")    
      }

    return(        
        <div>
            <Header/>
            <div className='content'>
                <Title name="Listagem de Clientes">
                    <FiMessageSquare size={25} />
                </Title>            

            <>
          {customers.length === 0 ? (
            <div className='container'>
              <span>Nenhum cliente encontrado...</span>
              <Link to="/customers" className="new">
                <FiPlus color="#FFF" size={25} />
                Novo Cliente
              </Link>  
            </div>
                ) : (
                    <>
                    <Link to="/customers" className="new">
                        <FiPlus color="#FFF" size={25} />
                        Novo Cliente
                    </Link>  

                    <table>
                        <thead>
                        <tr>
                            <th scope="col">Nome Fantasia</th>
                            <th scope="col">CNPJ</th>
                            <th scope="col">Endereço</th>                    
                            <th scope="col">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((item, index) => {
                            return(
                            <tr key={index}>
                                <td data-label="Nome">{item.nomefantasia}</td>
                                <td data-label="CNPJ">{item.cnpj}</td>
                                <td data-label="Endereço">{item.endereco}</td>                        
                                <td data-label="Ações">                                
                                <button className="action" onClick={()=>excluirCliente(item.id)}>                                    
                                    Excluir Cliente
                                </button>
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>   
                  
                        {loadingMore && <h3>Buscando mais clientes...</h3>}    
                        {!loadingMore && !isEmpty && (customers.length > 5) && <button className="btn-more" onClick={handleMore}>Buscar mais</button>  }  
                    </>
                )}          
                </>    
            </div>
        </div>
    )
}