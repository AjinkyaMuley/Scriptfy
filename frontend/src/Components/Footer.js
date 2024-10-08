function Footer() {

    return (

        <footer class="d-flex flex-wrap justify-content-between container align-items-center my-5 border-top">
            <div class="col-md-4 d-flex align-items-center">
                <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    Scriptify
                </a>
                <span class="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex pt-3">
                <li class="ms-3"><a class="text-muted" href="#"><i class="fa-brands fa-facebook fa-2x"></i></a></li>
                <li class="ms-3"><a class="text-muted" href="#"><i class="fa-brands fa-instagram fa-2x"></i></a></li>
                <li class="ms-3"><a class="text-muted" href="#"><i class="fa-brands fa-twitter fa-2x"></i></a></li>
            </ul>
        </footer>

    )
}


export default Footer