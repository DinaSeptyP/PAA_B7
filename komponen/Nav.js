import Link from 'next/link';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Nav(){
    function logoutHandler(e){
        e.preventDefault();

        Cookie.remove('token');

        Router.replace('/')
    }

    return(
        <>
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
            <link rel = "stylesheet" href = "bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
            <link rel = "stylesheet" href = "style.css"></link>


            <nav class = "navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top">
                <div class = "container">
                    <a class = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" href = "/posts/">
                        <span class = "text-uppercase fw-lighter ms-2">WarungPedia</span>
                    </a>

                    <button class = "navbar-toggler border-0" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navMenu">
                        <span class = "navbar-toggler-icon"></span>
                    </button>

                    <div class = "collapse navbar-collapse order-lg-1" id = "navMenu">
                        <ul style={{marginLeft: "0"}} class = "navbar-nav mx-auto text-center">
                            <li class = "nav-item px-2 py-2">
                                <a class = "nav-link text-uppercase text-dark" href = "/posts">home</a>
                            </li>
                            <li class = "nav-item px-2 py-2">
                                <a class = "nav-link text-uppercase text-dark" href = "/posts/create">post baru</a>
                            </li>
                        </ul>
                        <ul class = "navbar-nav">
                            <li class = "nav-item px-2 py-2 border-0">
                                    <a class = "nav-link text-uppercase text-dark" href = "#" onClick={logoutHandler.bind(this)}>keluar</a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
        </div>
        </>
    )
}