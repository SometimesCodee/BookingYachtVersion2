import i_content from '../../assets/image_1.webp';
import './YachtRule.scss'
const YachtRule = () => {
    return (
        <div className="container">
            <div className='rule-yacht-header row'>
                <div className='rule-title col-md mx-4'>
                    <h1>Quy Dinh Chung Va Luu Y</h1>
                    <div>
                        <img src={i_content} />
                    </div>
                </div>
            </div>

            <div className='rule-yacht-content'>


                <div className='content'>
                    <div className='content-text'>
                        <h5>Thời gian nhận phòng</h5>
                        <p>Giờ nhận phòng từ 12h15-12h30. Nếu quý khách không sủ dụng dịch vụ xe đưa đón của tàu và tự di chuyển, vui lòng có mặt tại bến tàu muộn nhất là 11h45 để làm thủ tục trước khi lên tàu.</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-text'>
                        <h5>Thời gian nhận phòng</h5>
                        <p>Giờ nhận phòng từ 12h15-12h30. Nếu quý khách không sủ dụng dịch vụ xe đưa đón của tàu và tự di chuyển, vui lòng có mặt tại bến tàu muộn nhất là 11h45 để làm thủ tục trước khi lên tàu.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default YachtRule;