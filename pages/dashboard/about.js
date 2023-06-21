import Router, { useRouter } from "next/router";

export default function Home(){
  const router = useRouter()

  return (
    <>
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
      <link rel = "stylesheet" href = "bootstrap-5.0.2-dist/css/bootstrap.min.css"></link>
      <link rel = "stylesheet" href = "style.css"></link>


      <nav class = "navbar navbar-expand-lg navbar-light bg-white py-4 fixed-top">
          <div class = "container">
              <a class = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" href = "#header">
                  <span class = "text-uppercase fw-lighter ms-2">WarungPedia</span>
              </a>

              <button class = "navbar-toggler border-0" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navMenu">
                  <span class = "navbar-toggler-icon"></span>
              </button>

              <div class = "collapse navbar-collapse order-lg-1" id = "navMenu">
                  <ul style={{marginLeft: "0"}} class = "navbar-nav mx-auto text-center">
                      <li class = "nav-item px-2 py-2">
                          <a class = "nav-link text-uppercase text-dark" onClick={()=>router.push('../')}>home</a>
                      </li>
                      <li class = "nav-item px-2 py-2">
                          <a class = "nav-link text-uppercase text-dark" href = "#">about us</a>
                      </li>
                  </ul>
                  <ul class = "navbar-nav">
                    <li class = "nav-item px-2 py-2 border-0">
                            <a class = "nav-link text-uppercase text-dark" href = "/customer/auth/login">account</a>
                    </li>
                  </ul>
              </div>
          </div>
      </nav>


      <div>
        <img src = "images/about_us.jpg" style={{width: "200px"}} alt = ""></img>
      </div>
      <div style={{backgroundColor: "#343a40", alignItems: "center", position : "absolute", top:"50%", left : "50%", marginRight: "-50%", transform: "translate(-50%, -50%)", height: "auto"}} class = "container h-100 d-flex align-items-center carousel-inner">
            <div class = "text-center carousel-item active">
              <br></br><br></br>
                <h4 class = "text-white">WarungPedia merupakan platform marketplace custom online yang menjual berbagai jenis barang custom. Hanya dengan one-tap, Anda dapat menerima tawaran custom berbagai barang yang Anda jual dari jarak jauh. Dukung UMKM Anda agar berkembang dengan pesat melalui WarungPedia!</h4>
                {/* <h1 class = "text-uppercase py-2 fw-bold text-white">ehehe</h1> */}
            </div>
        </div>
      
    </div>
    </>
  )
}