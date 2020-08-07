import React from 'react'
import WhatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'


const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/52892885?s=460&u=2e190a18038c4aa72ffe1144e4f151d5c28953c0&v=4" alt="Imagem de perfil" />

                <div>
                    <strong>DevSp</strong>
                    <span>Programação</span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de química avançada.
                <br /> <br />
                Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                </p>

                <button type='button'>
                    <img src={WhatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem
