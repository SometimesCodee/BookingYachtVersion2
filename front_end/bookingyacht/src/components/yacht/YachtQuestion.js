import i_content from '../../assets/image_1.webp';
import './YachtRule.scss'
const YachtQuestion = () => {
    return (
        <div className="container">
            <div className='rule-yacht-header row'>
                <div className='rule-title col-md mx-4'>
                    <h1>Quy Dinh Chung Va Luu Y</h1>
                    <div>
                        <img src={i_content} alt='' />
                    </div>
                </div>
            </div>

            <div className='rule-yacht-content'>


                <div className='content'>
                    <div className='content-text'>
                        <h5>Dịch vụ xe đưa đón có bao gồm trong giá tour không?</h5>
                        <p>Xe đưa đón 2 chiều không bao gồm trong giá tour. Quý khách có thể đặt thêm dịch vụ này.</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-text'>
                        <h5>Nhà hàng của du thuyền phục vụ bữa ăn theo phong cách gì?</h5>
                        <p>Thực đơn của nhà hàng sẽ được phục vụ các món ăn theo phong cách Việt và Âu. Nếu quý khách có yêu cầu riêng,
                            vui lòng thông báo trước ít nhất 03 ngày với du thuyền.</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-text'>
                        <h5>Tôi có được phép mang thú cưng lên tàu không?</h5>
                        <p>Thú cưng không được phép mang lên du thuyền.</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Du thuyền có dịch vụ massage không? </h5>
                        <p>Có. Du thuyền cung cấp dịch vụ massage chuyên nghiệp và có tính phí không bao gồm trong giá tour</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Nếu ngày đi tour của tôi đúng vào sinh nhật thì có ưu đãi gì không?</h5>
                        <p>Nếu ngày sinh nhật của quý khách đúng vào ngày đi tour, du thuyền sẽ tặng quý khách 01 bánh sinh nhật nhỏ. Ngoài ra, du thuyền còn nhận đặt dịch vụ (tính phí) với các yêu cầu đặc biệt như: trang trí giường, phòng hay chuẩn bị bàn ăn riêng. Quý khách vui lòng liên hệ nhân viên của chúng tôi để có thêm những thông tin chi tiết hơn.</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Trên tàu có WIFI không? </h5>
                        <p>Tín hiệu Wifi trên tàu sẽ không được ổn định khi tàu đi qua một số khu vực trên Vịnh.</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Tàu có phụ thu vào cuối tuần không? </h5>
                        <p>Du thuyền có phụ thu vào dịp cuối tuần. Quý khách sẽ được nhân viên tư vấn của chúng tôi thông tin khi có ngày đặt phòng cụ thể.</p>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-text'>
                        <h5>Du thuyền có tour mấy ngày? </h5>
                        <p>Du thuyền cung cấp chương trình tour 02 ngày 01 đêm hoặc 03 ngày 02 đêm.</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Thời gian di chuyển từ bến ra tàu có lâu không? </h5>
                        <p>Đối với một số tàu, du khách có thể lên tàu trực tiếp mà không cần phải di chuyển bằng cano cao tốc. Hoặc nếu có di chuyển bằng cano thì thời gian di chuyển chỉ khoảng 10-15 phút.</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Du thuyền có cung cấp dịch vụ chèo kayak không? </h5>
                        <p>Các tàu đều cung cấp dịch vụ chèo kayak có tính phí hoặc không tính phí trong giá tour. Quý khách có thể liên hệ với nhân viên tư vấn của chúng tôi để biết thêm mức phí này</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Phụ nữ mang thai có thể lên tàu không? </h5>
                        <p>Phụ nữ mang thai có thể lên tàu nhưng không được khuyến khích tham gia các hoạt động tham quan.</p>
                    </div>
                </div>
                <div className='content'>
                    <div className='content-text'>
                        <h5>Đồ uống có bao gồm trong giá tour không? </h5>
                        <p>Du thuyền phục vụ: trà, cà phê và 02 chai nước lọc miễn phí tại mỗi phòng/01 đêm nghỉ. Những đồ uống khác sẽ được phục vụ tại quầy bar trên tàu có tính phí và không bao gồm trong giá tour.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default YachtQuestion;