import React from 'react' 
import './common-section.css'
import {Container,Row,Col} from 'reactstrap'; 
const CommonSection=({title}) {
    return (
        <section className='common-section'>
            <Container>
                <Row>
                    <Col>
                        <h1>{title}</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default CommonSection
