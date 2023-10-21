import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';


const BaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3030',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(token){
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
})

const BaseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await BaseQuery(args, api, extraOptions);
    if(result?.error?.originalStatus === 403 ){
        const refreshResult = await BaseQuery('/refresh', api, extraOptions);
        if(refreshResult?.data){
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({
                user,...refreshResult.data
            }))
            result = await BaseQuery(args, api, extraOptions);
        }else{
            api.dispatch(logOut())
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: BaseQueryWithReauth,
    endpoints: builder => ({})
})