import { PLANS, ADD_ONS } from '@/data/plans';

export function formatPrice(amount, billing, {sign = false } = {}) {
    const suffix = billing === 'monthly' ? 'mo' : 'yr';
    return `${sign ? '+' : ''}${amount}/${suffix}`;
}

export function calculateTotal({ plan, billing, addOns: selected }) {
    const planPrice = PLANS.find( p => p.id === plan).price[billing];
    const addOnsPrice = ADD_ONS.filter( a => selected.includes(a.id))
        .reduce((sum, a) => sum + a.price[billing], 0);
    return planPrice + addOnsPrice;
}