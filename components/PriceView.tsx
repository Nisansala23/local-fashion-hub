import PriceFormatter from "./PriceFormatter";

interface Props {
    price: number;
    discount?: number;
    originalPrice?: number;
    className?: string;
}

export default function PriceView({ price, discount, originalPrice, className }: Props) {
    // Calculate original price if discount is provided
    const calculatedOriginalPrice = discount && discount > 0
        ? price + (price * discount) / 100
        : originalPrice;

    // Calculate discount percentage
    const discountPercentage = discount
        ? Math.round(discount)
        : calculatedOriginalPrice
            ? Math.round(((calculatedOriginalPrice - price) / calculatedOriginalPrice) * 100)
            : null;

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Main Price */}
            <PriceFormatter
                amount={price}
                className={`${className || 'text-shopDarkGreen font-semibold'}`}
            />

            {/* Original Price (struck through) */}
            {calculatedOriginalPrice && (
                <PriceFormatter
                    amount={calculatedOriginalPrice}
                    className="line-through text-sm text-gray-400 font-normal"
                />
            )}

            {/* Discount Badge */}
            {discountPercentage && (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                    <span>Save {discountPercentage}%</span>
                </span>
            )}
        </div>
    );
}