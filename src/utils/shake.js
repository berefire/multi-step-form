const SHAKE_KEYFRAMES = [
    { transform: "translateX(0)" },
    { transform: "translateX(-0.375rem)" },
    { transform: "translateX(0.375rem)" },
    { transform: "translateX(-0.25rem)" },
    { transform: "translateX(0.25rem)" },
    { transform: "translateX(0)" }
];

export function shake(element) {

    if (!element?.animate) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.animate(SHAKE_KEYFRAMES, {
        duration: 400,
        easing: "ease-in-out"
    });
}