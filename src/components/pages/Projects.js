import Message from '../layouts/Message';
import LinkButton from '../layouts/LinkButton';
import Container from '../layouts/Container';
import Loading from '../layouts/Loading';
import ProjectCard from '../projects/ProjectCard';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Projects.module.css';

function Projects() {
    const [projects, setProjects] = useState([])
    const [projectMessage, setProjectMessage] = useState('')
    const [removeLoading, setRemoveLoading] = useState(false)
    const URL = 'http://localhost:5000/projects'
    const location = useLocation();
    let message = '';

    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {

        setTimeout(() => {
            fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 500)

    }, [])

    function removeProject(id) {
        
        
        fetch(URL + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                /* Retorna todos os projetoss que tenham o id diferente do id a ser excluido. E depois atualiza o estado da variavel projects */
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            }).catch((err) => console.log(err))

    }

    return (
        <div className={styles.project_container}>
            {message && <Message msg={message} type="success"/>}
            {projectMessage && <Message msg={projectMessage} type="success"/>}
            
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Novo Projeto"/>
            </div>
            
            

            <Container className="start">
                {projects.length > 0 && (
                        projects.map((project) => (
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category}
                                key={project.id}
                                handleRemove={removeProject}
                            />
                        ))
                    )
                }
                {!removeLoading && <Loading />}
                
            </Container>
        </div>
    )
}

export default Projects;