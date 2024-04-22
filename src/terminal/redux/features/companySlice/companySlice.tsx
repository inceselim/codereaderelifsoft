import { createAsyncThunk, applyMiddleware, createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'

export interface companyState {
    Company: string
    Id: number
    IsIettEnabled: boolean
}

const initialState: any = {
    company: [],
}

const companySlice = createSlice({
    name: 'companySlice',
    initialState,
    reducers: {
        companySelect: (state, { payload }: any) => {
            state.company = payload
            console.log("companySelect")
            console.log("payload", payload)
            console.log("companySelect")
            console.log("companySelect")
        },
    },
})

export const {
    companySelect,
} = companySlice.actions

export const selectedCompany = (state: any) => { console.log("SELECT COMPANY", state) }

export default companySlice.reducer