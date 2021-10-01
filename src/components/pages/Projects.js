import Message from '../layouts/Message';
import LinkButton from '../layouts/LinkButton';
import Container from '../layouts/Container';
import ProjectCard from '../projects/ProjectCard';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Projects.module.css';

function Projects() {
    const [projects, setProjects] = useState([])
    const URL = 'http://localhost:5000/projects'
    const location = useLocation();
    let message = '';

    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {

        fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
            })
            .catch((err) => console.log(err))

    }, [])


    return (
        <div className={styles.project_container}>
            {message && (
                <Message msg={message} type="success"/>
            )}
            
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
                            />
                        ))
                    )

                }
            </Container>
        </div>
    )
}

export default Projects;