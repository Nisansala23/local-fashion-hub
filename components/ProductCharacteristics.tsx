"use client";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku?: string;
    categoryTitle?: string;
    [key: string]: any;
}

interface ProductCharacteristicsProps {
    product: Product;
}

const ProductCharacteristics = ({ product }: ProductCharacteristicsProps) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-light">Collection</span>
                <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Seasonal Capsule
                </span>
            </div>

            <div className="flex justify-between pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-light">Stock Status</span>
                <span className="text-sm font-semibold text-gray-900">
                    {product?.stock ?? 0} items available
                </span>
            </div>

            {product?.sku && (
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-light">SKU</span>
                    <span className="text-sm font-semibold text-gray-900 font-mono">
                        {product.sku}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProductCharacteristics;