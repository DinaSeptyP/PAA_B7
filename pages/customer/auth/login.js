import React, {useState, useEffect} from 'react';
import Cookie from 'js-cookie'
import Router from 'next/router';
import { unauthPage } from '../../../middlewares/authorizationPage';
import Link from 'next/link';

export async function getServerSideProps(ctx){
    unauthPage(ctx);

    return { props:{} }
}

export default function Login(){
    const [fields, setFields] = useState({
        email: '',
        password: '',
    })

    const [status, setStatus] = useState('normal');

    const token = Cookie.get('token');
    useEffect(()=>{
        if(token) return Router.push('/customer/posts');
        // console.log(token)
    }, [])
    

    async function loginHandler(e){
        e.preventDefault();
        
        setStatus('loading')

        const loginReq = await fetch('/api/auth_customer/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })

        if(!loginReq.ok) return setStatus('error ' + loginReq.status);

        const loginRes = await loginReq.json();
        setStatus(loginRes.message);

        Cookie.set('token', loginRes.token)
        Router.push('/customer/posts')
    }

    function fieldHandler(e){
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        })
    }


    return(
        <div style={{fontFamily: "'Poppins', sans-serif", margin: 0, padding: 0, boxSizing: "border-box", backgroundColor: "#e2e3e5", colorOpacity: "0.2", outline: "none", border: "none", textDecoration: "none", textTransform: "capitalize", transition: "all .2s linear"}}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
            <link rel = "stylesheet" href = "bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
            <link rel = "stylesheet" href = "style.css"></link>
            <div class="box" style={{height: "100vh"}}>
                <div class="container" style={{backgroundColor:"white", borderRadius: "10px", display: "relative", alignItems: "center", height: "450px", width: "30%", transition: "height 0.2s ease", boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)"}}>
                    <div class="forms" style={{alignItems: "center", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)", height: "auto", width: "70%"}}>
                        <div class="form login" >
                            <h1 style={{position: "relative", fontSize: "27px", fontWeight: 600}}>=== HELLO CUSTOMER ===</h1>
                            <h1 style={{position: "relative", fontSize: "27px", fontWeight: 600}}>LOGIN</h1>
                            <br></br>
                            <form onSubmit={loginHandler.bind(this)}>
                            <div class="input-field">
                                <input name="email" type="text" onChange={fieldHandler.bind(this)} placeholder="Email" required style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}/>
                            </div>
                            <div class="input-field">
                                <input name="password" type="password" onChange={fieldHandler.bind(this)} placeholder="Password" required style={{position: "relative", height: "50px", width: "100%", marginTop: "15px"}}/>
                            </div>
                                <br></br>
                                <button type="submit" style={{fontWeight: "20px", border: "none", padding: "8px", color: "#fff", fontSize: "17px", fontWeight: 500, letterSpacing: "1px", borderRadius: "6px", backgroundColor: "#e5345b", cursor: "pointer", transition: "all 0.3s ease", width: "100%"}}>
                                    Masuk
                                </button>
                                <center style={{marginTop: "25px"}}>
                                    <div>Status : {status}</div>
                                    <p>Belum punya akun? <Link href={"register"} style={{fontWeight: "bold", color: "#e5345b"}}>Daftar</Link></p>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
