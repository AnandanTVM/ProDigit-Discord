import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetProfile } from '../../../Axios/Service/UserServices';
import './Profile.css'
function Profile() {
    const [profile, SetProfile] = useState('')
    async function get() {
        const token = localStorage.getItem("token");
        const data = await GetProfile(token)
        SetProfile(data.response)
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
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                class="rounded-circle img-fluid" style={{ width: "150px" }} />
                            <h5 class="my-3">{profile.name}</h5>
                            <p class="text-muted mb-1">{profile.phone}</p>
                            <p class="text-muted mb-4">{profile.email}</p>
                            <div class="d-flex justify-content-center mb-2">
                                <Link to={'/client/editProfile'} type="button" class="btn btn-primary" >Edit</Link>
                                <Link to={'/client/home'} type="button" class="btn btn-outline-primary ms-1">Message</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile