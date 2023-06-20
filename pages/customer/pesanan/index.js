import React, { useState } from 'react';
import { authPage } from '../../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../komponen/Nav';
const jwt = require('jsonwebtoken');

export async function getServerSideProps(ctx){
    const { token } = await authPage(ctx);

    const decodeToken = jwt.verify(token, 'NothingToLose')
    const decodeTokenID = decodeToken['id']
    const postReq = await fetch('http://localhost:3000/api/pesanan_customer/'+decodeTokenID,
        {method:"GET",headers:{'Authorization':'Bearer '+ token}})

    const posts = await postReq.json();
    // console.log(posts)

    return { props: {
        token,
        posts: posts.data,
    } }
}

export default function PostIndex(props){

const [posts, setPosts] = useState(props.posts);
// console.log(posts)

// async function deleteHandler(id, e){
//     e.preventDefault();

//     const {token} = props;

//     const ask = confirm('Apakah yakin untuk menghapus?');
//     if(ask) {
//         const deletePost = await fetch('/api/posts/delete/' + id, {
//           method: 'DELETE',
//           headers: {
//               'Authorization': 'Bearer ' + token
//           }
//         });
    
//         const res = await deletePost.json();
        
//         const postsFiltered = posts.filter(post => {
//             return post.id !== id && post;
//         })
        
//         setPosts(postsFiltered);
    
//     };

// }
{ posts.map(post =>
    (
        <div key={post.id_pesanan}>
            <h1>{post.id_customer}</h1>
            <p>{post.tanggal_selesai}</p>
            <h3>{post.status}</h3>
            <h4>{post.id_produk}</h4>
            {/* <div>
                <button onClick={applyHandler.bind(this, post.id_pesanan)}>Edit</button>
                <button onClick={deleteHandler.bind(this, post.id_pesanan)}>Delete</button>
            </div> */}

            <hr />
            <br></br>
        </div>
    )
)}


// function applyHandler(id){
//     Router.push('/customer/posts/edit/'+id)
// }
    return (
        <>
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
            <link rel = "stylesheet" href = "bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
            <link rel = "stylesheet" href = "style.css"></link>


            {/* <Nav class = "navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top">
                <div class = "container">
                    <a class = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" href = "#">
                        <span class = "text-uppercase fw-lighter ms-2">INI ADALAH PESANAN</span>
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
                                <a class = "nav-link text-uppercase text-dark" href = "#">INI ADALAH PESANAN</a>
                            </li>
                        </ul>
                        <ul class = "navbar-nav">
                            <li class = "nav-item px-2 py-2 border-0">
                                    <a class = "nav-link text-uppercase text-dark" href = "#">keluar</a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </Nav> */}
            <br></br>
            <br></br>
            <br></br>
            {/* <div style={{
                display: "flex"
            }}> */}
            <div>
                <div class = "collection-list mt-4 row gx-0 gy-3">
            {posts.map(post =>
            (
                    <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best">
                        <div key={post.id_pesanan} class = "collection-img position-relative">
                            {/* <img src={`${post.url_gambar}`} style={{height: "400px", width: "auto", objectFit: "cover"}} class = "w-100"></img> */}
                        </div>
                        <div class = "text-center">
                            <p class = "text-capitalize my-1">Ini pesanan</p>
                            <p class = "text-capitalize my-1">id_customer {post.id_customer}</p>
                            <p class = "fw-bold">Tenggat Waktu: {post.tanggal_selesai}</p>
                            <p class = "fw-bold">status: {post.status}</p>
                            <p class = "fw-bold">id_produk: {post.id_produk}</p>
                        </div>
                        <div>
                            {/* <button onClick={applyHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", marginLeft: "30%"}}>Detail Produk</button> */}
                        </div>
                    </div>
            )
            )}
            </div>
        </div>
            <br></br>
            <br></br>
            <br></br>
            <footer class = "bg-dark py-5">
                <div class = "container">
                    <div class = "row text-white g-4">
                        <div class = "col-md-6 col-lg-3">
                            <a class = "text-uppercase text-decoration-none brand text-white" href = "#header">WarungPedia</a>
                            <p class = "text-white mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum mollitia quisquam veniam odit cupiditate, ullam aut voluptas velit dolor ipsam?</p>
                        </div>

                        <div class = "col-md-6 col-lg-3">
                            <h5 class = "fw-light">Links</h5>
                            <ul class = "list-unstyled">
                                <li class = "my-3">
                                    <a href = "#" class = "text-white text-decoration-none">
                                        <i class = "fas fa-chevron-right me-1"></i> Home
                                    </a>
                                </li>
                                <li class = "my-3">
                                    <a href = "#" class = "text-white text-decoration-none">
                                        <i class = "fas fa-chevron-right me-1"></i> Post Baru
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class = "col-md-6 col-lg-3">
                            <h5 class = "fw-light mb-3">Contact Us</h5>
                            <div class = "d-flex justify-content-start align-items-start my-2">
                                <span class = "me-3">
                                    <i class = "fas fa-map-marked-alt"></i>
                                </span>
                                <span class = "fw-light">
                                    Kalimantan Street, Jember, Indonesia
                                </span>
                            </div>
                            <div class = "d-flex justify-content-start align-items-start my-2">
                                <span class = "me-3">
                                    <i class = "fas fa-envelope"></i>
                                </span>
                                <span class = "fw-light">
                                    warungpedia.support@gmail.com
                                </span>
                            </div>
                            <div class = "d-flex justify-content-start align-items-start my-2">
                                <span class = "me-3">
                                    <i class = "fas fa-phone-alt"></i>
                                </span>
                                <span class = "fw-light">
                                    +6281 234 567 890
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>   
        </div>
        </>
    )
}