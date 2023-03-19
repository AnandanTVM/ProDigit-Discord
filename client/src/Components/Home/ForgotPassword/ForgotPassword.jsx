import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChangePassword, SendOtp } from '../../../Axios/Service/HomeService';
import swal from 'sweetalert';
function ForgotPassword() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()
    const [changePass, setChangePass] = useState(true);
    const SendOTP = async () => {
        const values = { email: email };
        const data = await SendOtp(values);
        if (data.status) {
            setError(data.Message)
            setChangePass(false)
        } else {
            setError(data.Message)
        }
    };
    const change = async () => {
        const values = { email: email, otp: otp, password: password };
        const data = await ChangePassword(values);
        if (data.status) {
            swal({
                title: data.Message,
                // text: 'You clicked the button!',
                icon: 'success',
                button: 'Aww yiss!',
            }).then(() => { navigate('/') });


        } else {
            setError(data.Message)
        }
    };

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src={
                                    'https://www.kindpng.com/picc/m/112-1128323_software-developmet-project-management-hd-png-download.png'
                                }
                                className="img-fluid"
                                alt={'Sample '}
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form >
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                        Forgot Password ?
                                    </p>
                                </div>
                                {error ? (
                                    <p
                                        style={{ color: 'red' }}
                                        className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4"
                                    >
                                        {error}
                                    </p>
                                ) : (
                                    ' '
                                )}
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />
                                    <label className="form-label">Email address</label>
                                </div>
                                {changePass ? (<div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={SendOTP}
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    >
                                        SendOTP
                                    </button>
                                </div>) : (<>
                                    <div className="form-outline mb-3">
                                        <input
                                            type="text"
                                            id="form3Example4"
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                            value={otp}
                                            onChange={(e) => {
                                                setOtp(e.target.value);
                                            }}
                                        />
                                        <label className="form-label">OTP</label>


                                    </div>
                                    <div className="form-outline mb-3">
                                        <input
                                            type="password"
                                            id="form3Example4"
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                        <label className="form-label">Password</label>


                                    </div>
                                    <div className="form-outline mb-3">
                                        <input
                                            type="password"
                                            id="form3Example4"
                                            className="form-control form-control-lg"
                                            placeholder="Enter password"
                                            value={conPassword}
                                            onChange={(e) => {
                                                setConPassword(e.target.value);
                                            }}
                                        />
                                        <label className="form-label">confirm password</label>


                                    </div>

                                    <div className="text-center text-lg-start mt-4 pt-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-lg"
                                            onClick={change}
                                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                        >
                                            Change Password
                                        </button>
                                    </div></>)}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ForgotPassword