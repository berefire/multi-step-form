export const PLANS = Object.freeze([
    {id: 'arcade', name: 'Arcade', icon: 'icon-arcade.svg', price: { monthly: 9, yearly: 90 }},
    {id: 'advanced', name: 'Advanced', icon: 'icon-advanced.svg', price: { monthly: 12, yearly: 120 }},
    {id: 'pro', name: 'Pro', icon: 'icon-pro.svg', price: { monthly: 15, yearly: 150 }}
]);

export const ADD_ONS = Object.freeze([
    {id: 'online-service', name: 'Online Service', description: 'Access to multiplayer games', price: { monthly: 1, yearly: 10 }},
    {id: 'larger-storage', name: 'Larger Storage', description: 'Extra 1TB of cloud save', price: { monthly: 2, yearly: 20 }},
    {id: 'customizable-profile', name: 'Customizable Profile', description: 'Custom theme on your profile', price: { monthly: 2, yearly: 20 }}
]);