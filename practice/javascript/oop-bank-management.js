/**
 * Object-Oriented Programming (OOP) in JavaScript
 *
 * Demonstrates ES6 classes, constructors, encapsulation patterns,
 * inheritance (extends / super), and runtime polymorphism via method overriding.
 */

class BankAccount {
  constructor(accountLabel, initialBalance = 0) {
    this.accountLabel = accountLabel;
    this.balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) {
      return "Deposit amount must be greater than zero.";
    }
    this.balance += amount;
    return `Deposited $${amount}. Updated balance: $${this.balance}`;
  }

  withdraw(amount) {
    if (amount <= 0) {
      return "Withdrawal amount must be greater than zero.";
    }
    if (amount > this.balance) {
      return "Insufficient balance.";
    }
    this.balance -= amount;
    return `Withdrew $${amount}. Remaining balance: $${this.balance}`;
  }

  getBalance() {
    return this.balance;
  }

  getAccountType() {
    return "Standard Checking Account";
  }
}

class SavingsBankAccount extends BankAccount {
  constructor(accountLabel, initialBalance, interestRate) {
    super(accountLabel, initialBalance);
    this.interestRate = interestRate;
  }

  // Method overriding to achieve runtime polymorphism in JavaScript
  getAccountType() {
    return `Savings Account (${this.interestRate}% APR)`;
  }
}

// Example usage with standard account labels
const checkingAccount = new BankAccount("Primary Checking #1001", 12500);
const savingsAccount = new SavingsBankAccount("Reserve Savings #2001", 18000, 6.5);

checkingAccount.deposit(2500);
console.log(`${checkingAccount.accountLabel} — ${checkingAccount.getAccountType()} — Balance: $${checkingAccount.getBalance()}`);
console.log(`${savingsAccount.accountLabel} — ${savingsAccount.getAccountType()} — Balance: $${savingsAccount.getBalance()}`);
