export const Status = {
    PENDING: "pending",
    CANCELLED: "cancelled",
    PAID: "paid",
} as const;

export type Status = (typeof Status)[keyof typeof Status] & string;