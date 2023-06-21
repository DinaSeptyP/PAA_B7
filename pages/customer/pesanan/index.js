import React, { useState, useEffect } from 'react';
import { authPage } from '../../../middlewares/authorizationPage';
// import Countdown from '../../../komponen/countdown';
const jwt = require('jsonwebtoken');

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const decodeToken = jwt.verify(token, 'NothingToLose');
  const decodeTokenID = decodeToken['id'];
  const postReq = await fetch('http://localhost:3000/api/pesanan_customer/' + decodeTokenID, {
    method: "GET",
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const posts = await postReq.json();

  return {
    props: {
      token,
      posts: posts.data,
    }
  };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);
  
  const Countdown = ({ deadline }) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const targetDate = new Date(deadline).getTime();
        const distance = targetDate - now;
  
        // Calculate remaining time in days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        // Update the countdown state
        setCountdown({ days, hours, minutes, seconds });
  
        // Clear the interval when the countdown reaches zero
        if (distance <= 0) {
          clearInterval(interval);
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);
  
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }, [deadline]);
  
    return (
      <div>
        <p>Countdown: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</p>
      </div>
    );
  };

  return (
      <>
      <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
        <link rel="stylesheet" href="bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="style.css"></link>

        <br></br>
        <br></br>
        <br></br>
        <div>
          <div className="collection-list mt-4 row gx-0 gy-3">
            {posts.map(post => (
                <div className="col-md-6 col-lg-4 col-xl-3 p-2 best" key={post.id_pesanan}>
                <div className="collection-img position-relative">
                  <img src={`${post.url_gambar}`} style={{ height: "400px", width: "auto", objectFit: "cover" }} className="w-100" alt="Collection Image"></img>
                </div>
                <div className="text-center">
                  <p className="text-capitalize my-1">Nama: {post.nama_barang}</p>
                  <p className="text-capitalize my-1">Total Item: {post.stok}</p>
                  <p className="text-capitalize my-1">Total Harga: Rp. {post.total_harga}</p>
                  <p className="text-capitalize my-1">Deskripsi: {post.deskripsi}</p>
                  <p className="fw-bold">Tenggat Waktu: {Date(post.tanggal_selesai)}</p>
                  <Countdown deadline={post.tanggal_selesai}/>
                  <>{
                    
                  }</>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <footer className="bg-dark py-5">
          <div className="container">
            <div className="row text-white g-4">
              <div className="col-md-6 col-lg-3">
                <a className="text-uppercase text-decoration-none brand text-white" href="#header">WarungPedia</a>
                <p className="text-white mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum mollitia quisquam veniam odit cupiditate, ullam aut voluptas velit dolor ipsam?</p>
              </div>
              <div className="col-md-6 col-lg-3">
                <h5 className="fw-light">Links</h5>
                <ul className="list-unstyled">
                  <li className="my-3">
                    <a href="#" className="text-white text-decoration-none">
                      <i className="fas fa-chevron-right me-1"></i> Home
                    </a>
                  </li>
                  <li className="my-3">
                    <a href="#" className="text-white text-decoration-none">
                      <i className="fas fa-chevron-right me-1"></i> Post Baru
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-3">
                <h5 className="fw-light mb-3">Contact Us</h5>
                <div className="d-flex justify-content-start align-items-start my-2">
                  <span className="me-3">
                    <i className="fas fa-map-marked-alt"></i>
                  </span>
                  <span className="fw-light">
                    Kalimantan Street, Jember, Indonesia
                  </span>
                </div>
                <div className="d-flex justify-content-start align-items-start my-2">
                  <span className="me-3">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="fw-light">
                    warungpedia.support@gmail.com
                  </span>
                </div>
                <div className="d-flex justify-content-start align-items-start my-2">
                  <span className="me-3">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                  <span className="fw-light">
                    +6281 234 567 890
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
