import { FaArrowRightLong } from "react-icons/fa6";
import './Schedule.scss';
const Schedule = () => {
    return (
        <div>
            <h2>Quy định chung và lưu ý</h2>
            <p>Bạn có thể xem Quy định chung và lưu ý: Tại đây<FaArrowRightLong /></p>
            <h2>Câu hỏi thường gặp</h2>
            <p>Bạn có thể xem Câu hỏi thường gặp: Tại đây<FaArrowRightLong /></p>
            <h2>Bản đồ lịch trình</h2>
            <div className="note">
                <h4>Thông tin cần biết:</h4>
                <p>Du thuyền Du thuyền Milalux xuất phát từ Cảng tàu khách quốc tế Tuần Châu, Hạ Long, Quảng Ninh, Việt Nam</p>
                <p>Bạn có thể xem chi tiết lịch trình 2 ngày 1 đêm.. <a href="https://docs.google.com/document/d/16cu5TBw8Yq8DJnSlxgP30eb_dQc5IjA9lDCd75M6_4E/edit">tại đây</a></p>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29816.29640121529!2d106.952697!3d20.910829!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5ec6c1fba745%3A0xd8c824609119f9db!2zQ-G6o25nIHTDoHUga2jDoWNoIFF14buRYyB04bq_IFR14bqnbiBDaMOidQ!5e0!3m2!1svi!2sus!4v1716522660592!5m2!1svi!2sus"
                width="1000"
                height="450"
                style={{ borderRadius: 20 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>

    )
};

export default Schedule;