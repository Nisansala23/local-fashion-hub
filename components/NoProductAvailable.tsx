import { motion } from "motion/react";

export default function NoProductAvailable({ selectedTab }: { selectedTab: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 min-h-[320px] bg-gray-100 w-full rounded-lg gap-4 mt-10">
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold text-gray-700"
            >
                No Products Available
            </motion.h3>
            <p className="text-sm text-gray-500 text-center max-w-md px-4">
                We're sorry, but there are no products matching the <span className="font-semibold text-shopDarkGreen">"{selectedTab}"</span> criteria at the moment. We are restocking shortly!
            </p>
        </div>
    );
}