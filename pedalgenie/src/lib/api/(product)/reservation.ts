import { RentableDate, RentableTime } from "@/types/reservation-types";
import axiosInstance from "../config/axiosConfig";

// 대여 가능 날짜 목록 조회 api
export async function fetchRentableDate(productId: number): Promise<RentableDate> {
    try {
    const response = await axiosInstance.get(`/api/dates/${productId}`);
    return response.data.data;
    } catch (error) {
        console.log(error);

        throw new Error('Unable to fetch rentable dates. Please try again later.');
    }
}

// 대여 가능 시간 조회 api
// Key = targetDate, value = yyyy-mm-dd
export async function fetchRentableTime(productId: number, targetDate: string): Promise<RentableTime> {
    try {
    const response = await axiosInstance.get(`/api/times/${productId}?targetDate=${targetDate}`);
    return response.data.data;
    } catch (error) {
        console.log(error);

        throw new Error('Unable to fetch rentable times. Please try again later.');
    }
}