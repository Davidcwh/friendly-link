import IntroContent from "../content/IntroContent.json";
import MiddleBlockContent from "../content/MiddleBlockContent.json";
import StatsContent from "../content/StatsContent.json";
import LockContent from "../content/LockContent.json";
import Container from "../common/Container";
import ScrollToTop from '../common/ScrollToTop';
import ContentBlock from '../components/ContentBlock';
import MiddleBlock from '../components/MiddleBlock';
import Header from '../components/Header';
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <>
        <Header/>
        <Container>
            <ScrollToTop/>
            <ContentBlock
                type="right"
                title={IntroContent.title}
                content={IntroContent.text}
                button={IntroContent.button}
                icon="developer.svg"
                id="intro"
                hasBar={true}
            />
            <MiddleBlock
                title={MiddleBlockContent.title}
                content={MiddleBlockContent.content}
                id="intro2"
            />
            <ContentBlock
                type="left"
                title={StatsContent.title}
                content={StatsContent.text}
                icon="graphs.svg"
                id="feature1"
            />
            <ContentBlock
                type="right"
                title={LockContent.title}
                content={LockContent.text}
                icon="search.svg"
                id="feature2"
            />
        </Container>
        <Footer/>
        </>
    )
};

export default LandingPage;
