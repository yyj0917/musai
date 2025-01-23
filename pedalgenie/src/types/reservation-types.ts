
// 대여 가능 날짜 목록 조회 api
export interface RentableDate {
    price: number;
    fee: number;
    totalPrice: number;
    avaiableDates: {
        productId: number;
        localDate: string; // "2025-01-22"
        rentStatus: string;
    }[];
}

// 대여 가능 시간 조회 api
export interface RentableTime {
    price: number;
    fee: number;
    totalPrice: number;
    availableTimeSlots: {
        time: string; // "10:00:00"
        status: string;
        availableDateTimedId: number;
    }
}