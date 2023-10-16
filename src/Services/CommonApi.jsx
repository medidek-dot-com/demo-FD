import axios from "axios";

export const commonRequest = async (methods, url, body, header) => {
    const config = {
        method: methods,
        url,
        data: body,
        header: header ? header : { "Content-Type": "application/json" },
    };

    //axios instance

    return axios(config)
        .then((data) => data)
        .catch((err) => {
            console.log(err.response.data.msg);
        });
};
