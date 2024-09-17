import { useEffect, useState } from "react";
import { Button, FormControl, VStack, useNotice } from "@yamada-ui/react";
import axios from "axios";
import { FloatingInput } from "../../../components/FloatingInput";

export const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [isFormValid, setIsFormValid] = useState(false);
  const notice = useNotice();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newIsFormValid = email !== "" && password !== "";
    setIsFormValid(newIsFormValid);
  }, [email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/sign_in",
        {
          email,
          password,
        }
      );

      const { "access-token": accessToken, client, uid } = response.headers;

      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("client", client);
      localStorage.setItem("uid", uid);

      notice({
        title: "ログイン成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onSuccess();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        notice({
          title: "ログイン失敗",
          description: "入力内容を確認してください。",
          status: "error",
        });
      } else {
        notice({
          title: "ログイン失敗",
          description:
            error.response?.data?.errors?.join(", ") || "エラーが発生しました",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full pt-1">
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.email}>
          <FloatingInput
            id="email"
            name="email"
            type="email"
            placeholder="メールアドレス"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FloatingInput
            id="password"
            name="password"
            type="password"
            placeholder="パスワード"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isDisabled={!isFormValid}>
          ログイン
        </Button>
      </VStack>
    </form>
  );
};
