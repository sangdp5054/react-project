import axiosClient from "./axiosClient";
const userApi = {
    getAll(params) {
        const url = '/api/v1/acs/acs_registrycardmonth';
        return axiosClient.get(url, { params });
    },
    get(id) {
        const url = '/api/v1/acs/acs_registrycardmonth/${id}';
        return axiosClient.get(url);
    },
    add(data) {
        const url = '/api/v1/acs/acs_registrycardmonth';
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = '/api/v1/acs/acs_registrycardmonth/${data.id}';
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = '/api/v1/acs/acs_registrycardmonth/${data.id}';
        return axiosClient.delete(url);
    }
    // render() {
    //     <div className="list-user-container">
    //         <div className="title">
    //             All
    //         </div>
    //         <div className="list-user-content">
    //             <div className="child">
    //                 abc
    //             </div>
    //         </div>
    //     </div>
    // }
};
export default userApi;