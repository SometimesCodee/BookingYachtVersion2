import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordByEmail } from '../../services/ApiServices';
import { useTranslation } from 'react-i18next';

export default function ChangePassword1() {

  const { email } = useParams();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const handleCheck = async (event) => {
    event.preventDefault()

    if (!password) {
      toast.error(t('forgot.errinput'))
    } else {
      if (password === rePassword) {
        await changePasswordByEmail(email, password)
        toast.success(t('changepass.success'));
        navigate('/signin')
      } else {
        toast.error(t('changepass.errconfirm'))
      }
    }
  }

  const { t } = useTranslation();

  return (
    <div className=" py-3 py-md-5 my-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-lg">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h2 className="h3">{t('forgot.forgotpass')}</h2>
                    <h3 className="fs-6 fw-normal text-secondary m-0">
                      {t('changepass.createpass')}
                    </h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleCheck}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label className="form-label">
                      {t('changepass.newpass')} <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(password) => setPassword(password.target.value)}
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">
                      {t('changepass.confirm')} <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(rePassword) => setRePassword(rePassword.target.value)}
                      type="password"
                      className="form-control"
                      name="rePassword"
                      id="rePassword" />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button className="btn btn-lg btn-primary">
                        {t('changepass.dochange')}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
