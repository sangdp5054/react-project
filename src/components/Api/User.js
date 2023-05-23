import ApiAxiosClient from '../Api/AxiosClient';
const ApiUser = {
    getAll(params) {
        const url = '/api/v1/acs/acs_registrycardmonth';
        return ApiAxiosClient.get(url, { params });
    },
    get(id) {
        const url = '/api/v1/acs/acs_registrycardmonth/${id}';
        return ApiAxiosClient.get(url);
    },
    add(data) {
        const url = '/api/v1/acs/acs_registrycardmonth';
        return ApiAxiosClient.post(url, data);
    },
    update(data) {
        const url = '/api/v1/acs/acs_registrycardmonth/${data.id}';
        return ApiAxiosClient.patch(url, data);
    },
    remove(id) {
        const url = '/api/v1/acs/acs_registrycardmonth/${data.id}';
        return ApiAxiosClient.delete(url);
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
export default ApiUser;