import React, { useState } from 'react';
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../../komponen/Nav';

export async function getServerSideProps(ctx){
    const { token } = await authPage(ctx);

    const postReq = await fetch('http://localhost:3000/api/posts/',
        {headers:{'Authorization':'Bearer '+ token}})

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

async function deleteHandler(id, e){
    e.preventDefault();

    const {token} = props;

    const ask = confirm('Apakah yakin untuk menghapus?');
    if(ask) {
        const deletePost = await fetch('/api/posts/delete/' + id, {
          method: 'DELETE',
          headers: {
              'Authorization': 'Bearer ' + token
          }
        });
    
        const res = await deletePost.json();
        
        const postsFiltered = posts.filter(post => {
            return post.id !== id && post;
        })
        
        setPosts(postsFiltered);
    
    };

}
{ posts.map(post =>
    (
        <div key={post.id}>
            <h1>{post.nama_barang}</h1>
            <p>{post.deskripsi}</p>
            <h3>{post.harga}</h3>
            <h4>{post.stok}</h4>
            <img src={`${post.url_gambar}`}/>
            <div>
                <button onClick={editHandler.bind(this, post.id)}>Edit</button>
                <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
            </div>

            <hr />
            <br></br>
        </div>
    )
)}


function editHandler(id){
    Router.push('/posts/edit/'+id)
}
    return (
        <>
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
            <link rel = "stylesheet" href = "bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
            <link rel = "stylesheet" href = "style.css"></link>


            <Nav class = "navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top">
                <div class = "container">
                    <a class = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" href = "index.html">
                        <span class = "text-uppercase fw-lighter ms-2">Nama</span>
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
                                    <a class = "nav-link text-uppercase text-dark" href = "#">keluar</a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </Nav>
            <br></br>
            <br></br>
            <br></br>
            {posts.map(post =>
            (
            <div>
                <div class = "collection-list mt-4 row gx-0 gy-3">
                    <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best">
                        <div key={post.id} class = "collection-img position-relative">
                            <img src={`${post.url_gambar}`} style={{maxHeight: "400px", width: "auto"}} class = "w-100"></img>
                        </div>
                        <div class = "text-center">
                            <p class = "text-capitalize my-1">{post.nama_barang}</p>
                            <span class = "fw-bold">Rp {post.harga}</span>
                        </div>
                        <div>
                            <button onClick={editHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", marginLeft: "30%"}}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease"}}>Delete</button>
                        </div>
                    </div>
                    <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best">
                        <div key={post.id} class = "collection-img position-relative">
                            <img src={`${post.url_gambar}`} style={{maxHeight: "400px", width: "auto"}} class = "w-100"></img>
                        </div>
                        <div class = "text-center">
                            <p class = "text-capitalize my-1">{post.nama_barang}</p>
                            <span class = "fw-bold">Rp {post.harga}</span>
                        </div>
                        <div>
                            <button onClick={editHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", marginLeft: "30%"}}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease"}}>Delete</button>
                        </div>
                    </div>
                    <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best">
                        <div key={post.id} class = "collection-img position-relative">
                            <img src={`${post.url_gambar}`} style={{maxHeight: "400px", width: "auto"}} class = "w-100"></img>
                        </div>
                        <div class = "text-center">
                            <p class = "text-capitalize my-1">{post.nama_barang}</p>
                            <span class = "fw-bold">Rp {post.harga}</span>
                        </div>
                        <div>
                            <button onClick={editHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", marginLeft: "30%"}}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease"}}>Delete</button>
                        </div>
                    </div>
                    <div class = "col-md-6 col-lg-4 col-xl-3 p-2 best">
                        <div key={post.id} class = "collection-img position-relative">
                            <img src={`${post.url_gambar}`} style={{maxHeight: "400px", width: "auto"}} class = "w-100"></img>
                        </div>
                        <div class = "text-center">
                            <p class = "text-capitalize my-1">{post.nama_barang}</p>
                            <span class = "fw-bold">Rp {post.harga}</span>
                        </div>
                        <div>
                            <button onClick={editHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", marginLeft: "30%"}}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)} style={{color: "#fff", fontSize: "17px", height:"45px", padding:"0 px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease"}}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            )
            )}
            <br></br>
            <br></br>
            <br></br>
            <footer class = "bg-dark py-5">
                <div class = "container">
                    <div class = "row text-white g-4">
                        <div class = "col-md-6 col-lg-3">
                            <a class = "text-uppercase text-decoration-none brand text-white" href = "index.html">Attire</a>
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
                                        <i class = "fas fa-chevron-right me-1"></i> Collection
                                    </a>
                                </li>
                                <li class = "my-3">
                                    <a href = "#" class = "text-white text-decoration-none">
                                        <i class = "fas fa-chevron-right me-1"></i> Blogs
                                    </a>
                                </li>
                                <li class = "my-3">
                                    <a href = "#" class = "text-white text-decoration-none">
                                        <i class = "fas fa-chevron-right me-1"></i> About Us
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
                                    Albert Street, New York, AS 756, United States of America
                                </span>
                            </div>
                            <div class = "d-flex justify-content-start align-items-start my-2">
                                <span class = "me-3">
                                    <i class = "fas fa-envelope"></i>
                                </span>
                                <span class = "fw-light">
                                    attire.support@gmail.com
                                </span>
                            </div>
                            <div class = "d-flex justify-content-start align-items-start my-2">
                                <span class = "me-3">
                                    <i class = "fas fa-phone-alt"></i>
                                </span>
                                <span class = "fw-light">
                                    +9786 6776 236
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