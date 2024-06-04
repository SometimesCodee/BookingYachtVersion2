import React from 'react';
import logo from '../../assets/sidebar.jpg'
const ViewFeedback = () => {
    return (
        <>
            <h2>Feedback</h2>

            <div className='row'>
                <div className='col-12 px-0'>
                    <div className="card my-4 mx-3 order-list">
                        <div className="gold-members p-4">
                            <a href="#">
                            </a>
                            <div className="media">
                                <a href="#">
                                    <img className="mr-4" src={logo} alt="Generic placeholder image" />
                                </a>
                                <div className="media-body">
                                    <a href="#">
                                        <span className="float-right text-success">Mon, Nov 12, 7:18 PM <i className="feather-clock text-success" /></span>
                                    </a>
                                    <h6 className="mb-1">La Monnalisa</h6>
                                    <p className="text-black mb-3"><i className="feather-user" /> by M.Twain
                                    </p>
                                    <p className="text-black-50">Lorem ipsum dolor sit amet, dolores mandamus moderatius ea ius, sed civibus vivendum imperdiet ei, amet tritani sea id. Ut veri diceret fierent mei, qui facilisi suavitate euripidis ad. In vim mucius menandri convenire, an brute zril vis. Ancillae delectus necessitatibus no eam, at porro solet veniam mel, ad everti nostrud vim. Eam no menandri pertinacia deterruisset.
                                    </p>
                                    <hr />
                                    <div className='action d-flex'>
                                        <p className="mb-0 text-dark pt-2"><span className="text-dark font-weight-bold"> Rate</span>  <span className="bg-warning px-2 py-1 rounded ml-1"> 8.5 </span>
                                        </p>
                                        <div className="float-right">
                                            <a href="#0" className="btn btn-sm btn-success" data-toggle="modal" data-target="#edit_booking"><i className="fa fa-fw fa-reply" /> Reply to this review</a>
                                            <a href="#0" className="btn btn-sm btn-danger"><i className="feather-trash" /> Cancel</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>


    );
};

export default ViewFeedback;