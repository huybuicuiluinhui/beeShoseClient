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
  cartItems: CartItem[];
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  userPrf: User | null;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const token = getCookie("customerToken");
  const [userPrf, setUserPrf] = useState<User | null>(null);
  useEffect(() => {
    console.log(token);
    const userFromCookie = getUserFromCookie();
    console.log("userFromCookie", userFromCookie);
    if (userFromCookie) {
      setUserPrf(userFromCookie);
    }
  }, [token]);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
        clearCart,
        loading,
        setLoading,
        userPrf,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
