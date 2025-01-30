import {
  RentableDate,
  RentableTime,
  DemoableDateList,
  DemoableTimeList,
  RentReservationData,
  DemoReservationData,
  DemoableDate,
  DemoSuccess,
} from '@/types/reservation-type';
import axiosInstance from '../config/axiosConfig';

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

// 대여 생성 api => header에 토큰
export async function CreateRentReservation(
  productId: number,
  availableDateTimeId: number,
  rentEndDateTime: string, // "2025-02-14T11:30:00"
): Promise<void> {
  try {
    await axiosInstance.post('/rents', { productId, availableDateTimeId, rentEndDateTime });
  } catch (error) {
    console.log('CreateRentReservation 에러', error);
    throw new Error('Unable to fetch rentable times. Please try again later.');
  }
}

// 시연 가능 날짜 목록 조회 api
export async function fetchDemoableDate(productId: number): Promise<DemoableDate[]> {
  try {
    const response = await axiosInstance.get(`/api/demos/dates/${productId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error('Unable to fetch rentable dates. Please try again later.');
  }
}

// 시연 가능 시간 조회 api
export async function fetchDemoableTime(productId: number, date: string): Promise<DemoableTimeList> {
  try {
    const response = await axiosInstance.get(`/api/demos/times/${productId}?date=${date}`);
    return response.data.data;
  } catch (error) {
    console.log(error);

    throw new Error('Unable to fetch rentable times. Please try again later.');
  }
}

// 시연 생성 api => header에 토큰
export async function CreateDemoReservation(demoDate: string, productId: number): Promise<void> {
  try {
    await axiosInstance.post('/demos', {demoDate, productId});
  } catch (error) {
    console.log('CreateDemoReservation 에러', error);
    throw new Error('Unable to fetch rentable times. Please try again later.');
  }
}
