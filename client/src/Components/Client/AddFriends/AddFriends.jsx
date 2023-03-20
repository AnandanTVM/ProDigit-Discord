import React, { useEffect, useState } from 'react'
import { AddFrirndList } from '../../../Axios/Service/UserServices';

import './AddFriends.css'
function AddFriends() {
    const [friend, SetFriends] = useState(false);
    async function getalldetails() {
        const token = localStorage.getItem("token");
        const data = await AddFrirndList(token);
        if (data.response.length === 0) {
            SetFriends(false)
        } else {
            SetFriends(data.response);
        }
    }
    async function AddFriend(FId) {
        console.log(FId)
        

    }
    useEffect(() => {
        getalldetails();
    }, [])

    return (
        <div>
            <div className="container row mt-3 ms-5">
                <h1>
                    Add Friends
                </h1>
            </div>
            {friend ? (
                <div className="container">
                    <div className="row mt-5">

                        {friend.map((friendDetails, index) => {
                            return (
                                <div className="col-md-6 col-xl-4">
                                    <div className="card">
                                        <div className="row">
                                            <div className="col-md-7 col-sm-7">
                                                <div className="card-body">
                                                    <div className="media align-items-center"><span style={{ backgroundImage: "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3"></span>
                                                        <div className="media-body overflow-hidden">
                                                            <h5 className="card-text mb-0">{friendDetails?.name}</h5>

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="col-md-5 col-sm-4 align-items-center ">
                                                <div className="card-body">
                                                    <div className="media align-items-center">  <br />
                                                        <div className="media-body overflow-hidden">
                                                            <button className="btn btn-primary center pull-right" onClick={((e) => { AddFriend(friendDetails?._id) })}>Add Friend</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                </div>) : (<div className="row ">
                    <center>
                        <h4>No friends found</h4>
                    </center>

                </div>)}
        </div>)
}

export default AddFriends