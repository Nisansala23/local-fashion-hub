import { defineType, defineField, defineArrayMember } from 'sanity';

export const orderType = defineType({
    name: 'order',
    title: 'Order Tracking',
    type: 'document',
    fields: [
        defineField({ name: 'orderNumber', title: 'Order Number', type: 'string' }),
        defineField({ name: 'invoiceId', title: 'Invoice ID', type: 'string' }),
        defineField({ name: 'invoiceUrl', title: 'Invoice Document URL', type: 'string' }),
        defineField({ name: 'stripeCheckoutSessionId', title: 'Stripe Checkout ID', type: 'string' }),
        defineField({ name: 'clerkUserId', title: 'Clerk User ID', type: 'string' }),
        defineField({ name: 'customerName', title: 'Customer Name', type: 'string' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        defineField({
            name: 'products',
            title: 'Purchased Products',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'productName', title: 'Product Title', type: 'string' },
                        { name: 'price', title: 'Price Unit', type: 'number' },
                        { name: 'quantity', title: 'Quantity Ordered', type: 'number' },
                    ],
                }),
            ],
        }),
        defineField({ name: 'totalPrice', title: 'Total Price Paid', type: 'number' }),
        defineField({ name: 'currency', title: 'Currency Code', type: 'string' }),
        defineField({
            name: 'status',
            title: 'Order Processing Status',
            type: 'string',
            options: {
                list: ['pending', 'processing', 'paid', 'shipped', 'delivered', 'cancelled']
            }
        }),
    ],
});