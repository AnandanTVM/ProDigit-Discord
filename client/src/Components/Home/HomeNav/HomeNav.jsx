import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeNav(props) {
  return (
    <div>
      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <Link class="navbar-brand" to={'/'}>
            ProDigit Discord
          </Link>
          {props.sginup ? (
            <Link to={'/sginup'} class="btn btn-success" type="submit">
              Signup
            </Link>
          ) : (
            <Link to={'/'} class="btn btn-success" type="submit">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
