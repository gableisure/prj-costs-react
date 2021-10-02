import styles from './ProjectCard.module.css';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, budget, category, handleRemove }) {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{ name }</h4>
            <div className={styles.container_card}>
                <span>Orçamento: </span> 
                <p className={styles.budget}>R$ {budget}</p>
                <p className={styles.category_text}>
                    <span className={`${styles[category.name.toLowerCase()]}`}></span> {category.name}
                </p>
                <div className={styles.project_card_actions}>
                    <Link to={`/project/${id}`}>
                        <BsPencil /> Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill /> Remover
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ProjectCard;