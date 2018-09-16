const Wallet = require('./index');
const TransActionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');

describe('Wallet', () => {
    let wallet;
    let tp;
    let bc;

    beforeEach(() => {
        wallet = new Wallet();
        tp = new TransActionPool();
        bc = new Blockchain();
    });

    describe('creating a transaction', () => {
        let transaction;
        let sendAmount;
        let recipient;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'r4nd0m-4ddr355';
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, tp);
            });

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount * 2);
            });

            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                    .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });
    });
});