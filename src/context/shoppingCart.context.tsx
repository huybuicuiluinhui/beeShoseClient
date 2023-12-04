import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ShoppingCart from "../components/ModalShoppingCart";
import { getUserFromCookie } from "../helper/useCookie";
import { getCookie } from "../helper/CookiesRequest";
import { IDetailProductCart } from "../types/product.type";
import axios from "axios";
import API from "../api";
import { toast } from "react-toastify";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
  avata: string;
  expirationTime: Date;
}

type ShoppingCartContext = {
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  addMultipleToCart: (id: number, quantityToAdd: number) => void;
  cartQuantity: number;
  cartQuantityUser: number;
  cartItems: CartItem[];
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  userPrf: User | null;
  addToCartUser: (idDetailShoe: number, quantity: number) => void;
  listProducts: IDetailProductCart[];
  reduceShoe: (id: number, quantity: number) => void;
  addShoe: (id: number, quantity: number) => void;
  removeFromCartUser: (id: number) => void;
  getProductQuantityById: (id: number) => number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [listProducts, setListProducts] = useState<IDetailProductCart[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const token = getCookie("customerToken");
  const [userPrf, setUserPrf] = useState<User | null>(null);
  const getListDetailCart = async () => {
    try {
      const res = await axios({
        method: "get",
        url: API.getListDetailCart(Number(userPrf?.id)),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
        setListProducts(res?.data || []);
        console.log("đã chạy lại rồi ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const reduceShoe = async (idShoeDetail: number, quantity: number) => {
    try {
      const res = await axios({
        method: "put",
        url: API.updateAmountShoe(),
        data: {
          quantity: quantity - 1,
          id: idShoeDetail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
        // setQuantity((prevQuantity) => prevQuantity - 1);
        toast("giảm");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getListDetailCart();
    }
  };
  const addShoe = async (idShoeDetail: number, quantity: number) => {
    try {
      const res = await axios({
        method: "put",
        url: API.updateAmountShoe(),
        data: {
          quantity: quantity + 1,
          id: idShoeDetail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
        toast("tăng");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getListDetailCart();
    }
  };
  const addToCartUser = async (idDetailShoe: number, quantity: number) => {
    if (userPrf) {
      try {
        const res = await axios({
          method: "post",
          url: API.addToCart(),
          data: {
            id: userPrf.id,
            quantity: quantity,
            shoeDetail: idDetailShoe,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status) {
          toast("đã thêm thành công");
        }
      } catch (error) {
        console.log(error);
      } finally {
        getListDetailCart();
      }
    }
  };
  const removeFromCartUser = async (idDetailCart: number) => {
    try {
      const res = await axios({
        method: "delete",
        url: API.removeFromCart(idDetailCart),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status) {
      }
    } catch (error) {
    } finally {
      getListDetailCart();
    }
  };
  const getProductQuantityById = (productId: number) => {
    console.log("đã thay đổi số lượng");
    const product = listProducts.find(
      (product) => product?.idProductDetail === productId
    );
    return product ? product?.quantity : 0;
  };
  const cartQuantityUser = listProducts.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  useEffect(() => {
    const userFromCookie = getUserFromCookie();
    if (
      userFromCookie &&
      JSON.stringify(userFromCookie) !== JSON.stringify(userPrf)
    ) {
      setUserPrf(userFromCookie);
    }
  }, [userPrf, setUserPrf]);
  useEffect(() => {
    if (!!userPrf?.id && !!token) {
      getListDetailCart();
    }
  }, [userPrf?.id, token]);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  //  Khách vãng lãi
  // Lấy số lượng sản phẩm
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  // tăng số lượng
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  // giảm số lượng
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function clearCart() {
    setCartItems([]);
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }
  function addMultipleToCart(id: number, quantityToAdd: number) {
    setCartItems((currItems) => {
      const updatedItems = [...currItems]; // Tạo một bản sao của mảng hiện tại

      const itemIndex = updatedItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng đúng
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + quantityToAdd,
        };
      } else {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng
        updatedItems.push({ id, quantity: quantityToAdd });
      }

      return updatedItems;
    });
  }
  console.log("listProducts.length", listProducts.length);
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        addMultipleToCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        cartQuantityUser,
        clearCart,
        loading,
        setLoading,
        userPrf,
        listProducts,
        addToCartUser,
        reduceShoe,
        addShoe,
        removeFromCartUser,
        getProductQuantityById,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
