interface Props {
    amount: number;
    className?: string;
}

export default function PriceFormatter({ amount, className }: Props) {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(amount);

    return <span className={className}>{formattedPrice}</span>;
}