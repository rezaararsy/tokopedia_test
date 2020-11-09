import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';


class MyPokemon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: [],
            next: '',
        };

    }

    componentDidMount() {
        var isi = localStorage.getItem('tangkapan');

        this.setState({
            pokemon: isi == undefined ? [] : JSON.parse(isi),

        });

    }

    deleteData = (index) => {
        this.state.pokemon.splice(index, 1);
        this.setState({ pokemon: this.state.pokemon });
        localStorage.setItem('tangkapan', JSON.stringify(this.state.pokemon));
        console.log('pokemone ' + this.state.pokemon);
    }





    render() {
        return (
            <Container style={{ marginTop: 20 }}>
                <Row>

                    <Col md={12} >
                        {this.state.pokemon.length == 0 ? <h1>Tidak Ada Pokemon</h1> : null
                        }
                        <Card style={{}}>
                            <ListGroup variant="flush">
                                {this.state.pokemon && this.state.pokemon.map((datane, index, array) => {
                                    return <ListGroup.Item key={index}><b>{datane.nickname.toUpperCase()} ({datane.pokemon.toUpperCase()})</b><Button onClick={() => this.deleteData(index)} style={{ float: 'right' }}>Delete</Button></ListGroup.Item>
                                })}



                            </ListGroup>
                        </Card>

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MyPokemon;
