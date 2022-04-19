import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Dropdown, Stack } from 'react-bootstrap'
import CounterInput from 'react-bootstrap-counter';
import axios from 'axios'

export default function PirateForm() {

    const [pirateName, setPirateName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [catchPhrase, setCatchPhrase] = useState("")
    const [counterValue, setCounterValue] = useState(0)
    const [rank, setRank] = useState("Rank")
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);

    const [errors, setErrors] = useState({})

    function setUp() {
        setPirateName("")
        setImgUrl("")
        setCatchPhrase("")
        setCounterValue(0)
        setPegLeg(true)
        setEyePatch(true)
        setHookHand(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validateFields(pirateName, imgUrl, catchPhrase, counterValue, rank, pegLeg, eyePatch, hookHand)) {
            axios.post('http://localhost:8000/api', {
                pirateName,
                imgUrl,
                catchPhrase,
                counterValue,
                rank,
                pegLeg,
                eyePatch,
                hookHand
            }).then((res) => {
                console.log(res.data.errors)
                setErrors(res.data.errors)
                setUp()
            }).catch()
        }
    }

    function validateFields(pirateName, imgUrl, catchPhrase, counterValue, rank, pegLeg, eyePatch, hookHand) {
        //required
        if (pirateName === "") {
            return [false, "field" + pirateName + "is required"];
        }
        // min 3 letters
        if (pirateName.length < 3) {
            return false;
        }
        //required
        if (imgUrl === "") {
            return [false, "field" + imgUrl + "is required"];
        }
        //required
        if (catchPhrase === "") {
            return [false, "field" + catchPhrase + "is required"];
        }
        return true
    }

    const myStyle = {
        fontSize: '25px',
        height : '800px'

      };
    return ( 
        <div className="row" style={myStyle}>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"></link>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className="col-2"></div>
            <div className="col-8">
                <Form onSubmit={handleSubmit}>
                    <Stack direction='horizontal'>

                        <Stack>
                            <Form.Group className="mb-3" controlId="pirateName">
                                <Form.Label>Pirate Name</Form.Label>
                                <Form.Control type="text" placeholder="Pirate Name" value={pirateName} onChange={(e) => { setPirateName(e.target.value) }} />
                                <Form.Text className="text-dark">{errors ? (errors.pirateName ? errors.pirateName.message : "") : ""}</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imgURL">
                                <Form.Label>Img URL</Form.Label>
                                <Form.Control type="text" placeholder="enter a Img URL" value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} />
                                <Form.Text className="text-dark">{errors ? (errors.imgUrl ? errors.imgUrl.message : "") : ""}</Form.Text>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="catchPhrase">
                                <Form.Label>Catch Phrase</Form.Label>
                                <Form.Control type="text" placeholder="enter a catch Phrase" value={catchPhrase} onChange={(e) => { setCatchPhrase(e.target.value) }} />
                                <Form.Text className="text-dark">{errors ? (errors.catchPhrase ? errors.catchPhrase.message : "") : ""}</Form.Text>
                            </Form.Group>
                        </Stack>

                        <Stack >

                            <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    {rank}
                                </Dropdown.Toggle>

                                <Dropdown.Menu onClick={(e) => { setRank(e.target.id) }} >
                                    <Dropdown.Item id="Captain">Captain</Dropdown.Item>
                                    <Dropdown.Item id="First Mate">First Mate</Dropdown.Item>
                                    <Dropdown.Item id="Quarter Master">Quarter Master</Dropdown.Item>
                                    <Dropdown.Item id="Boatsswain">Boatsswain</Dropdown.Item>
                                    <Dropdown.Item id="Powder Monkey">Powder Monkey</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Text className="text-dark">{errors ? (errors.rank ? errors.rank.message : "") : ""}</Form.Text>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="PegLeg" checked={pegLeg} onChange={(e) => { setPegLeg(e.target.checked) }} />
                                <Form.Check type="checkbox" label="Eye Patch" checked={eyePatch} onChange={(e) => { setEyePatch(e.target.checked) }} />
                                <Form.Check type="checkbox" label="Hook Hand" checked={hookHand} onChange={(e) => { setHookHand(e.target.checked) }} />
                            </Form.Group>
                            <CounterInput value={counterValue} min={0} max={10} onChange={(value) => { setCounterValue(value) }} />
                        </Stack>

                    </Stack>
                    <Button variant="primary" type="submit">add Pirate</Button>
                </Form>
            </div>
        </div>
    )
}
