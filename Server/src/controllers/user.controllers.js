import asyncHandler from "../utils/asynchandler.js";
import { auth } from "../auth.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                name,
                phone,
                email,
                password
            },
            asResponse: true
        });

        if (!response) {
            return ApiError({
                statusCode: 500,
                message: "something went wrong"
            })
        }
        return new ApiResponse({
            statusCode: 200,
            message: "success",
        })
    } catch (error) {
        return ApiError({
            statusCode: 500,
            message: error.message
        })
    }
})

export const login = asyncHandler(async (req, res) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            },
            asResponse: true
        });

        if (!response) {
            return ApiError({
                statusCode: 500,
                message: "something went wrong"
            })
        }
        return new ApiResponse({
            statusCode: 200,
            message: "success",
        })
    } catch (error) {
        return ApiError({
            statusCode: 500,
            message: error.message
        })
    }
})



export const logout = asyncHandler(async (req, res) => {
    try {
        const response = await auth.api.signOut();

        if (!response) {
            return ApiError({
                statusCode: 500,
                message: "something went wrong"
            })
        }
        return new ApiResponse({
            statusCode: 200,
            message: "success",
        })
    } catch (error) {
        return ApiError({
            statusCode: 500,
            message: error.message
        })
    }
})

