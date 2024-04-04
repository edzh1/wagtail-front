import { basePageWrap } from '../BasePage'

const AboutPage = (props) => {
    return (
        <div>
            <p>Company name: {props.companyName}</p>
        </div>
    )
}
// export default basePageWrap(AboutPage)
export default AboutPage
