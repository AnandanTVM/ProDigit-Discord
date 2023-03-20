import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetProfile, UpdateProfile } from '../../../Axios/Service/UserServices'
function EditProfile() {
    // const [profile, SetProfile] = useState('')
    const [email, SetEmail] = useState('')
    const [name, SetName] = useState('')
    const [phone, SetPhone] = useState('')
    const navigate = useNavigate()
    async function get() {
        const token = localStorage.getItem("token");

        const data = await GetProfile(token)
        // SetProfile(data.response)
        SetEmail(data.response.email)
        SetPhone(data.response.phone)
        SetName(data.response.name)
    }
    async function Update() {
        let values = {
            name: name, email: email, phone: phone
        }
        const token = localStorage.getItem("token");
        let data = await UpdateProfile(token, values);
        console.log(data)
        if (data.status) {
            navigate('/client/profile');
        }

    }
    useEffect(() => {
        get()
    }, [])

    return (
        <div>
            <div class="row mt-5">
                <div class="col-lg-4"></div>
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <h1>Edit Details</h1>
                            <form >
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        value={name}
                                        onChange={(e) => {
                                            SetName(e.target.value);
                                        }}
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        required
                                    />
                                    <label className="form-label">Email address</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        value={email}
                                        onChange={(e) => {
                                            SetEmail(e.target.value);
                                        }}
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        required
                                    />
                                    <label className="form-label">Name</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example3"
                                        value={phone}
                                        onChange={(e) => {
                                            SetPhone(e.target.value);
                                        }}
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        required
                                    />
                                    <label className="form-label">Phone</label>
                                </div>


                                <div class="d-flex justify-content-center mb-2">
                                    <button type="button" onClick={Update} class="btn btn-primary" >Update</button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile