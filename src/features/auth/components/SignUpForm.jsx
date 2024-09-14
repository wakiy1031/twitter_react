import { useState, useEffect } from "react";
import { Button, FormControl, VStack, useNotice } from "@yamada-ui/react";
import { signUp } from "../../api/authApi";
import { BirthdateSelect } from "./BirthdateSelect";
import { FloatingInput } from "../../../components/FloatingInput";

export const SignUpForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    password_confirmation: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const notice = useNotice();

  useEffect(() => {
    const { name, email, phone, birthdate, password, password_confirmation } =
      formData;
    const newIsFormValid =
      name !== "" &&
      email !== "" &&
      phone !== "" &&
      birthdate !== "" &&
      password !== "" &&
      password_confirmation !== "" &&
      password === password_confirmation;

    console.log("フォームデータ:", formData);
    console.log("フォーム有効性:", newIsFormValid);

    setIsFormValid(newIsFormValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBirthdateChange = (value) => {
    setFormData({ ...formData, birthdate: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("送信データ:", formData);
    try {
      const response = await signUp(formData);
      console.log("登録完了、メールを確認してください。", response);
      notice({
        title: "登録完了、メールを確認してください。",
        status: "success",
      });
      onSuccess();
    } catch (error) {
      console.error("サインアップエラー:", error);
      console.error("登録に失敗しました。", error);
      notice({
        title: "登録に失敗しました。",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full pt-1">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FloatingInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="名前"
            required
          />
        </FormControl>
        <FormControl>
          <FloatingInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="メールアドレス"
            required
          />
        </FormControl>
        <FormControl>
          <FloatingInput
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="電話番号"
            required
          />
        </FormControl>
        <BirthdateSelect onChange={handleBirthdateChange} />
        <FormControl>
          <FloatingInput
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="パスワード"
            required
          />
        </FormControl>
        <FormControl>
          <FloatingInput
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="パスワード確認"
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isDisabled={!isFormValid}>
          アカウントを作成
        </Button>
      </VStack>
    </form>
  );
};
