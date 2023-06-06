const UiFilterConfig = {
    all: {
        label: 'All',
        filterFunction: (user) => true
    },
    partnerA: {
        label: 'Công ty',
        filterFunction: (user) => user.partnerType === 'Công ty'
    },
    partnerB: {
        label: 'Khách lẻ',
        filterFunction: (user) => user.partnerType === 'Khách lẻ'
    },
    vehicleA: {
        label: 'Ô tô',
        filterFunction: (user) => user.vehicleType === 'oto'
    },
    vehicleB: {
        label: 'Xe máy',
        filterFunction: (user) => user.vehicleType === 'xe may'
    }
};

export default UiFilterConfig;