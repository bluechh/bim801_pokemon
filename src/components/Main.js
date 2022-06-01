import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import * as actions from '../store/authActions';
import { useHistory, useLocation } from "react-router-dom";

const theme = createTheme();

function Login(props) {
    const [username, setuserName] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    // let history = useHistory();
    // let location = useLocation();
    // let { from } = location.state || { from: { pathname: "/" } };

    // React.useEffect(() => {
    //     if (props.isAuthenticated) { history.replace(from) };
    // });

    const handleFormFieldChange = (event) => {
        switch (event.target.id) {
          case 'username': setuserName(event.target.value); break;
          case 'password': setPassword(event.target.value); break;
          default: return null;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAuth(username, password);
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleFormFieldChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFormFieldChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
    );
}

  export default Login