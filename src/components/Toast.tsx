import { Toast } from "flowbite-react";
import Images from "../static";

export default function SimpleToast() {
  return (
    <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700 z-50 fixed top-[10%] right-1">
      <Toast>
        <img
          src={Images.iconShoppingSuccess}
          className="w-10 h-10 object-contain"
        />
        <div className="pl-4 text-sm font-normal">
          Message sent successfully.
        </div>
      </Toast>
    </div>
  );
}
