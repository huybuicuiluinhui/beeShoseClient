import axios from "axios";
import { useState } from "react";
import API from "../../../api";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../../utils/format";
import { toast } from "react-toastify";

interface CustomError {
  message: string;
  response?: {
    data?: string;
    status?: number;
  };
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordComfirm, setNewPasswordComfirm] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    newPassword: "",
    newPasswordComfirm: "",
  });
  const handleRePassword = async () => {
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Email không hợp lệ." }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!validatePassword(newPassword)) {
      setErrors((prev) => ({
        ...prev,
        newPassword:
          "Mật khẩu không hợp lệ. Định dạng mật khẩu: ít nhất 6 ký tự, ít nhất một số, một chữ hoa",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    }
    if (newPassword !== newPasswordComfirm) {
      setErrors((prev) => ({
        ...prev,
        newPasswordComfirm: "Mật khẩu nhập lại không khớp.",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, newPasswordComfirm: "" }));
    }
    try {
      const res = await axios({
        method: "post",
        url: API.changePassword(),
        data: {
          email: email,
          password: password,
          newPassword: newPassword,
        },
      });
      if (res.status) {
        toast.success("Đã đổi mật khẩu thành công");
        navigate("/");
      }
    } catch (error) {
      if (typeof error === "string") {
        // Nếu error là một chuỗi, giả sử đó là một thông báo lỗi từ server
        toast.error(error);
      } else if (error instanceof Error) {
        // Nếu error là một đối tượng Error và có response
        const customError = error as CustomError;
        if (customError.response && customError.response.data) {
          toast.error(customError.response.data);
        } else {
          toast.error(customError.message);
        }
      } else {
        // Trường hợp khác, hiển thị một thông báo mặc định
        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
      }
    }
  };
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <div className="w-[80%] mx-auto">
        <p className="font-semibold text-gray-800 mt-8    ">Đổi mật khẩu</p>
      </div>
      <div className="mx-auto w-[50%] mt-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email*
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu*
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*****************"
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Mật khẩu*
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*****************"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs italic">{errors.newPassword}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newpassword"
          >
            Nhập mật khẩu mới*
          </label>
          <input
            value={newPasswordComfirm}
            onChange={(e) => setNewPasswordComfirm(e?.target?.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newpassword"
            type="password"
            placeholder="*****************"
          />
          {errors.newPasswordComfirm && (
            <p className="text-red-500 text-xs italic">
              {errors.newPasswordComfirm}
            </p>
          )}
        </div>
        <button
          className="bg-gray-600 text-white px-5 py-2 rounded "
          onClick={() => {
            handleRePassword();
          }}
        >
          Xác nhận thay đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
