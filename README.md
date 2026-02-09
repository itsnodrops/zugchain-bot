# Zugchain Bot

Automated bot for interacting with Zugchain Incentive Testnet Campaign with support for multi-account, proxy rotation, on-chain staking, and concurrent processing.

> **WARNING** \
> **Code Obfuscation Notice**: This script will be obfuscated to prevent unauthorized code redistribution. The full source code will be shared publicly after the event ends.

> **Auto-Register Feature**: This bot supports automatic account registration with referral codes. For access to this feature, check our Telegram channel: [@NoDrops](https://t.me/NoDrops)

## Features

- **Wallet Authentication** - Connect wallet and manage sessions automatically
- **ZUG Faucet** - Claim testnet ZUG (24-hour cooldown, requires X/Twitter connection)
- **Multi-Stake** - Randomly split stakes into 1-5 transactions with N.NN amounts
- **Task Completion** - Auto-complete social tasks and milestones for bonus points
- **Multi-Account** - Process multiple accounts concurrently
- **Pool-Based Concurrency** - Proxies immediately reassigned when idle for max efficiency
- **Proxy Support** - HTTP, HTTPS, SOCKS4, and SOCKS5 proxies with rotation
- **TUI Dashboard** - Real-time monitoring of all account activities with live points update
- **Smart Cooldown** - Tracks faucet cooldown per account, skips if already claimed today
- **Loop Mode** - Schedule automatic reruns at specified intervals
- **Points Tracking** - Persistent points tracking across restarts

## Requirements

- **[Zugchain Testnet](https://testnet.zugchain.org/?ref=ZUG-9MITH41J)** accounts
- **Node.js** v18 or higher
- **npm** (Node Package Manager)
- **Private Keys** - Ethereum wallet private keys
- **X (Twitter)** - Connected to Zugchain account (required for faucet)
- **Proxies** (Optional but recommended for multiple accounts)
- **[SCTG Solver API Key](https://t.me/Xevil_check_bot?start=1379619439)** (Optional, uses local solver as fallback)

## Quick Start

### 1. Clone or Download the Repository

```bash
git clone https://github.com/itsnodrops/zugchain-bot.git
cd zugchain-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Accounts

Create a `.env` file with your private keys:

```env
# Private Keys (without 0x prefix)
PK_1=your_private_key_here
PK_2=your_second_private_key_here
PK_3=your_third_private_key_here

# SCTG Captcha Solver API Keys (optional)
# SOLVER_API_KEY_1=your_sctg_api_key_here
# SOLVER_API_KEY_2=your_second_sctg_api_key_here
```

### 4. Add Proxies (Optional)

Edit `proxies.txt` to add your proxies (one per line):

```
http://user:pass@proxy1.com:8080
socks5://user:pass@proxy2.com:1080
socks4://proxy3.com:1080
```

**Supported formats:**
- HTTP: `http://user:pass@host:port` or `http://host:port`
- HTTPS: `https://user:pass@host:port` or `https://host:port`
- SOCKS5: `socks5://user:pass@host:port` or `socks5://host:port`
- SOCKS4: `socks4://user:pass@host:port` or `socks4://host:port`

### 5. Run the Bot

```bash
npm start
```

## How It Works

### Processing Flow

1. **Registration** - Syncs wallet with referral code
2. **Profile Fetch** - Gets current points and rank
3. **Social Check** - Verifies X/Twitter is connected
4. **ZUG Faucet** - Claims testnet ZUG (skips if in cooldown)
5. **Multi-Stake** - Stakes ZUG in 1-5 random transactions (keeps 0.5 ZUG reserve)
6. **Incentive Sync** - Syncs stake transactions for points
7. **Tasks** - Completes milestones and missions for bonus points
8. **Loop** - Waits until next scheduled run (if enabled)

### Pool-Based Concurrency

The bot uses a **proxy pool** for maximum efficiency:
- **10 proxies, 50 accounts** -> 10 accounts run concurrently
- When one account finishes, its proxy is **immediately** reassigned
- Solver keys are only acquired when actually claiming faucet

## Configuration

Edit `config.js` to customize bot behavior:

```javascript
export default {
    REF: 'ZUG-9MITH41J', // Referral code
    
    STAKE: {
        RESERVE_BALANCE: 0.5, // Keep this amount, stake the rest
        AUTO_COMPOUND: true,  // Auto-compound rewards
        TIER_ID: 0,           // Staking tier
    },
    
    // Delays (milliseconds)
    DELAYS: {
        BETWEEN_ACCOUNTS_MS: 15000,
        BETWEEN_TASKS_MS: 5000,
        BETWEEN_OPERATIONS_MS: 3000,
    },
    
    // Loop mode
    ENABLE_LOOP: false,
    LOOP_TIME: '24:00:00', // HH:MM:SS format
};
```

## Data Storage

| Path | Purpose |
|------|---------|
| `.env` | Private keys (PK_N) and solver keys (SOLVER_API_KEY_N) |
| `proxies.txt` | Proxy list |
| `logs/process.log` | Activity logs |
| `data/data.json` | Account data, points, social info, cooldowns (gitignored) |

## Tracked Data

The bot tracks the following per account in `data.json`:
- Wallet address and registration status
- Points, rank, and balance
- X/Twitter ID and username
- Telegram and Discord IDs
- Last faucet claim timestamp
- Last run timestamp

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No accounts loaded | Check `.env` for PK_1, PK_2, etc. |
| Proxy connection failed | Verify proxy format includes protocol (http://, socks5://, etc.) |
| Faucet: X not connected | Connect X/Twitter to your Zugchain account first |
| Faucet: Cooldown active | Wait until 00:00 UTC for daily reset |
| Insufficient balance for stake | Need at least 1.5 ZUG (1.0 min stake + 0.5 reserve) |
| All proxies blocked | Add more proxies or wait for cooldown |

## Utility Scripts

Manage bot data and logs easily with these npm scripts:

```bash
npm start              # Run the bot
npm run clear-log      # Clear log file
npm run clear-data     # Reset account data
npm run check-config   # Check configuration status
npm run check-data     # Show accounts summary table
npm run check-log      # Watch log file in real-time
```

## Notes

- **Faucet Cooldown**: Resets daily at 00:00 UTC
- **Minimum Stake**: 1 ZUG per transaction
- **Reserve Balance**: 0.5 ZUG kept after staking
- **Concurrency**: Based on proxy count (1 account at a time without proxies)
- **Solver Priority**: SCTG API (if configured) -> Local solver (fallback)
- **Data Persistence**: Account data stored locally, never shared or uploaded

## Contribution

Feel free to open pull requests, report bugs, or suggest features. Contributions are always welcome!

## Support the Project

If this project has been helpful to you, consider supporting its development with donations:

| Network | Address |
|---------|---------|
| **EVM** | `0xfD1847bFAA92fb8c0d100b207d377490C5acd34c` |
| **SOL** | `BBZjp11sJNvekXZEBhhYDro9gsyyhEKXXcfEEub5ubje` |
| **TON** | `UQDoLQNF-nt9CFOHBs9mQqxH9YJKrZ6mFPbAeHH8Jo9xIGCb` |
| **SUI** | `0x79672047f5e2fa0c4db3e4278f80b9ac504b2858c6d82d63f833fbdcc6805175` |
| **TRX** | `0x79672047f5e2fa0c4db3e4278f80b9ac504b2858c6d82d63f833fbdcc6805175` |


## Disclaimer

This tool is for educational and testing purposes only on the [Zugchain Testnet](https://testnet.zugchain.org/?ref=ZUG-9MITH41J). Use at your own risk. The authors are not responsible for any consequences resulting from the use of this software.

## License

This project is licensed under the [MIT License](https://github.com/itsnodrops/zugchain-bot/blob/main/LICENSE).
