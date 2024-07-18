import { useEffect, useState } from 'react';
import i_content from '../../assets/image_1.webp';
import { getAllCompany } from '../../services/ApiServices';

const Enterprice = () => {
    const [companies, setCompanies] = useState([]);
    const getImageApi = `http://localhost:8080/api/customer/file/`;

    useEffect(() => {
        getAllCompany()
            .then(res => {
                setCompanies(res.data.data.filter(c => c.exist === 1));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='p-5'>
            <div className='enterprice-header row'>
                <div className='enterprice-title col-md mx-4'>
                    <h4 style={{ fontWeight: 'bold', fontSize: '30px' }}>Danh Gia Tu Đối tác Cùng các
                        <br /> Hãng Du thuyền Lớn</h4>
                    <div>
                        <img src={i_content} alt="content" />
                    </div>
                </div>
                <p style={{ width: "500px", color: '#475467', fontSize: '18px' }} className='col-md mx-4'>
                    Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn
                </p>
            </div>
            <div className='img-enterprice container'>
                {companies.map(company => (
                    <div key={company.id}>
                        <img src={`${getImageApi}${company.logo}`} alt={company.logo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Enterprice;
