
import { FiX } from 'react-icons/fi'
import './modal.css';

export default function Modal({ conteudo, close }){
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={ close }>
          <FiX size={20} color="#FFF" />
          Fechar
        </button>

        <main>
          <h2>Detalhes do chamado:</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>
            <span>
              Data Cadastro: <i>{conteudo.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status: 
              <i className="status-badge" style={{ color: "#FFF", backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999' }}>
                {conteudo.status}
              </i>
            </span>
          </div>

          {conteudo.mensagem !== '' && (
          <>
            <h3>Mensagem:</h3>
            <p>
            {conteudo.mensagem}
            </p>
          </>
          )}

        </main>
      </div>
    </div>
  )
}