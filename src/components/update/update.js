import React, { useState, useEffect } from 'react';
import { FormControl, Button, TextField, Grid } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function Update() {
    let history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam/${ID}`, {
            name,
            description
        }).then(() => {
            history.push('/read')
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <FormControl>
                <Grid container spacing={5}>
                    <Grid item>
                        <TextField className='text__field'
                            id='outlined-basic'
                            label='Name'
                            variant='outlined'
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            size='small'
                            margin='normal'
                            style={{width: 200}}
                            
                        />
                    </Grid>
                    <Grid item>
                        <TextField className='text__field'
                            id='outlined-basic'
                            label='Description'
                            variant='outlined'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} 
                            size='small'
                            margin='normal'
                            style={{width: 200}}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={5}>
                    <Grid item>
                        <Button 
                                variant='contained'
                                color='primary' 
                                onClick={sendDataToAPI}
                                style={
                                    {
                                        backgroundColor: '#21b64b',
                                        color: '#fff',
                                        maxWitdh: '200px',
                                        minWidth: '200px'
                                    }
                                }
                            >
                                Update
                            </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                                variant='contained'
                                color='primary'
                                onClick={() => history.goBack()}
                                style={
                                    {
                                        backgroundColor: '#5e5e59',
                                        color: '#fff',
                                        maxWitdh: '200px',
                                        minWidth: '200px'
                                    }   
                                }
                            >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}
