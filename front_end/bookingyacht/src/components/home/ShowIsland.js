import i_content from '../../assets/image_1.webp';
import './Home.scss';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import HaLong from '../../assets/Ha-Long.webp';
import LanHa from '../../assets/vinh-lan-ha.jpg';
import CatBa from '../../assets/Intro-Cat-Ba.webp';
const ShowIsland = () => {
    return (
        <>
            <div className='island-header text-center my-5'>
                <div className='yacht-title'>
                    <h2>Các điểm đến của Mixivivu</h2>
                </div>
                <p>
                    Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên
                </p>
                <div>
                    <img src={i_content} />
                </div>
            </div>
            <div className='island-body'>
                <NavLink to='/duthuyen' className='nav-link'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={HaLong} />
                        <Card.Body>
                            <Card.Title>Vịnh Hạ Long</Card.Title>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </NavLink>

                <NavLink to='/duthuyen' className='nav-link'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={CatBa} />
                        <Card.Body>
                            <Card.Title>Đảo Cát Bà</Card.Title>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </NavLink>
                <NavLink to='/duthuyen' className='nav-link'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={LanHa} />
                        <Card.Body>
                            <Card.Title>Vịnh Lan Hạ</Card.Title>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </NavLink>
            </div>
        </>
    )
}

export default ShowIsland;