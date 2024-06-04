
import img_yacht from '../../assets/no53ab0y526yl825.webp';
import './FindYacht.scss';
import { RiShipLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
const ShowYacht = () => {
    return (
        <div className="infor-body">
            <div class="card row" >
                <div className="col-md-5">
                    <img class="card-img-top" src={img_yacht} alt="Card image cap" />
                </div>
                <div class="card-body col-md-7">
                    <div className='card-content'>
                        <div className='location'><FaLocationDot />Vịnh Hạ Long</div>
                        <div className='name'>Du thuyền Heritage Bình Chuẩn Cát Bà</div>
                        <div> <RiShipLine /> Ha thuy 2019 - Tau vo kim loai - 20 phong </div>
                        <div className='price'>
                            <p>3,3350,000d/khach</p>
                            <button className='btn btn-primary'>Dat Ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card row" >
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
            </div>

            <ReactPaginate
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
            />

        </div>
    );
};

export default ShowYacht;