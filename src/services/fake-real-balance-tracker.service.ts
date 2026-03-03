/**
 * Fake Real Balance Tracker Service
 * Tracks balance changes from demo trading and displays them on the Real USD account
 */

class FakeRealBalanceTrackerService {
    private readonly STORAGE_KEY = 'fake_real_balance';
    private readonly INITIAL_BALANCE = 2000;
    private readonly DEMO_BALANCE_KEY = 'demo_balance_snapshot';

    /**
     * Check if fake real mode is active
     */
    public isFakeRealModeActive(): boolean {
        return localStorage.getItem('demo_icon_us_flag') === 'true';
    }

    /**
     * Initialize fake real balance (set to $2000)
     */
    public initializeBalance(): void {
        if (!this.isFakeRealModeActive()) return;

        const existingBalance = localStorage.getItem(this.STORAGE_KEY);
        if (!existingBalance) {
            localStorage.setItem(this.STORAGE_KEY, this.INITIAL_BALANCE.toString());
            console.log(`💰 Fake Real Balance initialized: $${this.INITIAL_BALANCE}`);
        }
    }

    /**
     * Get current fake real balance
     */
    public getBalance(): number {
        if (!this.isFakeRealModeActive()) return 0;

        const balance = localStorage.getItem(this.STORAGE_KEY);
        return balance ? parseFloat(balance) : this.INITIAL_BALANCE;
    }

    /**
     * Get formatted balance for display
     */
    public getFormattedBalance(): string {
        const balance = this.getBalance();
        return balance.toFixed(2);
    }

    /**
     * Take snapshot of demo balance before trade
     */
    public snapshotDemoBalance(demoBalance: number): void {
        if (!this.isFakeRealModeActive()) return;

        localStorage.setItem(this.DEMO_BALANCE_KEY, demoBalance.toString());
        console.log(`📸 Demo balance snapshot: $${demoBalance}`);
    }

    /**
     * Update fake real balance based on demo balance change
     */
    public updateBalanceFromDemo(newDemoBalance: number): void {
        if (!this.isFakeRealModeActive()) return;

        const snapshotBalance = localStorage.getItem(this.DEMO_BALANCE_KEY);
        if (!snapshotBalance) {
            console.warn('⚠️ No demo balance snapshot found');
            return;
        }

        const oldDemoBalance = parseFloat(snapshotBalance);
        const demoChange = newDemoBalance - oldDemoBalance;

        // Update fake real balance
        const currentFakeBalance = this.getBalance();
        const newFakeBalance = currentFakeBalance + demoChange;

        localStorage.setItem(this.STORAGE_KEY, newFakeBalance.toString());
        localStorage.setItem(this.DEMO_BALANCE_KEY, newDemoBalance.toString());

        console.log(`💸 Balance updated: $${currentFakeBalance.toFixed(2)} → $${newFakeBalance.toFixed(2)} (${demoChange >= 0 ? '+' : ''}${demoChange.toFixed(2)})`);
    }

    /**
     * Reset fake real balance to initial amount
     */
    public resetBalance(): void {
        localStorage.setItem(this.STORAGE_KEY, this.INITIAL_BALANCE.toString());
        localStorage.removeItem(this.DEMO_BALANCE_KEY);
        console.log(`🔄 Fake Real Balance reset to $${this.INITIAL_BALANCE}`);
    }

    /**
     * Clear all fake real balance data
     */
    public clearBalance(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.DEMO_BALANCE_KEY);
        console.log('🗑️ Fake Real Balance data cleared');
    }

    /**
     * Add funds manually (for testing or adjustments)
     */
    public addFunds(amount: number): void {
        if (!this.isFakeRealModeActive()) return;

        const currentBalance = this.getBalance();
        const newBalance = currentBalance + amount;
        localStorage.setItem(this.STORAGE_KEY, newBalance.toString());

        console.log(`💵 Funds added: $${amount.toFixed(2)} | New balance: $${newBalance.toFixed(2)}`);
    }

    /**
     * Subtract funds manually
     */
    public subtractFunds(amount: number): void {
        if (!this.isFakeRealModeActive()) return;

        const currentBalance = this.getBalance();
        const newBalance = Math.max(0, currentBalance - amount);
        localStorage.setItem(this.STORAGE_KEY, newBalance.toString());

        console.log(`💸 Funds subtracted: $${amount.toFixed(2)} | New balance: $${newBalance.toFixed(2)}`);
    }
}

// Export singleton instance
export const fakeRealBalanceTracker = new FakeRealBalanceTrackerService();
