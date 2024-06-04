package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.payload.request.UpdateWalletRequest;
import com.example.firstDemoHihi.payload.request.WalletCreationRequest;

public interface IWallet {
    boolean createWallet(WalletCreationRequest request);

    long increaseBalance(UpdateWalletRequest request, String id);
    long decreaseBalance(UpdateWalletRequest request, String id);
}
