import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeNav(props) {
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            ProDigit Discord
          </Link>
          {props.sginup ? (
            <Link to={'/sginup'} className="btn btn-success" type="submit">
              Signup
            </Link>
          ) : (
            <Link to={'/'} className="btn btn-success" type="submit">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
