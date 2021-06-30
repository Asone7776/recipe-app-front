import {notification} from "antd";

export const successNotify = (text: string = "OK") => {
    notification.success({
        message: text,
    });
};
export const failureNotify = (text: string = "Error") => {
    notification.error({
        message: text
    });
};
