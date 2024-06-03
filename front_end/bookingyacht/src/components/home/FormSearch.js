import React from 'react';
import './Home.scss';

const FormSearch = () => {
    return (
        <div>
            <form className='mb-3 serach-yacht'>
                <div className='text-center'>
                    <h2>Ban Lua Chon Du Thuyen Ha Long Nao ?</h2>
                    <p>Co Rat Nhieu Tour Du Lich Dang cho Ban</p>
                </div>
                <div className='form-search'>
                    <div className='d-flex'>
                        {/* <CiSearch /> */}
                        <input type='text' placeholder='Nhap Ten Du Thuyen' className='form-control col-3' />
                    </div>
                    <div>
                        {/* <FaMapMarkerAlt /> */}
                        <select className='form-select'>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div>
                        <select className='form-select'>
                            <option>1</option>
                        </select>z
                    </div>
                    <button size='lg'>Search</button>
                </div>
            </form>
        </div>
    );
};

export default FormSearch;