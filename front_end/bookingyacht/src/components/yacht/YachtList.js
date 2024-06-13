
import './FindYacht.scss';
import { RiShipLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from 'react';
// import { getAllYacht } from '../../services/ApiServices';
import { getAllYacht } from '../../services/ApiServices'
import axios from 'axios';
import MainPage from '../detailYacht/mainDetailPage/MainPage';

// import ReactPaginate from 'react-paginate';
const ShowYacht = () => {
    const [yacht, setYacht] = useState([]);
    const [selectedYacht, setSelectedYacht] = useState([]);

    // useEffect(() => {
    //     getAllYacht();
    // })
    // const getAllYacht = async () => {
    //     let res = await getAllYacht();
    //     setYacht(res.data.data)
    //     console.log(res.data.data)
    //     console.log("check yacht", yacht)
    // }
    useEffect(() => {
        axios.get('http://localhost:8080/api/customer/allYacht')
            .then((response) => {
                setYacht(response.data.data)
                console.log(response.data)
                console.log(response.data.data)
            })
    }, [])

    const handleSelectYacht = (idYacht) => {
        setSelectedYacht(idYacht);  // Update state with selected yacht ID
    }

    return (
        <div className="infor-body">
            {
                yacht.map((yacht, index) => {
                    return (
                        <div class="card row" key={yacht.idYacht} onClick={() => { handleSelectYacht(yacht.idYacht) }}>
                            <div className="col-md-5">
                                <img style={{ height: '220px', width: '330px' }} class="card-img-top" src={`http://localhost:8080/api/customer/file/${yacht.image}`} alt="Card image cap" />
                            </div>
                            <div class="card-body col-md-7">
                                <div className='card-content'>
                                    <div className='location'><FaLocationDot />{yacht.location.name}</div>
                                    <h1 className='name'>{yacht.name}</h1>
                                    <p style={{ margin: '0px' }}>Hạ thủy: {yacht.launch} - Vỏ Tàu {yacht.hullBody}</p>
                                    <div style={{ fontWeight: 'bold' }}> <RiShipLine /> {yacht.itinerary} </div>
                                    <div className='price'>
                                        <p style={{ color: 'orange', fontWeight: '500' }}>Price: 3.3350.000đ</p>
                                        <button style={{ backgroundColor: '#0EC0C3', color: 'white', borderRadius: 25 }} className='btn'>Đặt Ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {selectedYacht && <MainPage yachtId={selectedYacht} />}

            {/* <div class="card row" >
                <div className="col-md-5">
                    <img class="card-img-top" src={img_yacht} alt="Card image cap" />
                </div>
                <div class="card-body col-md-7">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>

            <div class="card row" >
                <div className="col-md-5">
                    <img class="card-img-top" src={img_yacht} alt="Card image cap" />
                </div>
                <div class="card-body col-md-7">
                    <div>Dia Diem</div>
                    <div>Ten Du thuyen</div>
                    <div><RiShipLine />1 Ha Thuy</div>
                    <div>Tien</div>
                </div>
            </div> */}

            {/* <ReactPaginate
                nextLabel="Next >"
                // onPageChange=
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={3}
                previousLabel="< Prev"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            /> */}

        </div>
    );
};

export default ShowYacht;