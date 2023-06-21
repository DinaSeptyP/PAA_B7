import React, {useState} from 'react';
import { unauthPage } from '../../middlewares/authorizationPage';
import Link from 'next/link';
// import { Router } from 'next/router';
import Router from 'next/router';

export async function getServerSideProps(ctx){
    unauthPage(ctx);

    return { props:{} }
}


export default function Register(){
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    
    const [status, setStatus]=useState('normal')

    async function registerHandler(e){
        e.preventDefault();
        
        setStatus('loading');

        const registerReq = await fetch('/api/auth/register',{
            method: 'POST',
            body: JSON.stringify(fields),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!registerReq.ok) return setStatus('error'+registerReq.status)

        const registerRes = await registerReq.json();

        setStatus('success')
        Router.push('login')
        alert("Akun berhasil dibuat")
    }
    
    function fieldHandler(e){
        const name = e.target.getAttribute('name')
        setFields({
            ...fields,
            [name]: e.target.value
        })
        
    }

    return (
        <div style={{fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0, boxSizing: "border-box", backgroundColor: "#e2e3e5", colorOpacity: "0.2", outline: "none", border: "none", textDecoration: "none", textTransform: "capitalize", transition: "all .2s linear"}}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
            <link rel = "stylesheet" href = "bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
            <link rel = "stylesheet" href = "style.css"></link>
            <div class="box" style={{height: "100vh"}}>
                <div class="container" style={{backgroundColor:"white", borderRadius: "10px", display: "relative", alignItems: "center", height: "450px", width: "30%", transition: "height 0.2s ease", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
                    <div class="forms" style={{alignItems: "center", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)", height: "auto", width: "70%"}}>
                        <div class="form login" >
                            <h1 style={{position: "relative", fontSize: "27px", fontWeight: 600}}>REGISTRASI</h1>
                            <br></br>
                            <form onSubmit={registerHandler.bind(this)}>
                            <div class="input-field">
                                <input name="email" type="text" onChange={fieldHandler.bind(this)} placeholder="Email" required style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}/>
                            </div>
                            <div class="input-field">
                                <input name="password" type="password" onChange={fieldHandler.bind(this)} placeholder="Password" required style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}/>
                            </div>
                                <br></br>
                                <button type="submit" style={{fontWeight: "20px", border: "none", padding: "8px", color: "#fff", fontSize: "17px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", width: "100%"}}>
                                    Daftar
                                </button>
                                <center style={{marginTop: "25px"}}>
                                    <div>{status}</div>
                                    <p>Sudah memiliki akun? <Link href={"login"} style={{fontWeight: "bold", color: "#e5345b"}}>masuk</Link></p>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}