import { Button, FormControl } from "@yamada-ui/react";
import { FloatingInput } from "../../../components/FloatingInput";
import { useState } from "react";
import { updateUserProfile } from "../../api/userApi";
import { useSelector } from "react-redux";

export const UserProfileEditForm = ({ onSuccess }) => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    user_name: user.user_name,
    description: user.description,
    website: user.website,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);

      onSuccess();
    } catch (error) {
      console.error("プロフィール更新中にエラーが発生しました:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FloatingInput
          id="user_name"
          name="user_name"
          type="text"
          placeholder="ユーザーネーム"
          value={formData.user_name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FloatingInput
          id="description"
          name="description"
          type="text"
          placeholder="自己紹介"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FloatingInput
          id="website"
          name="website"
          type="text"
          placeholder="ウェブサイト"
          value={formData.website}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        更新
      </Button>
    </form>
  );
};
