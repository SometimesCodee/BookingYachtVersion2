import FormSearch from "../home/FormSearch";
import './FindYacht.scss';
import i_content from '../../assets/image_1.webp';
import Form from 'react-bootstrap/Form';
import ShowYacht from "./YachtList";
const FindYacht = () => {
    return (
        <div className="find-yacht-body">
            <div className="find-yacht-content container">
                <div className="search-yacht">
                    <FormSearch />
                </div>
                <div className='feedback-header my-5 row'>
                    <div className='yacht-title col-md mx-4'>
                        <h2>Tìm Thấy <br /> Kết Quả</h2>
                        <div>
                            <img src={i_content} />
                        </div>
                    </div>
                    <div className='select col-md mx-4'>
                        <Form.Select size="lg">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>

                </div>
                <div className="result-search row">
                    <div className="col-3 filter-body">
                        <div className="filter-body-header d-flex">
                            <div className="filter-body-content">
                                Lọc Kết Quả
                            </div>
                            <div>
                                <button>
                                    Đặt Lại
                                </button>
                            </div>
                        </div>

                        <hr />

                        <div className="filter-star d-flex">
                            <div className="star-body-content">
                                Xếp hạng sao
                            </div>

                            <Form.Check id="3sao" label='3 Sao' />
                            <Form.Check id="4sao" label='4 Sao' />
                            <Form.Check id="5sao" label='5 Sao' />
                        </div>
                        <div className="filter-extention d-flex">
                            <div className="extention-body-content">
                                Tiện ích
                            </div>
                            <Form.Check id="" label='Phòng gia đình' lab />
                            <Form.Check id="" label='Có bể sục' />
                            <Form.Check id="" label='Bao gồm tất cả các bữa ăn' />
                        </div>
                    </div>

                    <div className="col-1"></div>

                    <div className="col-8 infor">
                        <ShowYacht />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default FindYacht;