package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.payload.request.WalletCreationRequest;

public interface IWallet {
    boolean createWallet(WalletCreationRequest request);
}
