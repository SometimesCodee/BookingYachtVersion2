import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/ApiServices';
import { GrFormNextLink } from "react-icons/gr";
import i_content from '../../assets/image_1.webp'

const ShowYacht = (props) => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        allUser(2);

    }, []);

    const allUser = async (page) => {
        let res = await getUser(page);
        if (res && res.data && res.data.data) {
            setListUser(res.data.data);
        }
    }

    return (
        <>

            <div className='yacht-header row'>
                <div className='yacht-title col-md'>
                    <h4>du Thuyền Mới<br /> Và Phổ Biến Nhất</h4>
                    <div>
                        <img src={i_content} />
                    </div>
                </div>
                <label style={{ width: "488px" }} className='col-md'>
                    Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và phổ biến nhất.Khám phá một hành trình tuyệt vời đưa bạn vào thế giới của sự sang trọng,tiện nghi và trải nghiệm không thể quên.
                </label>
            </div>
            <div className='yacht-content '>
                {listUser && listUser.length > 0 && listUser.map((item, index) => {
                    return (
                        <NavLink key={index} to='/duthuyen' className='nav-link'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.avatar} />
                                <Card.Body>
                                    <Card.Title>{`${item.first_name} ${item.last_name}`}</Card.Title>
                                    <Card.Text>
                                        {item.email}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </NavLink>
                    )
                })
                }
            </div>
            <div className='view-all-yacht d-flex'>
                <NavLink to='/duthuyen' className='nav-link'>
                    <button>
                        Xem Tất Cả
                        <GrFormNextLink className='icon-next ml-2' />
                    </button>
                </NavLink>
            </div>
        </>
    )

}

export default ShowYacht;