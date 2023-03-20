import React, { useEffect, useState } from 'react'
import { PendingFriends } from '../../../Axios/Service/UserServices';
function PendingFriendRequest() {
    const [request, SetRequest] = useState('')
    async function getdetails() {
        const token = localStorage.getItem("token");
        const details = await PendingFriends(token);
        console.log(details)
        if (details.response.length === 0) {
            SetRequest(false)
        } else {
            SetRequest(details.response);
        }

    }


    useEffect(() => {
        getdetails();
    }, [])
    return (
        <div>
            <div>
                {request ? (<>
                    <div className="container row mt-3 ms-5">
                        <h1>
                             Pending Friends
                        </h1>
                    </div>

                    <div className="container">
                        <div className="row mt-5">

                            {request.map((friendDetails, index) => {
                                return (
                                    <div className="col-md-6 col-xl-4">
                                        <div className="card">
                                            <div className="row">
                                                <div className="col-md-7 col-sm-7">
                                                    <div className="card-body">
                                                        <div className="media align-items-center"><span style={{ backgroundImage: "url(https://bootdey.com/img/Content/avatar/avatar6.png)" }} className="avatar avatar-xl mr-3"></span>
                                                            <div className="media-body overflow-hidden">
                                                                <h5 className="card-text mb-0">{friendDetails?.friend.name}</h5>

                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="col-md-5 col-sm-4 align-items-center ">
                                                    <div className="card-body">
                                                        <div className="media align-items-center">  <br />
                                                            <div className="media-body overflow-hidden">
                                                                <button className="btn btn-primary center pull-right"

                                                                >Pending</button>
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
                    </div>
                </>) : ("")}

            </div>
        </div>
    )
}

export default PendingFriendRequest