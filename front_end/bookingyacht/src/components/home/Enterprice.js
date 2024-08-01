import { useEffect, useState } from 'react';
import i_content from '../../assets/image_1.webp';
import { getAllCompany } from '../../services/ApiServices';
import { useTranslation } from 'react-i18next';

const Enterprice = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getAllCompany()
            .then(res => {
                setCompanies(res.data.data.filter(c => c.exist === 1));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const { t } = useTranslation();

    return (
        <div className='p-5'>
            <div className='enterprice-header row'>
                <div className='enterprice-title col-md mx-4'>
                    <h4 style={{ fontWeight: 'bold', fontSize: '30px' }}>{t('business.message1')}
                        <br />{t('business.message2')} </h4>
                    <div>
                        <img src={i_content} alt="content" />
                    </div>
                </div>
                <p style={{ width: "500px", color: '#475467', fontSize: '18px' }} className='col-md mx-4'>
                    {t('business.message3')}
                </p>
            </div>
            <div className='img-enterprice container'>
                {companies.map(company => (
                    <div key={company.id}>
                        <img src={company.logo} alt={company.logo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Enterprice;
