import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, fetchTodos } from '../Redux/userslice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineStar, AiFillCaretUp, AiFillCaretDown, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowDown } from "react-icons/ai"
import { RxDotsVertical } from "react-icons/rx"
import { BsSearch } from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi"
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ReactPaginate from "react-paginate";
import 'reactjs-popup/dist/index.css';
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Dashboard = () => {

    // To make useeffect to execute only once on page load

    const shouldlog = useRef(true)

    // To create loading symbol till data fetched from backend

    const [loading, setloading] = useState(true)

    // To get data from redux store

    const array = useSelector(selectedProduct)

    // To dispatch data to redux store

    const dispatch = useDispatch()

    // To show modal with row details on clicking in row of table

    const [show, setShow] = useState(false);

    // useState to store row details to populate on modal

    const [carddata, setcarddata] = useState({
        name: "",
        image: "",
        current_price: "",
        price_change_percentage_24h_in_currency: "",
        price_change_percentage_7d_in_currency: "",
        market_cap: "",
        total_volume: "",
        circulating_supply: ""
    })

    // useEffect to get data on pageload and to store the data in redux-store

    useEffect(() => {
        if (shouldlog.current) {
            shouldlog.current = false
            dispatch(fetchTodos())
            setloading(false)
        }
    }, [])


    //   Function to open and close react bootstrap modal
    const handleClose = () => setShow(false);

    const handleShow = async (row) => {
        await setcarddata({
            name: row.name,
            image: row.image,
            current_price: numfor.format(row.current_price),
            price_change_percentage_24h_in_currency: row.price_change_percentage_24h_in_currency.toFixed(2),
            price_change_percentage_7d_in_currency: row.price_change_percentage_7d_in_currency.toFixed(2),
            market_cap: numfor.format(row.market_cap),
            total_volume: numfor.format(row.total_volume),
            circulating_supply: numfor.format(row.circulating_supply)
        })
        setShow(true);
    }

    // To add commas between values

    var numfor = Intl.NumberFormat('en-US')

    // For Pagination

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;

    const pagesVisited = pageNumber * usersPerPage

    const displayUsers = array.slice(pagesVisited, pagesVisited + usersPerPage).map((row, i) => {
        return (
            <tr onClick={() => handleShow(row)} key={i}>
                <td><span className='grey'><AiOutlineStar /></span>&nbsp;{row.market_cap_rank}</td>
                <td className='namealign'><img src={row.image} alt=""></img>&nbsp;{row.name}&nbsp;<span className='grey'>{row.symbol}</span></td>
                <td>${numfor.format(row.current_price)}</td>
                <td className='red'><AiFillCaretDown />&nbsp;{row.price_change_percentage_24h_in_currency.toFixed(2)}%</td>
                <td className='green'><AiFillCaretUp />&nbsp;{row.price_change_percentage_7d_in_currency.toFixed(2)}%</td>
                <td>${numfor.format(row.market_cap)}</td>
                <td>${numfor.format(row.total_volume)}</td>
                <td>{numfor.format(row.circulating_supply)}&nbsp;BTC<ProgressBar className='progress' variant="secondary" now={80} /></td>
                <td><RxDotsVertical /></td>
            </tr>
        )
    })

    const pageCount = Math.ceil(array.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    // Function for Slider arrow

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "grey", borderRadius: "50%" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "grey", borderRadius: "50%" }}
                onClick={onClick}
            />
        );
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <>
            <section>
                <div class="container-fluid">
                    {
                        // loading till data fetched from backend

                        loading ? <>

                            <div>
                                ....loading
                            </div>
                        </> : <>

                            {/* Nav Bar */}

                            <div class="row">
                                <div class="col-12 mx-auto">
                                    <Navbar bg="light" expand="lg">
                                        <Container>
                                            <Navbar.Brand href="#home"><img src='black.png' alt=""></img> &nbsp;<b>Crypto Tracker</b></Navbar.Brand>
                                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                            <Navbar.Collapse id="basic-navbar-nav">
                                                <Nav className="me-auto">
                                                </Nav>
                                                <Nav >
                                                    <Nav.Link href="#home"><BsSearch /></Nav.Link>
                                                    <Nav.Link href="#link"><GiHamburgerMenu /></Nav.Link>

                                                </Nav>

                                            </Navbar.Collapse>
                                        </Container>
                                    </Navbar>
                                </div>
                            </div>

                            {/* Slider */}

                            <div class="row ">
                                <div class="col-11 mx-auto">
                                    <Slider {...settings}>
                                        <div>
                                            <Card className='card' >
                                                <Card.Body>
                                                    <Row>
                                                        <Col > <img src="grey.png" alt="" className='sliderimg'></img></Col>
                                                        <Col xs={9}> <Card.Subtitle className="mb-2 text-muted">
                                                            Take a quiz!
                                                        </Card.Subtitle>
                                                            <Card.Title>Learn and earn $CKB</Card.Title>
                                                        </Col>

                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className='card'>
                                                <Card.Body>
                                                    <Row>
                                                        <Col> <img src='green.png' alt="" className='sliderimg'></img></Col>
                                                        <Col xs={9}> <Card.Subtitle className="mb-2 text-muted">
                                                            Portfolio 🔥
                                                        </Card.Subtitle>
                                                            <Card.Title>Track Your Trades in one place, not all over the place</Card.Title>
                                                        </Col>

                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className='card'>
                                                <Card.Body>
                                                    <Row>
                                                        <Col> <img src="blue.png" alt="" className='sliderimg'></img></Col>
                                                        <Col xs={9}> <Card.Subtitle className="mb-2 text-muted">
                                                            Portfolio
                                                        </Card.Subtitle>
                                                            <Card.Title>Track Your Trades in one place, not all over the place</Card.Title>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className='card'>
                                                <Card.Body>
                                                    <Row>
                                                        <Col> <img src="grey.png" alt="" className='sliderimg'></img></Col>
                                                        <Col xs={9}> <Card.Subtitle className="mb-2 text-muted">
                                                            Take a quiz!
                                                        </Card.Subtitle>
                                                            <Card.Title>Learn and earn $CKB</Card.Title>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className='card'>
                                                <Card.Body>
                                                    <Row>
                                                        <Col> <img src='green.png' alt="" className='sliderimg'></img></Col>
                                                        <Col xs={9}> <Card.Subtitle className="mb-2 text-muted">
                                                            Portfolio 🔥
                                                        </Card.Subtitle>
                                                            <Card.Title>Track Your Trades in one place, not all over the place</Card.Title>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div>
                                            <Card className='card'>
                                                <Card.Body>
                                                    <Row>
                                                        <Col> <img src="blue.png" alt="" className='sliderimg'></img></Col>
                                                        <Col xs={9}> <Card.Subtitle className="mb-2 text-muted">
                                                            Portfolio
                                                        </Card.Subtitle>
                                                            <Card.Title>Track Your Trades in one place, not all over the place</Card.Title>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Slider>
                                </div>
                            </div>

                            {/* Modal */}

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                centered
                                className='my-modal'
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title><img src={carddata.image} alt="" /> {' '}{carddata.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row modaltextbold">
                                        <div class="col-4">
                                            PRICE <br />
                                            ${carddata.current_price}
                                        </div>
                                        <div class="col-4">
                                            24H <br />
                                            <span className='red'><AiFillCaretDown />&nbsp;{carddata.price_change_percentage_24h_in_currency}</span>
                                        </div>
                                        <div class="col-4">
                                            7D <br />
                                            <span className='green'><AiFillCaretUp />&nbsp;{carddata.price_change_percentage_7d_in_currency}</span>
                                        </div>
                                    </div>
                                    <div class="row mt-3 modaltextbold">
                                        <div class="col">
                                            MARKET CAP <br></br>
                                            ${carddata.market_cap}
                                        </div>
                                    </div>
                                    <div class="row mt-3 modaltextbold">
                                        <div class="col">
                                            VOLUME(24H) <br></br>
                                            ${carddata.market_cap}
                                        </div>
                                    </div>
                                    <div class="row mt-3 modaltextbold">
                                        <div class="col-6">
                                            CIRCULATING SUPPLY <br></br>
                                            {carddata.circulating_supply}{' '} BTC
                                            <ProgressBar className='progress' variant="secondary" now={80} />
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

                            <div class="row mt-4">
                                <div class="col">
                                    <h4>Top 100 Cryptocurrencies by Market Cap</h4>
                                </div>
                            </div>

                            {/* table */}

                            <div class="row  mt-4">
                                <div class="col-12 ">
                                    <table class="table table-responsive" >
                                        <thead >
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>24H <span className='blue'><AiOutlineArrowDown /></span></th>
                                                <th>7D</th>
                                                <th>MARKET CAP</th>
                                                <th>VOLUME(24H)</th>
                                                <th>CIRCULATING SUPPLY</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                displayUsers
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}

                            <div class="row mt-4 mb-5 justify-content-lg-end justify-content-sm-start justify-content-md-end justify-content-start">
                                <div class="col-lg-4 col-md-4 col-sm-4">
                                    <ReactPaginate
                                        previousLabel={<AiOutlineArrowLeft />}
                                        nextLabel={<AiOutlineArrowRight />}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                        previousLinkClassName={"previousBttn"}
                                        nextLinkClassName={"nextBttn"}
                                        disabledClassName={"paginationDisabled"}
                                        activeClassName={"paginationActive"}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </section>
        </>
    )
}

