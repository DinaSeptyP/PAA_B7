import React, { useState } from 'react';
import { authPage } from '../../../../middlewares/authorizationPage'
import Router from 'next/router';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const jwt = require('jsonwebtoken');
// import Nav from '../../../../komponen/Nav';

export async function getServerSideProps(ctx){
    // Get the current date
    var currentDate = new Date();

    // Add days to the current date
    var numberOfDaysToAdd = 5;
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    // Display the updated date
    console.log(currentDate);   
    console.log("hello123")
    
    const {token} = await authPage(ctx);

    const { id } = ctx.query

    const token2 = Cookies.get('token');
    console.log(token)
    const decodeToken = jwt.verify(token, 'NothingToLose')
    const decodeToken2 = decodeToken['id']
    console.log(decodeToken['id'])
    const payload = decodeToken.payload;
    console.log(payload)

    const postReq = await fetch('http://localhost:3000/api/posts_customer/detail/' + id,
    {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const res = await postReq.json();

    // console.log(res);

    return {
        props: {
            // id,
            token,
            decodeToken2,
            post: res.data
        }
    }
}

export default function NewOrderAdd(props){

    const {post} = props;
    const {decodeToken2} = props;
    const id_customer = decodeToken2;
    
    // Get the current date
    var currentDate = new Date();

    // Add days to the current date
    var numberOfDaysToAdd = post.estimasi;
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    // Display the updated date
    console.log(currentDate);

    console.log("hello123")


    // console.log(props.post)
    const [ fields, setFields ] = useState({
        // id:post.id,
        // id_customer: token.decodeToken2,
        id_produk: post.id,
        id_customer: id_customer,
        tanggal_selesai: currentDate,
        total_harga: (post.stok * post.harga)
        // stok: post.stok,
        // estimasi: post.estimasi,
        // batas_tawaran: post.batas_tawaran, 
        // url_gambar: post.url_gambar
    });

    const [status, setStatus] = useState('normal')
    const router = useRouter();
    
    async function applyHandler(e){
        e.preventDefault();

        setStatus('loading');

        const { token } = props

        const newOrder = await fetch('/api/posts_customer/new_order/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields),
        });
        console.log(!newOrder.ok)
        if(!newOrder.ok) return setStatus('error');

        const res = await newOrder.json();
        Router.push('/customer/posts')
        
        setStatus('Success');
        
    }
    
    
    // function fieldHandler(e){
    //     const name = e.target.getAttribute('name');

    //     setFields({
    //         ...fields,
    //         [name]: e.target.value
    //     })
    // }


    return (
        <>
        <div style={{fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0, boxSizing: "border-box", backgroundColor: "#e2e3e5", colorOpacity: "0.2", outline: "none", border: "none", textDecoration: "none", textTransform: "capitalize", transition: "all .2s linear"}}>
            <div class="box" style={{height: "100vh"}}>
                <div class="container" style={{backgroundColor:"white", borderRadius: "10px", display: "relative", alignItems: "center", height: "600px", width: "55%", transition: "height 0.2s ease", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
                    <div class="forms" style={{alignItems: "center", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)", height: "auto", width: "70%"}}>
                        <h1 style={{position: "relative", fontSize: "27px", fontWeight: 600}}>DETAIL PRODUK</h1>
                        <center><p>post id: {post.id}</p></center>
                        <div class = "collection-img position-relative" style={{height: 150}}>
                            <center><img src={`${post.url_gambar}`} style={{height: "150px", width: "auto", objectFit: "cover", marginLeft: "auto", marginRight: "auto"}} class = "w-100"></img></center>
                            <br></br>
                        </div>
                        <br></br>
                        <div class = "text-center" style ={{paddingLeft: 30}}>
                            <p class = "text-capitalize my-1">Nama Barang &nbsp;&nbsp;: {post.nama_barang}</p>
                            <p class = "fw-bold">Harga/item &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Rp {post.harga.toLocaleString()}</p>
                            <p class = "text-capitalize my-1">Total Item &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {post.stok}</p>
                            <p class = "text-capitalize my-1">Estimasi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {post.estimasi} Hari</p>
                            <p class = "text-capitalize my-1">Batas Tawaran : {post.batas_tawaran}</p>
                            <p class = "text-capitalize my-1">Deskripsi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {post.deskripsi}</p>
                        </div>
                        <form onSubmit={applyHandler.bind(this)}>
                            <button type="submit" style={{fontWeight: "20px", border: "none", padding: "8px", color: "#fff", fontSize: "17px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", width: "100%"}}>Terima Tawaran</button>
                        </form>
                        <center><div>Status: {status}</div></center>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}