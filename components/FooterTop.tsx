"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";

interface ContactItem {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

export default function FooterTop() {
    const contactData: ContactItem[] = [
        {
            title: "Visit Us",
            subtitle: "123 Bazaar St, Colombo, Sri Lanka",
            icon: <MapPin className="w-5 h-5 text-shop-dark-green" />,
        },
        {
            title: "Call Us",
            subtitle: "+94 11 234 5678",
            icon: <Phone className="w-5 h-5 text-shop-dark-green" />,
        },
        {
            title: "Working Hours",
            subtitle: "Mon - Sat: 9:00 AM - 7:00 PM",
            icon: <Clock className="w-5 h-5 text-shop-dark-green" />,
        },
        {
            title: "Email Us",
            subtitle: "support@bazaar.lk",
            icon: <Mail className="w-5 h-5 text-shop-dark-green" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-gray-200/50 py-8 bg-white">
            {contactData.map((item, index) => (
                <div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-white border border-gray-100 transition-colors duration-200">
                        {item.icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-shop-dark-green transition-colors duration-200">
                            {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}