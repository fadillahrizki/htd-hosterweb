import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const postLogin = async (body) => {
    return (await axios.post(API_URL+'/login', body, {
        headers:{
            'Content-Type':'multipart/form-data',
        }
    })).data.data
}

export const postRegister = async (body) => {
    return await axios.post(API_URL+'/register', body, {
        headers:{
            'Content-Type':'multipart/form-data',
        }
    })
}

export const getProfile = async () => {
    return (await axios.get(API_URL+'/profile/detail', {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const postProfile = async (body) => {
    return await axios.post(API_URL+'/profile', body, {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
            'Content-Type':'multipart/form-data',
        }
    })
}

export const getSlideShow = async () => await (await axios.get(API_URL+'/slide-show')).data.data

export const getBankSoal = async () => {
    return (await axios.get(API_URL+'/proprietaries/get', {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const getBankSoalDetail = async (id) => {
    return (await axios.get(API_URL+'/proprietaries/detail?id='+id, {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const postBankSoalAnswer = async (id, body) => {
    return await axios.get(API_URL+'/proprietaries/update?id='+id, body,{
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
            'Content-Type':'multipart/form-data',
        }
    })
}

export const getTransaction = async () => {
    return (await axios.get(API_URL+'/transactions/get', {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const getTransactionDetail = async (id) => {
    return (await axios.get(API_URL+'/transactions/detail?id='+id, {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const getCategory = async () => {
    return (await axios.get(API_URL+'/categories/get', {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const postBuyCategory = async (body) => {
    return await axios.get(API_URL+'/categories/buy', body, {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
            'Content-Type':'multipart/form-data',
        }
    })
}

export const getPicture = async (body) => {
    return (await axios.get(API_URL+'/pictures/get', body, {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
        }
    })).data.data
}

export const postPicture = async (body) => {
    return await axios.get(API_URL+'/pictures/upload', body, {
        headers:{
            'Authorization': 'Bearer '+await AsyncStorage.getItem('token'),
            'Content-Type':'multipart/form-data',
        }
    })
}