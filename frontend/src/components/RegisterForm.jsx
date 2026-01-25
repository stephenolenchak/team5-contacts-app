import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    CardContent,
    Stack,
} from "@mui/material";

export default function Register() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const validate = () => {
        const e = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!values.firstName) e.firstName = "First name is required";
        if (!values.lastName) e.lastName = "Last name is required";

        if (!emailRegex.test(values.email))
            e.email = "Enter a valid email address";

        if (values.password.length < 8)
            e.password = "Password must be at least 8 characters";

        if (values.password !== values.confirm)
            e.confirm = "Passwords do not match";

        setErrors(e);
        return Object.keys(e).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("Registration OK:", values);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CardContent>
                    <Typography variant="h2" gutterBottom>Create Your Account</Typography>

                    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange("firstName")}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            fullWidth
                        />

                        <TextField
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleChange("lastName")}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            fullWidth
                        />

                        <TextField
                            label="Email"
                            value={values.email}
                            onChange={handleChange("email")}
                            error={!!errors.email}
                            helperText={errors.email}
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange("password")}
                            error={!!errors.password}
                            helperText={errors.password}
                            fullWidth
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={values.confirm}
                            onChange={handleChange("confirm")}
                            error={!!errors.confirm}
                            helperText={errors.confirm}
                            fullWidth
                        />

                        <Button type="submit" variant="contained" size="large">
                            Create Account
                        </Button>
                    </Stack>
                </CardContent>
        </Box>
    );
}
