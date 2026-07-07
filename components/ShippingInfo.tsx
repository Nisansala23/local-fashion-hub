import { Truck, CornerDownLeft } from "lucide-react";

interface ShippingOption {
    icon: React.ReactNode;
    title: string;
    description: string;
    hasLink?: boolean;
}

const ShippingInfo = () => {
    const shippingOptions: ShippingOption[] = [
        {
            icon: <Truck size={24} className="text-shop-orange flex-shrink-0" />,
            title: "Free Delivery",
            description: "Enter your postal code for delivery availability.",
            hasLink: false,
        },
        {
            icon: (
                <CornerDownLeft
                    size={24}
                    className="text-shop-orange flex-shrink-0"
                />
            ),
            title: "Return Delivery",
            description: "Free 30-day returns on all orders.",
            hasLink: true,
        },
    ];

    return (
        <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 bg-white shadow-sm">
            {shippingOptions.map((option, index) => (
                <div key={index} className="p-5 flex items-start gap-4">
                    <div className="mt-1">{option.icon}</div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-1">
                            {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {option.description}
                            {option.hasLink && (
                                <>
                                    {" "}
                                    <button className="underline underline-offset-2 font-medium text-black hover:text-shop-orange transition cursor-pointer">
                                        Details
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShippingInfo;