import { useParams } from 'react-router-dom';

type Params = { id: string };

const checkForm = () => {
    const { id } = useParams<Params>()
    if (id) return true
}

export default checkForm;