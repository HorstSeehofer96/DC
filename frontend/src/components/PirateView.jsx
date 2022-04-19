import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Stack, Card } from 'react-bootstrap'
import axios from 'axios'

export default function PirateView() {

    const [pirateName, setPirateName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [catchPhrase, setCatchPhrase] = useState("")
    const [counterValue, setCounterValue] = useState(0)
    const [rank, setRank] = useState("Rank")
    const [pegLeg, setPegLeg] = useState();
    const [eyePatch, setEyePatch] = useState();
    const [hookHand, setHookHand] = useState();
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/${id}`)
            .then(res => {
                setPirateName(res.data.pirateName)
                setImgUrl(res.data.imgUrl)
                setCatchPhrase(res.data.catchPhrase)
                setCounterValue(res.data.counterValue)
                setRank(res.data.rank)
                setPegLeg(res.data.pegLeg)
                setEyePatch(res.data.eyePatch)
                setHookHand(res.data.hookHand)
            })
            .catch(err => console.log(err))
    }, [])

    function runUpdate(index) {

        switch (index) {
            case 0:
                if (pegLeg === true) {
                    setPegLeg(false)
                } if (pegLeg === false) {
                    setPegLeg(true)
                }
                break;
            case 1:
                if (eyePatch === true) {
                    setEyePatch(false)
                } if (eyePatch === false) {
                    setEyePatch(true)
                }
                break;
            case 2:
                if (hookHand === true) {
                    setHookHand(false)
                } if (hookHand === false) {
                    setHookHand(true)
                }
                break;
            default:
                return
        }
    }

    useEffect(() => {
        handle()

    }, [pegLeg, eyePatch, hookHand])

    function handle() {
        axios.put(`http://localhost:8000/api/${id}`, {
            pegLeg,
            eyePatch,
            hookHand,
        })
            .then(res => { })
            .catch()
    }

    function createPirateCard() {

        const myStyle = {
            height: '400px',
            width: '400px',
        };

        return (

            <Card style={{ width: '48rem' }}>
                <Stack direction="horizontal" >
                    <Stack>
                    <Card.Img variant="top" src={imgUrl} style={myStyle} />
                    <i>"{catchPhrase}" </i>
                    </Stack>
                    <Card.Body>
                        <h1>About</h1>
                        <Card.Title><h2>{pirateName}</h2></Card.Title>
                        <Card.Text>
                            <b>Rank:</b>{rank} <br />
    
                            <b>Treasures Found:</b>{counterValue}<br />

                            <Stack direction="horizontal" gap={1} >
                                <b> PegLeg:</b>{pegLeg ? "yes" : "no"}
                                {pegLeg ? <Button variant='success' onClick={() => { runUpdate(0) }}>Yes</Button> : <Button onClick={() => { runUpdate(0) }} variant='danger' >No</Button>}
                            </Stack>

                            <Stack direction="horizontal" gap={1}>
                                <b> Eye Patch:</b>{eyePatch ? "yes" : "no"}
                                {eyePatch ? <Button variant='success' onClick={() => { runUpdate(1) }} >Yes</Button> : <Button variant='danger' onClick={() => { runUpdate(1) }}>No</Button>}
                            </Stack>

                            <Stack direction="horizontal" gap={1}>
                                <b>  Hook Hand:</b>{hookHand ? "yes" : "no"}<br />
                                {hookHand ? <Button variant='success' onClick={() => { runUpdate(2) }}>Yes</Button > : <Button variant='danger' onClick={() => { runUpdate(2) }}>No</Button>}
                            </Stack>

                        </Card.Text>
                        <Stack direction="horizontal" gap={1}>
                        </Stack>
                    </Card.Body>
                </Stack>
            </Card>)
    }

    const cardStyle = {
        fontSize: '25px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

    };
    return (
        <div className="row" style ={{
            height: '800px',
            marginTop: '25px'
        }}>
            <div className="col-2"></div>
            <div className="col-4" style={cardStyle}>
                {createPirateCard()}
            </div>
        </div>
    )
}

