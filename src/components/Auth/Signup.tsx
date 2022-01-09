import { Button, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { baseURI } from 'config/networks';
import { useActions } from 'hooks/use-actions';
import { useTypedSelector } from 'hooks/use-typed-selector';
import React, { useCallback, useState } from 'react';
import { Navigate } from "react-router-dom";
import { errObjToStr } from 'utils/error';

const Signup = (props: any) => {
    const [error, setError] = useState<null | string>(null);
    const state = useTypedSelector((state) => state);
    const { auth: { isAuthenticated } } = state;
    const { authUser } = useActions();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChagne = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const submitForm = useCallback(async () => {
        setError('')
        try {
            const response = await axios.post(`${baseURI}/api/users/signup`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            console.log('response.status', response.status)
            if (response.status === 201) {
                authUser({
                    isAuthenticated: true,
                    token: response.data
                });
                <Navigate to="/film" />
            }
        } catch (err: any) {
            const { errors } = err.response.data;
            const getError = errObjToStr(errors);
            setError(getError);

        }
    }, [formData, authUser]);

    if (isAuthenticated) {
        return <Navigate to="/film" />
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
                    Signup
                </Button>
            </FormGroup>
        </div>
    );
};


export default Signup;