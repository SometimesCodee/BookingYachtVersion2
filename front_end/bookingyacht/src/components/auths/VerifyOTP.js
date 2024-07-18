import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTP } from "../../services/ApiServices";


export default function VerifyOTP() {
  const[otp, setOTP]=useState("")
  const navigate = useNavigate();
  const {email} = useParams();
  const handleVerify = async (event) => {
    event.preventDefault(); 

    if (!otp) {
      toast.error("Không được để trống!");
    } else {
      let res = await verifyOTP(email,otp);

      if (res && res.data && res.data.data === true) {
        navigate(`/changePasswordByEmail/${email}`)
      }else{
        toast.error("OTP không tồn tại");
      }
    }
  };


  return (
    <div className=" py-3 py-md-5 my-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-lg">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h2 className="h3">Quên mật khẩu</h2>
                    <h3 className="fs-6 fw-normal text-secondary m-0">
                      Nhập OTP được gửi trong email của bạn để khôi phục mật
                      khẩu.
                    </h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleVerify}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label className="form-label">
                      OTP <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(otp)=> setOTP(otp.target.value)}
                      type="text"
                      className="form-control"
                      name="otp"
                      id="otp"
                      placeholder="XXXXXX"
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button className="btn btn-lg btn-primary">
                        Xác thực OTP
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
