import { basePageWrap } from '../BasePage'
import { StreamField } from '@/components/StreamField'
import ClientComponent from '@/components/ClientDataExample'

const AboutPage = (props) => {
    return (
        <div>
            <p>Автор: {props.author}</p>
            <p>Дата: {props.date}</p>
            <StreamField value={props.body} />
            <ClientComponent />
        </div>
    )
}

export default basePageWrap(AboutPage)
