/**
 * Shared react-slick options for reliable touch swipe and clearer mobile chrome.
 * Breakpoint: arrows show at widths ≤768px only (see responsive).
 */
const touchDefaults = {
    swipe: true,
    touchMove: true,
    touchThreshold: 8,
    accessibility: true,
};

/** Standard single-slide carousel: dots + swipe; arrows on small screens only. */
export function getStandardSliderSettings(overrides = {}) {
    return {
        dots: true,
        infinite: true,
        speed: 450,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        ...touchDefaults,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true,
                },
            },
        ],
        ...overrides,
    };
}

/** Home “Core Focus” slider: fade + autoplay; same touch + mobile arrows. */
export function getHomeProgramsSliderSettings() {
    return getStandardSliderSettings({
        autoplay: true,
        autoplaySpeed: 5500,
        fade: true,
        pauseOnHover: true,
    });
}
