import React, { useState } from 'react';
import { authPage } from '../../middlewares/authorizationPage'
import Router from 'next/router';
import Nav from '../../komponen/Nav';

export async function getServerSideProps(ctx){
    const {token} = await authPage(ctx);

    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props){
    const [ fields, setFields ] = useState({
        title: '',
        content: ''
    });

    const [status, setStatus] = useState('normal')

    async function createHandler(e){
        e.preventDefault();

        setStatus('loading');

        const { token } = props

        const create = await fetch('/api/posts/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields),
        });

        if(!create.ok) return setStatus('error');

        const res = await create.json();
        
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
        <div style={{fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0, boxSizing: "border-box", backgroundColor: "#e2e3e5", colorOpacity: "0.2", outline: "none", border: "none", textDecoration: "none", textTransform: "capitalize", transition: "all .2s linear"}}>
            <div class="box" style={{height: "100vh"}}>
                <div class="container" style={{backgroundColor:"white", borderRadius: "10px", display: "relative", alignItems: "center", height: "600px", width: "55%", transition: "height 0.2s ease", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
                    <div class="forms" style={{alignItems: "center", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)", height: "auto", width: "70%"}}>
                        <div class="form login" >
                            <h1 style={{position: "relative", fontSize: "27px", fontWeight: 600}}>CREATE A POST</h1>
                            <form onSubmit={createHandler.bind(this)}>
                                <input
                                    onChange={fieldHandler.bind(this)}
                                    type="text"
                                    placeholder="nama_barang"
                                    name="nama_barang"
                                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                                </input>
                                <br></br>
                                <input
                                    onChange={fieldHandler.bind(this)}
                                    type="text"
                                    placeholder="deskripsi"
                                    name="deskripsi"
                                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                                </input>
                                <br></br>
                                <br></br>
                                <input
                                    onChange={fieldHandler.bind(this)}
                                    type="number"
                                    placeholder="harga"
                                    name="harga"
                                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                                </input>
                                <br></br>

                                <br></br>
                                <input
                                    onChange={fieldHandler.bind(this)}
                                    type="number"
                                    placeholder="stok"
                                    name="stok"
                                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                                </input>
                                <br></br>
                                
                                <input
                                    onChange={fieldHandler.bind(this)}
                                    type="text"
                                    placeholder="url_gambar"
                                    name="url_gambar"
                                    style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}>
                                </input>
                                <br></br>
                                <br></br>

                                <button type="submit" style={{fontWeight: "20px", border: "none", padding: "8px", color: "#fff", fontSize: "17px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", width: "100%"}}>Create Posts</button>

                                <center><div>Status: {status}</div></center>
                            </form>
                        </div>
                    </div>
                </div>
                <Nav />
                <br></br>
            </div>
        </div>
    )
}