import React, {useState, useEffect} from 'react';
import { FormControl, InputLabel, Input, FormGroup, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useCallback } from 'react';
import { baseURI } from 'config/networks';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { useActions } from 'hooks/use-actions';
import axios from 'axios';
import './Login.scss';
type LoginProps = any;

const Login: React.FC = (props: LoginProps) => {
    const [error, setError] = useState<null | string>(null);
    const { authUser } = useActions();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const auth = useTypedSelector(({ auth }) => {
        return auth;
    });
    const onChagne = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const submitForm = useCallback(async () => {
        setError('')
        try {
            const response = await axios.post(`${baseURI}/api/users/signin`, formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            if (response.status === 200) {
                authUser({
                    isAuthenticated: true,
                    token: response.data.jwt
                });
                props.history.push('/dashboard');
            }
        } catch (err) {
            setError('Invalid username or password');
            console.log('Invalid username or password')
            console.error(err);
        }
    }, [formData, authUser, props.history]);
    useEffect(() => {
    }, [auth])
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
}
export default Login;