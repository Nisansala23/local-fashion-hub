import { defineType, defineField } from 'sanity';

export const addressType = defineType({
    name: 'address',
    title: 'Address',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Full Name', type: 'string' }),
        defineField({ name: 'email', title: 'User Email', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State / Province', type: 'string' }),
        defineField({ name: 'zipCode', title: 'Zip Code', type: 'string' }),
        defineField({ name: 'isDefault', title: 'Default Address', type: 'boolean', initialValue: false }),
    ],
});