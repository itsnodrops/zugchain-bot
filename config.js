export default {
    STAKE: {
        RESERVE_BALANCE: 0.5, // Keep this amount, stake the rest
        AUTO_COMPOUND: true,
        TIER_ID: 0,
    },
    DELAYS: {
        BETWEEN_ACCOUNTS_MS: 15000,
        BETWEEN_TASKS_MS: 5000,
        BETWEEN_OPERATIONS_MS: 3000,
    },
    ENABLE_LOOP: false,
    LOOP_TIME: '24:00:00',
};
