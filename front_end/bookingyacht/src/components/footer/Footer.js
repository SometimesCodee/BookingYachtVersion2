import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_swp.png'
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className="footer-content row" style={{ fontWeight: 'bold', backgroundColor: '#101828' }}>
            <div className='content-1 col-md-3'>
                <img alt='logo' src={logo} />
                <label>{t('footer.message1')}<br />
                    <br />{t('footer.message2')}<br />
                    <br />{t('footer.message3')}  <br />
                    {t('footer.message4')} <br />{t('footer.message5')}
                </label>
            </div>
            <div className='col-md'>
                <div className='content-2 row'>
                    <div className='body col-md'>
                        <span>{t('footer.message6')}</span>
                        <NavLink className='nav-link'>{t('footer.message7')}</NavLink>
                        <NavLink className='nav-link'>About Me</NavLink>
                        <NavLink className='nav-link'>Hotline</NavLink>
                        <NavLink className='nav-link'>Email:YachtCrise@gmail.com</NavLink>
                    </div>
                    <div className='body col-md'>
                        <span>{t('footer.message10')}</span>
                        <NavLink className='nav-link'>Vịnh Hạ Long</NavLink>
                        <NavLink className='nav-link'>Đảo Cát Bà</NavLink>
                        <NavLink className='nav-link'>Vịnh Lan Hạ</NavLink>
                    </div>
                    <div className='body col-md'>
                        <span>{t('footer.message11')}</span>
                        <NavLink className='nav-link'>Blog</NavLink>
                        <NavLink to='/yacht-rule' className='nav-link'>{t('footer.message9')}</NavLink>
                        <NavLink to='/yacht-question' className='nav-link'>{t('footer.message9')}</NavLink>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Footer;