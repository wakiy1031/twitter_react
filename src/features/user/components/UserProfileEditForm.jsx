import { Button, FormControl } from "@yamada-ui/react";
import { FloatingInput } from "../../../components/FloatingInput";
import { useState } from "react";
import { updateUserProfile } from "../../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../userSlice";

export const UserProfileEditForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user.name,
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
      const updatedUser = await updateUserProfile(formData);
      dispatch(fetchUser(user.id));
      onSuccess(updatedUser);
    } catch (error) {
      console.error("プロフィール更新中にエラーが発生しました:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FloatingInput
          id="name"
          name="name"
          type="text"
          placeholder="ユーザーネーム"
          value={formData.name}
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
