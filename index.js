const CoinPayments = require("coinpayments");
const dotenv = require("dotenv");

dotenv.config();

const client = new CoinPayments({
  key: process.env.COINPAYMENTS_PUBLIC_KEY,
  secret: process.env.COINPAYMENTS_PRIVATE_KEY,
});

async function fetchBalance() {
  try {
    const balances = await client.balances({ all: 1 }); // The 'all: 1' option fetches both the available and on-hold balances
    console.log("LTCT Balance:", balances.LTCT);
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
}

async function createTransaction(currency1, currency2, amount, buyerEmail) {
  const options = {
    currency1, 
    currency2, 
    amount, 
    buyer_email: buyerEmail, 
  };

  try {
    const transaction = await client.createTransfer(options);
    console.log("Transaction created:", transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
}

async function makeWithdrawal(currency, amount, address) {
  const options = {
    currency,
    amount,
    address,
  };

  try {
    const withdrawal = await client.createWithdrawal(options);
    console.log("Withdrawal initiated:", withdrawal);
  } catch (error) {
    console.error("Error creating withdrawal:", error);
  }
}

async function listRates(baseCurrency = "USD") {
  try {
    const rates = await client.rates({ short: 1, accepted: 1 });
    console.log(`Rates against ${baseCurrency}:`, rates[baseCurrency]);
  } catch (error) {
    console.error("Error listing rates:", error);
  }
}

async function getWithdrawalInfo(withdrawalId) {
  try {
    const withdrawalInfo = await client.getWithdrawalInfo({ id: withdrawalId });
    console.log("Withdrawal info:", withdrawalInfo);
  } catch (error) {
    console.error("Error fetching withdrawal info:", error);
  }
}

//   fetchBalance();
// TODO: createTx not working as of now
//   createTransaction('LTCT', 'LTCT', '1', 'tomarpari90@gmail.com');
// makeWithdrawal('LTCT', '1', 'mzHA2kegoTYSLUwydbWULL9orukZdJqLhQ');
// listRates('USD');
// getWithdrawalInfo('CWID5QSE8VNQBWS2MDA4YNT5SN');
