import videoHomePage from '../../assets/duthuyenhalong.mp4';
import Enterprice from './Enterprice';
import Feedback from './Feedback';
import './Home.scss';
import ShowIsland from './ShowIsland';
import ShowYacht from './ShowYacht';

const HomePage = (props) => {

    return (
        <div>
            <div className='homepage-container'>
                <div>
                    <video autoPlay muted loop>
                        <source src={videoHomePage} />
                    </video>
                </div>
                <div className='homepage-content border container '>
                    <form className='mb-3 serach-yacht'>
                        <div className='text-center'>
                            <h2>Ban Lua Chon Du Thuyen Ha Long Nao ?</h2>
                            <p>Co Rat Nhieu Tour Du Lich Dang cho Ban</p>
                        </div>
                        <div className='form-search'>
                            <div className='d-flex'>
                                {/* <CiSearch /> */}
                                <input type='text' placeholder='Nhap Ten Du Thuyen' className='form-control col-3' />
                            </div>
                            <div>
                                {/* <FaMapMarkerAlt /> */}
                                <select className='form-select'>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div>
                                <select className='form-select'>
                                    <option>1</option>
                                </select>
                            </div>
                            <button size='lg'>Tìm Kiếm</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='app-yacht container'>
                <ShowYacht />
            </div>


            <div className='feedback-content'>
                <Feedback />
            </div>

            <div className='app-show-island container'>
                <ShowIsland />
            </div>

            <div className='app-enterprice'>
                <Enterprice />
            </div>

            <div className='app-blog'>
                Blog
            </div>

        </div>
    )
}
export default HomePage;