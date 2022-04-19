import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button, Stack } from 'react-bootstrap'
import axios from 'axios'

export default function DisplayPirates() {

    const [my, setMy] = useState([])
    const [updater, setUpdater] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api')
            .then(res => {
                res.data.sort(function (a, b) {
                    if (a.pirateName.toLowerCase() < b.pirateName.toLowerCase()) return -1;
                    if (a.pirateName.toLowerCase() > b.pirateName.toLowerCase()) return +1;
                    return 0;
                })
                setMy(res.data)
            })
            .catch(err => console.error(err));
    }, [updater]);

    useEffect(() => {
        axios.get('http://localhost:8000/api')
            .then(res => {
                res.data.sort(function (a, b) {
                    if (a.pirateName.toLowerCase() < b.pirateName.toLowerCase()) return -1;
                    if (a.pirateName.toLowerCase() > b.pirateName.toLowerCase()) return +1;
                    return 0;
                })
                setMy(res.data)
            })
            .catch(err => console.error(err));
    }, []);

    function createPirateCard(pirate) {

        const myStyle = {
            height: '250px',
            width: '250px'
        };

        const cardStyle = {
            width: '56rem'
        };

        return (<Card style={cardStyle}>
            <Stack direction="horizontal">

               <Card.Img variant="top" src={pirate.imgUrl} style={myStyle} />
                <Stack>
                    <Card.Body>
                        <Card.Title><h1>{pirate.pirateName}</h1></Card.Title>
                        <Stack direction="horizontal" gap={1}>
                            <Button href={"/pirate/" + pirate._id} variant="primary">View Pirate</Button>
                            <Button variant="danger" onClick={(e) => {
                                e.preventDefault()
                                axios.delete(`http://localhost:8000/api/${pirate._id}`)
                                    .then(
                                        setUpdater(updater + 1)
                                    )
                                    .catch(err => console.error(err));
                            }}>Walk the Blank</Button>
                        </Stack>
                    </Card.Body>
                </Stack>
            </Stack>
        </Card>)
    }

    const myStyle = {
        fontSize: '25px',
        height : '800px'
      };
    return (
        <div className="row" >
            
            <div className="col-2" />
            
            <div className="col-6" style={{
                    marginTop : '25px'
            }} >
                <Stack direction="vertical" gap={3}>
                    {my.map((my, i) => <p key={i}> {createPirateCard(my)}</p>)}
                </Stack>
            </div>
            <div className="col-2" />
        </div>
    )
}
