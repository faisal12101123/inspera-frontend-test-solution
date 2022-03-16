const timeService = {
    async requestUpdatedTime() {
        const response = await fetch('/api/get-remaining-time');
        const { timeRemaining } = await response.json();
        return timeRemaining;
    },
};

export default timeService;
