import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/ApiServices";
import { toast } from "react-toastify";
import Language from '../header/Language';
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error(t('forgot.errinput'));
    } else {
      let res = await verifyEmail(email);
      if (res && res.data && res.data.data === true) {
        toast.success(t('forgot.checkmail'));
        navigate(`/verifyOTP/${email}`);
      } else {
        toast.error(t('forgot.erremail'));
      }
    }
  };

  const { t } = useTranslation();

  return (
    <div className="py-3 py-md-5 my-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-lg">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <div className="d-flex justify-content-between">
                      <h2 className="h3">{t('forgot.forgotpass')}</h2>
                      <Nav>
                        <Language />
                      </Nav>
                    </div>
                    <h3 className="fs-6 fw-normal text-secondary m-0">
                      {t('forgot.emailinput')}
                    </h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleVerify}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary">
                        {t('forgot.vertymail')}
                      </button>
                    </div>
                    <div className="text-center">
                      <NavLink to="/signin" className="my-4">
                        {t('forgot.back')}
                      </NavLink>
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
};

export default ForgotPassword;
