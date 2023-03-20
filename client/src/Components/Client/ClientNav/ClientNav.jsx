import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { clearClientLoginDetails, getChatUserDetails } from '../../../redux/adminReducer';

function ClientNav(props) {
  const navigate = useNavigate('');

  const dispatch = useDispatch();
  const userName = localStorage.getItem('clientrDetails');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientrDetails');
    dispatch(clearClientLoginDetails(false));
    dispatch(getChatUserDetails(false));
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/client/home'}> ProDigit Discord</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.home ? (<li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/client/home'}>Home</Link>
              </li>) : (<li className="nav-item">
                <Link className="nav-link " aria-current="page" to={'/client/home'}>Home</Link>
              </li>)}
              {props.add ? (<li className="nav-item">
                <Link className="nav-link active" to={'/client/addFriend'}>Add Friend</Link>
              </li>) : (<li className="nav-item">
                <Link className="nav-link" to={'/client/addFriend'}>Add Friend</Link>
              </li>)}
              {props.invite ? (<li className="nav-item ">
                <Link className="nav-link active" to={'/client/invite'}>Invites</Link>
              </li>) : (<li className="nav-item">
                <Link className="nav-link" to={'/client/invite'}>Invites</Link>
              </li>)}
              <li className="nav-item">
                <Link className="nav-link" to={'/client/home'}> {userName ? userName : 'Profile'}</Link>
              </li>


            </ul>


            <button
              className="navbtn btn btn-danger btn-md"
              onClick={logout}
            >
              LogOut
            </button>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default ClientNav