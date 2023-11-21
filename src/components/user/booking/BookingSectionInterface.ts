
export interface SeatData {
    seats: number[],
    count: number;
}

export interface StandSeats {
    vip: {
        A: SeatData;
        B: SeatData;
    };
    premium: {
        C: SeatData;
        D: SeatData;
    };
    economy: {
        E: SeatData;
        F: SeatData;
    };
}
export interface FixtureSeat {
    _id: string;
    seats: {
        north: StandSeats;
        south: StandSeats;
        east: StandSeats;
        west: {
            vip: {
                A: SeatData[];
                B: SeatData[];
            };
            premium: {
                C: StandSeats;
                D: StandSeats;
            };
        };
    };
}

export interface Seat {
    stand: string,
    price: {
        vip: number;
        premium: number;
        economy: number;
    };
}

export interface CartData {
    north: { vip: number, economy: number, premium: number; },
    south: { vip: number, economy: number, premium: number; },
    east: { vip: number, economy: number, premium: number; },
    west: { vip: number, economy: number, premium: number; };
}
export interface BookingSectionI {
    data: { fixture: FixtureSeat; seats: Seat[]; cartData: CartData; };
    refetchFn: () => void;
}