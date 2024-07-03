import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
export const Nav = () => {
  return (
    <div>
      <div class="collapse" id="navbarToggleExternalContent">
    </div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    </div>
  )
}

export default Nav;
