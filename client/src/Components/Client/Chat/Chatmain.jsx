import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetAllFriends } from '../../../Axios/Service/UserServices'
import ChatArea from './ChatArea'
import { useDispatch } from 'react-redux';
import { getChatUserDetails } from '../../../redux/adminReducer';
import './Chatmain.css'
function Chatmain() {
	const dispatch = useDispatch();
	const [friendsList, SetFriendsList] = useState('')
	async function getAll() {
		const token = localStorage.getItem("token");
		const data = await GetAllFriends(token);
		console.log(data)
		if (data.response.length === 0) {
			SetFriendsList(false);
		} else {
			SetFriendsList(data.response)
		}

	}
	useEffect(() => {
		getAll()
	}, [])
	return (
		<div>
			<main class="content">
				<div class="container p-0">

					<h1 class="h3 mb-3">Messages</h1>

					<div class="card">
						<div class="row g-0">
							<div class="col-12 col-lg-5 col-xl-3 border-right">

								<div class="px-4 d-none d-md-block">
									<div class="d-flex align-items-center">
										<div class="flex-grow-1">
											<input type="text" class="form-control my-3" placeholder="Search..." />
										</div>
									</div>
								</div>

								{friendsList ? (<>
									{friendsList.map((friend, index) => {
										return (
											<Link key={index} onClick={() => {
												dispatch(getChatUserDetails(friend.friend));
											}} class="list-group-item list-group-item-action border-0">
												{/* <div  class="badge bg-success float-right">5</div> */}
												<div class="d-flex align-items-start">
													<img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
													<div class="flex-grow-1 ml-3">
														{friend.friend.name}
														<div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
													</div>
												</div>
											</Link>
										)
									})}
								</>) : (<Link class="list-group-item list-group-item-action border-0">
									{/* <div class="badge bg-success float-right">5</div> */}
									<div class="d-flex align-items-start">

										<div class="flex-grow-1 ml-3">
											No Friends Found.

										</div>
									</div>
								</Link>)}


								<hr class="d-block d-lg-none mt-1 mb-0" />
							</div>
							<ChatArea />

						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Chatmain