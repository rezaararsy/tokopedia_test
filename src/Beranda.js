import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';


class Beranda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: [],
            tangkapan: [],
            next: '',
        };

    }

    componentDidMount() {
        var isi = localStorage.getItem('tangkapan');

        fetch("https://pokeapi.co/api/v2/pokemon", {
            "method": "GET",
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pokemon: response.results,
                    next: response.next,
                    tangkapan: isi == undefined ? [] : JSON.parse(isi),
                });
                console.log(this.state.pokemon);
            })
            .catch(err => {
                console.log(err);
            });
    }



    getPokemon = () => {
        console.log('load');
        fetch(this.state.next, {
            "method": "GET",
        })
            .then(response => response.json())
            .then(response => {
                this.state.pokemon.push(...response.results);
                // console.log(response);
                this.setState({
                    //pokemon: this.state.pokemon.push(response.results),
                    next: response.next,
                });
                console.log(this.state.pokemon);
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <Container style={{ marginTop: 20 }}>
                <Row>

                    <Col md={12} >
                        <Card style={{}}>
                            <ListGroup variant="flush">
                                <ListGroup.Item ><b onClick={this.getPokemon} ><b>Pokemon Owned Total : {this.state.tangkapan.length}</b></b></ListGroup.Item>
                                {this.state.pokemon && this.state.pokemon.map((datane, index, array) => {
                                    return <ListGroup.Item key={index}><Link style={{ color: 'black' }} to={"/detail/" + datane.name.toLowerCase()} ><b>{datane.name.toUpperCase()}</b></Link></ListGroup.Item>
                                })}

                                <ListGroup.Item ><Button onClick={this.getPokemon} ><b>Load More....</b></Button></ListGroup.Item>

                            </ListGroup>
                        </Card>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Beranda;
