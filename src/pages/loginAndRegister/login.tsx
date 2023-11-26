import axios from "axios";
import React, { useState } from "react";
import API from "../../api";
import { setToken, setUserToken } from "../../helper/useCookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import path from "../../constants/path";
import Fade from "react-reveal/Fade";
interface CustomError {
  message: string;
  response?: {
    data?: string;
    status?: number;
  };
}

const Registration = ({
  checkRegister,
  setCheckRegister,
}: {
  checkRegister: boolean;
  setCheckRegister: any;
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      {checkRegister ? (
        <>
          <h2 className="text-lg mb-4 font-semibold">
            Khách hàng đã có tài khoản
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            Bằng cách tạo tài khoản với BeeShoe, bạn sẽ có thể di chuyển qua quy
            trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ giao hàng, xem và
            theo dõi đơn hàng của bạn trong tài khoản của bạn và hơn thế nữa.
          </p>
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setCheckRegister(false)}
          >
            ĐĂNG NHẬP NGAY
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg mb-4 font-semibold">Khách hàng đăng ký mới</h2>
          <p className="mb-4 text-sm text-gray-700">
            Bằng cách tạo tài khoản với BeeShoe, bạn sẽ có thể di chuyển qua quy
            trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ giao hàng, xem và
            theo dõi đơn hàng của bạn trong tài khoản của bạn và hơn thế nữa.
          </p>
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => setCheckRegister(true)}
          >
            ĐĂNG KÝ NGAY
          </button>
        </>
      )}
    </div>
  );
};
const LoginScreen = () => {
  const [checkRegister, setCheckRegister] = useState<boolean>(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailR, setEmailR] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassWord] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errors2, setErrors2] = useState({
    email: "",
    phone: "",
    newPassword: "",
    newPassword2: "",
  });

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/; // Regex đơn giản cho định dạng email
    return re.test(email);
  };
  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
  };
  const regexPhoneNumber = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
  const login = async () => {
    // if (!validateEmail(email)) {
    //   setErrors((prev) => ({ ...prev, email: "Email không hợp lệ." }));
    //   return;
    // } else {
    //   setErrors((prev) => ({ ...prev, email: "" }));
    // }

    // if (!validatePassword(password)) {
    //   setErrors((prev) => ({ ...prev, password: "Mật khẩu không hợp lệ." }));
    //   return;
    // } else {
    //   setErrors((prev) => ({ ...prev, password: "" }));
    // }
    try {
      const res = await axios({
        method: "post",
        url: API.login(),
        data: {
          email: email,
          password: password,
        },
      });
      if (res.status) {
        toast.success("Đăng nhập thành công");
        console.log(res.data);
        setToken(res.data.token);
        setUserToken(res.data.token);
        sessionStorage.setItem(
          "idAccount",
          (jwtDecode(res.data.token) as { id: string }).id
        );
        navigate(path.home);
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
  const register = async () => {
    if (!validateEmail(emailR)) {
      setErrors2((prev) => ({ ...prev, email: "Email không hợp lệ." }));
      return;
    } else {
      setErrors2((prev) => ({ ...prev, email: "" }));
    }
    if (!regexPhoneNumber.test(phone)) {
      console.log("Ahihih");
      setErrors2((prev) => ({
        ...prev,
        phone: "Số điện thoại không đúng định dạng",
      }));
      return;
    } else {
      setErrors2((prev) => ({ ...prev, phone: "" }));
    }
    if (!validatePassword(newPassword)) {
      setErrors2((prev) => ({
        ...prev,
        newPassword:
          "Mật khẩu không hợp lệ. Định dạng mật khẩu: ít nhất 6 ký tự, ít nhất một số, một chữ hoa",
      }));
      return;
    } else {
      setErrors2((prev) => ({ ...prev, newPassword: "" }));
    }

    if (newPassword !== newPassword2) {
      setErrors2((prev) => ({
        ...prev,
        newPassword2: "Mật khẩu nhập lại không khớp.",
      }));
      return;
    } else {
      setErrors2((prev) => ({ ...prev, newPassword2: "" }));
    }
    try {
      const res = await axios({
        method: "post",
        url: API.register(),
        data: {
          email: emailR,
          password: newPassword,
          role: "ROLE_USER",
          phoneNumber: phone,
        },
      });
      if (res.status === 200) {
        toast.success("Đăng ký thành công");
        setEmailR("");
        setNewPassWord("");
        setNewPassword2("");
        setPhone("");
        setErrors2({
          phone: "",
          email: "",
          newPassword: "",
          newPassword2: "",
        });
        setCheckRegister(false);
      } else {
      }
    } catch (error) {
      console.log(error);
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
    <div className="min-h-screen bg-gray-100 flex ">
      <Fade top distance="10%" duration={1000}>
        <div className="flex justify-between items-start bg-white p-6 rounded-lg shadow-lg">
          <div className="w-[50%]">
            <div className="flex flex-col items-center p-4">
              {checkRegister ? (
                <>
                  <div className="flex gap-4 mb-4 font-bold text-lg">
                    Đăng ký ngay
                  </div>
                  <form
                    className="w-full max-w-xs"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email*
                      </label>
                      <input
                        value={emailR}
                        onChange={(e) => setEmailR(e?.target?.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Your email"
                      />
                      {errors2.email && (
                        <p className="text-red-500 text-xs italic">
                          {errors2.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Số điện thoại*
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e?.target?.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Your email"
                      />
                      {errors2.phone && (
                        <p className="text-red-500 text-xs italic">
                          {errors2.phone}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Mật khẩu*
                      </label>
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassWord(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                      />
                      {errors2.newPassword && (
                        <p className="text-red-500 text-xs italic">
                          {errors2.newPassword}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password2"
                      >
                        Nhập lại mật khẩu*
                      </label>
                      <input
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password2"
                        type="password"
                        placeholder="******************"
                      />
                      {errors2.newPassword2 && (
                        <p className="text-red-500 text-xs italic">
                          {errors2.newPassword2}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={register}
                      >
                        ĐĂNG KÝ
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex gap-4 mb-4 font-bold text-lg">
                    Đăng nhập ngay
                  </div>
                  <form
                    className="w-full max-w-xs"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email*
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Your email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs italic">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Mật khẩu*
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs italic">
                          {errors.password}
                        </p>
                      )}

                      {/* <p className="text-xs italic">Nhớ mật khẩu</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={login}
                      >
                        ĐĂNG NHẬP
                      </button>
                      <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="#"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="w-[50%]">
            <Registration
              checkRegister={checkRegister}
              setCheckRegister={setCheckRegister}
            />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default LoginScreen;
