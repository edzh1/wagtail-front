import { basePageWrap } from '../BasePage'

const AboutPage = (props) => {
    // console.log('AboutPage', props)

    return (
        <div>
            <p>Company name: {props.companyName}</p>
        </div>
    )
}

export default basePageWrap(AboutPage)
