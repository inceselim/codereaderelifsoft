import { createAsyncThunk, applyMiddleware, createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginState {
    isLogin: boolean
    isFetching: boolean
    userData: string | null | any
    userToken: string | any
    userName: string | null | any
    userId: string | null | any
    loading: boolean
    errorMsg: string
    tokenExpires: string
    isError: boolean
    remember: boolean
    loginCounter: number
    mobileMenu: string[]
    appMenuYeni: string[]
    companies: []
}

const initialState = {
    isLogin: false,
    isFetching: true,
    userToken: "",
    userName: "",
    userId: "",
    tokenExpires: "",
    isError: false,
    errorMsg: "",
    loginCounter: 0,
    mobileMenu: [],
    appMenuYeni: [],
    companies: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        notFetchingUser: (state) => {
            state.isFetching = false
        },
        isFetchingUser: (state) => {
            state.isFetching = true
        },
        loginUser: (state, { payload }: any) => {
            state.isLogin = true
            state.userToken = payload.token
            state.userName = payload.displayName
            state.tokenExpires = payload.tokenExpires
            state.mobileMenu = payload.mobileMenu
            state.appMenuYeni = payload.appMenuYeni
        },
        loginAppMenuYeni: (state, { payload }) => {
            state.appMenuYeni = payload
        },
        loginAppCompanies: (state, { payload }) => {
            state.companies = payload
        },
        rememberUser: (state, { payload }) => {
            state.isLogin = true
            state.userToken = payload.token
            state.tokenExpires = payload.tokenExpires
            state.userName = payload.tokenUserName
        },
        rememberUserId: (state, { payload }) => {
            state.userId = payload
        },
        logoutUser: (state) => {
            state.isLogin = false
            state.userToken = ""
            state.userName = ""
            state.tokenExpires = ""
            state.mobileMenu = []
        }
    },
})

export const {
    loginUser,
    loginAppMenuYeni,
    loginAppCompanies,
    notFetchingUser,
    isFetchingUser,
    rememberUser,
    rememberUserId,
    logoutUser, } = authSlice.actions

export const selectAuth = (state: any) => state.auth

export default authSlice.reducer