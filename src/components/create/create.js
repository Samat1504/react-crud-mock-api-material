import React, { useState } from 'react';
import { FormControl, Button, TextField, Grid } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router';



export default function Create() {

    let history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const sendDataToAPI = () => {
        axios.post(`https://61dfd1c50f3bdb0017934bcc.mockapi.io/Sam`, {
        name,
        description
        }).then(() => {
        history.push('/read')
        })
    }   


    return (
        <div className='create'>
            <FormControl>
                <Grid container spacing={5}>
                    <Grid item>
                        <TextField
                            className='text__field'
                            id='outlined-basic'
                            label='Name'
                            variant='outlined'
                            onChange={(e) => setName(e.target.value)} 
                            size='small'
                            margin='normal'
                            style={{width: 200}}
                            
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            className='text__field'
                            id='outlined-basic'
                            label='Description'
                            variant='outlined'
                            onChange={(e) => setDescription(e.target.value)} 
                            size='small'
                            margin='normal'
                            style={{width: 200}}
                        />
                    </Grid>
                </Grid>

                <Button     
                    id='btn'
                    className='create__btn'
                    variant='contained'
                    color='primary'
                    onClick={sendDataToAPI}
                    disabled={!name && !description}
                    style={
                        {
                            marginBottom: 60,
                            marginTop: 10
                        }
                    }
                >
                    Submit
                </Button>
            </FormControl>
        </div>
    )
}
