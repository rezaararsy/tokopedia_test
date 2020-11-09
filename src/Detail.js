import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button, Image, Badge, Modal, Form } from 'react-bootstrap';


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isloading: false,
            pokemon: [],
            next: '',
            img: '',
            name: '',
            moves: [],
            types: [],
            height: '',
            weight: '',
            show: false,
            show1: false,
            nickname: '',
            tangkapan: [],
        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        var isi = localStorage.getItem('tangkapan');

        console.log("isine " + isi);


        this.setState({

            isloading: true
        });



        // API.getAllPokemon();
        fetch("https://pokeapi.co/api/v2/pokemon/" + this.props.match.params.name, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tangkapan: isi == undefined ? [] : JSON.parse(isi),
                    img: response.sprites.other.dream_world.front_default,
                    name: response.name,
                    moves: response.moves,
                    types: response.types,
                    height: response.height,
                    weight: response.weight,
                    isloading: false
                });
                console.log("isine1 " + this.state.tangkapan);
                console.log(response);

            })
            .catch(err => {
                console.log(err);
            });
    }

    catch = () => {
        console.log('load');
        var angka = Math.floor(Math.random() * 2) + 1;
        if (angka == 1) {
            this.handleShow();
        } else {
            this.handleShow1();
        }


    }

    handleShow = () => {
        this.setState({
            show: true
        });

    }
    handleClose = () => {
        this.setState({
            show: false
        });

    }
    handleShow1 = () => {
        this.setState({
            show1: true
        });

    }
    handleClose1 = () => {
        this.setState({
            show1: false
        });

    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
    }



    submit = () => {

        const myObj = {
            pokemon: this.state.name,
            nickname: this.state.nickname,
        };

        // var arraynya = [];
        this.state.tangkapan.push(myObj);
        console.log(this.state.tangkapan);
        localStorage.setItem('tangkapan', JSON.stringify(this.state.tangkapan));
        this.props.history.push('/mypokemon')
        // this.handleClose();

    }




    render() {
        return (
            this.state.isLoading ? <h1>Loading</h1> :
                <Container style={{ marginTop: 20 }}>

                    <Row>

                        <Col md={4} style={{ backgroundColor: 'white' }}>
                            <Image src={this.state.img} fluid />
                            <div style={{ marginTop: 40 }}>
                                <Button style={{ width: 100 }} onClick={this.catch}>Catch</Button>
                            </div>

                        </Col>
                        <Col md={8} >
                            <div>
                                <h3>{this.state.name.toUpperCase()}</h3>
                            </div>
                            <div>
                                <h3>Height : {this.state.height}"</h3>
                                <h3>Weight : {this.state.weight} lbs</h3>
                            </div>
                            <div>
                                <h3>
                                    Types : {this.state.types && this.state.types.map((datane, index, array) => {
                                    return <Badge style={{ margin: 10 }} key={index} variant="primary">{datane.type.name.toUpperCase()}</Badge>
                                })}
                                </h3>

                            </div>
                            <div>
                                <h3>
                                    Moves : {this.state.moves && this.state.moves.map((datane, index, array) => {
                                    return <Badge style={{ margin: 10 }} key={index} variant="secondary">{datane.move.name.toUpperCase()}</Badge>
                                })}
                                </h3>

                            </div>
                        </Col>


                    </Row>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header>
                            <Modal.Title>Berhasil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Berhasil Menangkap Pokemon
                        <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label></Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Nickname Pokemonl" onChange={this.handleChange} />
                                </Form.Group>


                                <Button variant="primary" onClick={this.submit}>
                                    Submit
                                </Button>
                                <Button style={{ marginLeft: 10 }} variant="secondary" onClick={this.handleClose}>
                                    Batal
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>


                    <Modal show={this.state.show1} onHide={this.handleClose1}>
                        <Modal.Header closeButton>
                            <Modal.Title>Gagal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Gagal Menangkap Pokemon</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose1}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </Container>

        );
    }
}

export default Detail;
