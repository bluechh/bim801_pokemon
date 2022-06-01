import fetch from  'isomorphic-fetch';
import axios from 'axios';


const BASE_API_URL = "http://localhost:8000/api/"

export function api(api_end_point, data) {

    // return fetch(BASE_API_URL+api_end_point, 
    //     {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body:JSON.stringify(data)
    //     }).then((response) => {
    //         return response.json();
    //     });
    // return axios.post(BASE_API_URL+api_end_point,{
    //     //보내고자 하는 데이터 
    //     title: '1234',
    //     image: 'data.image'
    //         }).then((response) => {
    //         return response.json();
    //     });
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('image', data.image);

    const config = {
        Headers:{
            'content-type': 'multipart/form-data',
        },
    };
    axios.post('http://localhost:8000/api/'+api_end_point, formdata, config)
}