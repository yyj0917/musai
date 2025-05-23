// 대여 가능 날짜 목록 조회 api
export type availableDates = {
  productId: number;
  localDate: string; // "2025-01-22"
  rentStatus: string;
};
export interface RentableDate {
  rentPricePerDay: number;
  fee: number;
  totalPrice: number;
  availableDates: availableDates[];
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
  };
}

// 대여 예약 생성 api -> 토큰 넣어야됨
export interface RentReservationData {
  rentId: number;
  rentStatus: string;
  rentStartTime: string;
  rentEndTime: string;
  pickUpTime: string;
  productId: number;
  productName: string;
  rentPricePerDay: number;
  fee: number;
  totalPrice: number;
  availableDateTimeId: number;
}

// 시연 가능 날짜 목록 조회 api
export interface DemoableDate {
  date: string;
  available: true;
}

// 시연 가능 시간 조회 api
export interface DemoableTime {
  slotTime: string;
  available: true;
}
export type DemoableTimeList = DemoableTime[];

// 시연 예약 생성 api -> 토큰 넣어야됨
export interface DemoReservationData {
  demoId: number;
  demoStatus: string;
  demoDate: string; // 2025.01.20 PM 3:00
  productName: string;
  shopName: string;
  memberNickName: string;
}

export type DemoSuccess = {
  demoId: number;
  demoStatus: string; // 시연예정
  demoDate: string; // 2025.01.20 PM 3:00
  productName: string;
  shopName: string;
  memberNickName: string;
}