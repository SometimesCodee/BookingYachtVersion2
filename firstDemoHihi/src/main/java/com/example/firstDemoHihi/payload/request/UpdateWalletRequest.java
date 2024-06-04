package com.example.firstDemoHihi.payload.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class UpdateWalletRequest {

    private long balance;

    public long getBalance() {
        return balance;
    }


    public void setBalance(long balance) {
        this.balance = balance;
    }
}
