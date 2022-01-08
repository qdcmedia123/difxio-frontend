import React, { useState, useEffect, useCallback } from 'react';
import { FormControl, InputLabel, Input, FormGroup, Button } from '@material-ui/core';
import { useActions } from 'hooks/use-actions';
import Alert from '@material-ui/lab/Alert';

const Signup = () => {
    const [error, setError] = useState<null | string>(null);
    const { authUser } = useActions();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChagne = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const submitForm = () => {

    }
    return (
        <div className="container-sm">
            <FormGroup>
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input type="email"
                        name="email"
                        id="email"
                        value={formData.email || ''}
                        onChange={onChagne} />
                </FormControl>
            </FormGroup>
            <FormGroup style={{ marginTop: '2em' }}>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        name="password"
                        value={formData.password || ''}
                        onChange={onChagne}
                        type="password" id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
            </FormGroup>
            {error && <FormGroup style={{ marginTop: '2em' }}>
                <Alert variant="outlined" severity="error">
                    {error}
                </Alert>
            </FormGroup>}
            <FormGroup style={{ marginTop: '2em' }}>
                <Button
                    onClick={() => submitForm()}
                    type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </FormGroup>
        </div>
    );
};


export default Signup;