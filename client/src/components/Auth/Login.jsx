import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from "react-router-dom";

export default function Login() {

    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    });

    function handleSubmit () {
        console.log(formData);
        // Validate + api call
    }

    return (
        <>
        <h2>Login Form</h2>
        <FormControl className="flex flex-col gap-4 mt-4">
            <FormControl mb={3}>
                <FormLabel>Phone No.</FormLabel>
                <Input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder='Enter phone number'
                />
            </FormControl>
            <FormControl mb={3}>
                <FormLabel>Password</FormLabel>
                <Input
                    type='password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder='Enter password'
                />
            </FormControl>

            <Button onClick={handleSubmit}>
                Log in
            </Button>

            <span>
                Donot have an account?
                <Link to='/signup'>&nbsp;signup</Link>
            </span>

        </FormControl>
        </>
    )
}