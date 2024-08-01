import React from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaArrowRightLong } from "react-icons/fa6";

const Map = () => {
    const { t } = useTranslation();
    return (
        <div>
            {/* <h4>Quy định chung và lưu ý</h4>
            <p>Bạn có thể xem Quy định chung và lưu ý: Tại đây<FaArrowRightLong /></p> */}
            <h4>{t('map.message1')}</h4>
            <Alert variant="info" className="d-flex align-items-center mt-3">
                <i className="bi bi-info-circle-fill me-2"></i>
                <div>
                    <p className="mb-0">
                        <strong>{t('map.message2')}</strong>
                    </p>
                    <ul>
                        <li>
                            {t('map.message3')}
                        </li>
                        <li>
                            {t('map.message4')} <a href="https://docs.google.com/document/d/1mEUXbaHQZmmjGfAuyuYHpRQimyt0y0YJRWjLZnvCa7U/edit" target='_blank'>{t('map.message5')}</a>.
                        </li>
                    </ul>
                </div>
                <button
                    type="button"
                    className="btn-close ms-auto"
                    aria-label="Close"
                ></button>
            </Alert>
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

export default Map;