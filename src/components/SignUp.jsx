import { useState } from "react";
import { signUp } from "../apis/auth";
import {
  Button,
  FormControl,
  Label,
  Input,
  VStack,
  useNotice,
} from "@yamada-ui/react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    password_confirmation: "",
  });

  const notice = useNotice();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData);
      console.log("Sign up successful", response);
      notice({
        title: "Sign up successful",
        status: "success",
      });
    } catch (error) {
      console.error("Sign up failed", error);
      notice({
        title: "Sign up failed",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch" maxW="md" mx="auto" mt={8}>
        <FormControl>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="birthdate">Birthdate</Label>
          <Input
            id="birthdate"
            name="birthdate"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      </VStack>
    </form>
  );
}

export default SignUp;
