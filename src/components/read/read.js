import React, { useEffect, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TextField,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Paper,
} from "@material-ui/core";


import axios from "axios";
import { Link } from "react-router-dom";

export default function Read() {
    const [apiData, setApiData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        axios
        .get(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam`)
        .then((getData) => {
            console.log(getData);
            setApiData(getData.data);
        });
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== "") {
            const filteredData = apiData.filter((item) => {
                return Object.values(item)
                .join("")
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(apiData);
        }
        console.log(apiData)
    };

    const setData = (id, name, description, avatar) => {
        localStorage.setItem("ID", id);
        localStorage.setItem('avatar', avatar)
        localStorage.setItem("name", name);
        localStorage.setItem("description", description);
    };

    const getData = () => {
        axios
        .get(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam`)
        .then((getData) => {
            setApiData(getData.data);
        });
    };

    const onDelete = (id) => {
        axios
        .delete(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam/${id}`)
        .then(() => {
            getData();
        });
    };

    return (
        <div>
        <FormControl>
            <TextField
            id='outlined-basic'
            label="Search ..."
            variant="outlined"
            size="small"
            className="search__input"
            onChange={(e) => searchItems(e.target.value)}
            style={{
                paddingBottom: 20,
            }}
            />
        </FormControl>
        <Paper>
            <Table>
                <TableHead>
                    <TableRow className="table__row">
                        <TableCell className="table__cell">ID</TableCell>
                        <TableCell className="table__cell">Avatar</TableCell>
                        <TableCell className="table__cell">Name</TableCell>
                        <TableCell className="table__cell">Description</TableCell>
                        <TableCell className="table__cell">Update</TableCell>
                        <TableCell className="table__cell">Delete</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {searchInput.length > 1
                    ? filteredResults.map((data) => {
                        return (
                            <Card>
                            <CardContent>
                                <CardHeader>{data.name}</CardHeader>
                                <CardHeader>{data.description}</CardHeader>
                            </CardContent>
                            </Card>
                        );
                        })
                    : apiData.map((data) => {
                        return (
                            <TableRow>
                            <TableCell>{data.id}</TableCell>
                            <img width='150' height='150' alt='' src={data.avatar} />
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.description}</TableCell>
                            <TableCell>
                                <Link to="/update">
                                <Button
                                    variant="contained"
                                    color="green"
                                    onClick={() =>
                                    setData(data.id, data.name, data.description)
                                    }
                                    style={{
                                    backgroundColor: "#21b64b",
                                    color: "#fff",
                                    }}
                                >
                                    Update
                                </Button>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                    color="red"
                                onClick={() => onDelete(data.id)}
                                style={{
                                    backgroundColor: "#b62621",
                                    color: "#fff",
                                }}
                                >
                                Delete
                                </Button>
                            </TableCell>
                            </TableRow>
                        );
                        })}
                </TableBody>
            </Table>
        </Paper>
        </div>
    );
}
