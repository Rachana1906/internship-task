import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"

import "./App.css"
import { Button } from "@material-ui/core"
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
})
function App() {
    const classes = useStyles()
    const [rows, setRows] = useState([])
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [web, setWeb] = useState("")
    const [id, setId] = useState(null)
    const [rerender, setRerender] = useState(true)
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((data) => data.json())
            .then((data) => {
                console.log(data)
                setRows(data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [])
    const rearrange = (A, id, data) => {
        setRows([])
        for (let i = 0; i < A.length; i++) {
            if (A[i].id === id) {
                setRows((prevState) => [...prevState, data])
            }
            setRows((prevState) => [...prevState, A[i]])
        }
        return A
    }
    const add = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/`, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                name,
                username,
                email,
                phone,
                website: web,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setRows((prevState) => [...prevState, res])
                // rearrange(rows, id, res)
                console.log("response: " + res)
                setShow(!show)
            })
    }
    const update = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                name,
                username,
                email,
                phone,
                website: web,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setRows((prevState) => [...prevState, res])
                rearrange(rows, id, res)
                console.log("response: " + res)
                setShow(!show)
            })
    }
    const del = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((res) => {
                setRows((prevState) => [...prevState, res])
                console.log("response: " + res)
                setShow(!show)
            })
    }

    return (
        <div>
            <div className="header">
                <ul style={{ listStyle: "none" }}>
                    <li onClick={() => setShow(!show)}>Edit data</li>
                </ul>
            </div>
            <div className="outer">
                {show ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            style={{ width: "50vw", marginBottom: "10px" }}
                            id="outlined-basic"
                            label="ID"
                            variant="outlined"
                            type="number"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            style={{ width: "50vw", marginBottom: "10px" }}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            style={{ width: "50vw", marginBottom: "10px" }}
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            style={{ width: "50vw", marginBottom: "10px" }}
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            style={{ width: "50vw", marginBottom: "10px" }}
                            label="Phone"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            style={{ width: "50vw", marginBottom: "10px" }}
                            id="outlined-basic"
                            label="Website"
                            variant="outlined"
                            value={web}
                            onChange={(e) => setWeb(e.target.value)}
                        />
                        <div
                            style={{
                                marginTop: "10px",
                                width: "50vw",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            {" "}
                            <Button onClick={add}>Add row</Button>
                            <Button onClick={update}>Update row</Button>
                            <Button onClick={del}>delete row</Button>
                        </div>
                    </div>
                ) : null}
                {!show ? (
                    <TableContainer component={Paper}>
                        <Table
                            style={{ border: "1px solid #ccc" }}
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        ID
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold" }}>
                                        Name
                                    </TableCell>
                                    <TableCell
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                    >
                                        Username
                                    </TableCell>
                                    <TableCell
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                    >
                                        Email
                                    </TableCell>
                                    <TableCell
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                    >
                                        phone
                                    </TableCell>
                                    <TableCell
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                    >
                                        Website
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ overflow: "auto" }}>
                                {rows.length > 0 ? (
                                    rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.username}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.phone}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.website}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <h2> Loading...</h2>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null}
            </div>
        </div>
    )
}

export default App
