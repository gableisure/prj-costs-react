import styles from './NewProject.module.css'
import ProjectForm from '../projects/ProjectForm';
import { useHistory } from 'react-router-dom'

function NewProject() {

    const URL = 'http://localhost:5000/projects'
    const history = useHistory();

    function createPost(project) {
        project.cost = 0;
        project.services = [];


        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                history.push('/projects', { message: 'Projeto criado com sucesso!' })
            }).catch((err) => { console.log(err) });
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject;