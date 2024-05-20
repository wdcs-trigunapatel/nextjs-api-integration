import { FC } from "react";
import { toast } from "react-toastify";
import { TOAST } from "@/constants/commanConstants";

interface NotificationProps {
  type: string;
  message: any;
}

const Notification: FC<NotificationProps> = ({ type, message }) => {
  switch (type) {
    case TOAST.SUCCESS:
      toast.success(message);
      break;
    case TOAST.DANGER:
      toast.warning(message);
      break;
    case TOAST.ERROR:
      toast.error(message);
      break;
    default:
      toast(message);
  }
  return null;
};

export default Notification;
