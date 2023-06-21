import React, { useState } from 'react';
import { authPage } from '../../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../../../komponen/Nav';

export async function getServerSideProps(ctx){
    const {token} = await authPage(ctx);

    const { id } = ctx.query
    
    const postReq = await fetch('http://localhost:3000/api/posts/detail/' + id,
    {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const res = await postReq.json();

    // console.log(res);

    return {
        props: {
            token,
            post: res.data
        }
    }
}

export default function PostEdit(props){
    const {post} = props;
    // console.log(props.post)
    const [ fields, setFields ] = useState({
        nama_barang: post.nama_barang,
        deskripsi: post.deskripsi,
        harga: post.harga,
        stok: post.stok,
        estimasi: post.estimasi,
        batas_tawaran: post.batas_tawaran,
        url_gambar: post.url_gambar
    });
    // console.log(Date.parse(post.batas_tawaran))
    // console.log("hallo")
    // console.log("hallo")

    const [status, setStatus] = useState('normal')

    async function updateHandler(e){
        e.preventDefault();

        setStatus('loading');

        const { token } = props

        const update = await fetch('/api/posts/update/'+post.id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields),
        });

        if(!update.ok) return setStatus('error');

        const res = await update.json();
        
        setStatus('Success');

        Router.push('/posts')
    } 
    
    function fieldHandler(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        })
    }
    
    return (
        console.log(typeof (post.batas_tawaran)),
        console.log((post.batas_tawaran)),
        console.log((post.batas_tawaran).replace('Z','')),
        <div style={{fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0, boxSizing: "border-box", backgroundColor: "#e2e3e5", colorOpacity: "0.2", outline: "none", border: "none", textDecoration: "none", textTransform: "capitalize", transition: "all .2s linear"}}>
            <div class="box" style={{height: "100vh"}}>
                <div class="container" style={{backgroundColor:"white", borderRadius: "10px", display: "relative", alignItems: "center", height: "600px", width: "55%", transition: "height 0.2s ease", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
                    <div class="forms" style={{alignItems: "center", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)", height: "auto", width: "70%"}}>
                        <div class="form login" >
                        <h1 style={{position: "relative", fontSize: "27px", fontWeight: 600}}>EDIT POSTINGAN</h1>
                        <p>post id: {post.id}</p>
                        <form onSubmit={updateHandler.bind(this)}></form>
                        <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="nama_barang"
                    name="nama_barang"
                    defaultValue={post.nama_barang}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="deskripsi"
                    name="deskripsi"
                    defaultValue={post.deskripsi}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="harga"
                    name="harga"
                    defaultValue={post.harga}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="stok"
                    name="stok"
                    defaultValue={post.stok}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="number"
                    placeholder="estimasi"
                    name="estimasi"
                    defaultValue={post.estimasi}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="datetime-local"
                    placeholder="batas tawaran"
                    name="batas_tawaran"
                    defaultValue={post.batas_tawaran}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <input
                    onChange={fieldHandler.bind(this)}
                    type="text"
                    placeholder="url_gambar"
                    name="url_gambar"
                    defaultValue={post.url_gambar}
                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                </input>
                <br></br>
                <br></br>

                <form onSubmit={updateHandler.bind(this)}>
                
                <button type="submit" style={{fontWeight: "20px", border: "none", padding: "8px", color: "#fff", fontSize: "17px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", width: "100%"}}>Simpan Perubahan</button>

                <center><div>
                    Status: {status}
                </div></center>
            </form>

                    </div>
                </div>
            </div>
        </div>
            <Nav />
        </div>
    )
}