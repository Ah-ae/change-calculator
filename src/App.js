import { useState, useEffect } from "react";

const bills = [100, 500, 1000, 5000, 10000, 50000];

function generateRandomPrice(minPrice, maxPrice) {
  const randomPrice =
    Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  const adjustedPrice = Math.round(randomPrice / 100) * 100;
  return adjustedPrice;
}

function getPossiblePayments(price) {
  const possiblePayments = [];
  const priceStr = price.toString();

  const hundredsDigit = priceStr.charAt(priceStr.length - 3); // 100의 자리
  const thousandsDigit = priceStr.charAt(priceStr.length - 4); // 1,000의 자리
  const tenThousandsDigit = priceStr.charAt(priceStr.length - 5); // 10,000의 자리
  const hundredThousandsDigit = priceStr.charAt(priceStr.length - 6); // 10,000의 자리

  console.log("current price: ", price);
  console.log(
    hundredThousandsDigit,
    tenThousandsDigit,
    thousandsDigit,
    hundredsDigit
  );

  if (hundredsDigit) {
    if (hundredsDigit > 0 && hundredsDigit < 5) {
      console.log(
        "100의 자리-1",
        priceStr.slice(0, priceStr.length - 3) + "500"
      );
      possiblePayments.push(
        Number(priceStr.slice(0, priceStr.length - 3) + "500")
      );
    } else if (hundredsDigit >= 5 && hundredsDigit <= 9) {
      console.log(
        "100의 자리-2",
        priceStr.slice(0, priceStr.length - 4) +
          (Number(thousandsDigit) + 1) +
          "000"
      );

      // 올림 처리
      if (Number(thousandsDigit) + 1 === 10) {
        possiblePayments.push(
          Number(Number(priceStr.slice(0, priceStr.length - 4)) + 1) + "0000"
        );
      } else {
        possiblePayments.push(
          Number(
            priceStr.slice(0, priceStr.length - 4) +
              (Number(thousandsDigit) + 1) +
              "000"
          )
        );
      }
    }
  }

  if (thousandsDigit) {
    if (thousandsDigit > 0 && thousandsDigit < 5) {
      console.log(
        "1000의 자리-1",
        Number(
          priceStr.slice(0, priceStr.length - 4) +
            (Number(thousandsDigit) + 1) +
            "000"
        ),
        Number(priceStr.slice(0, priceStr.length - 4) + "5000")
      );
      possiblePayments.push(
        Number(
          priceStr.slice(0, priceStr.length - 4) +
            (Number(thousandsDigit) + 1) +
            "000"
        )
      );
      possiblePayments.push(
        Number(priceStr.slice(0, priceStr.length - 4) + "5000")
      );
    } else if (thousandsDigit >= 5 && thousandsDigit <= 9) {
      console.log(
        "1000의 자리-2",

        Number(
          priceStr.slice(0, priceStr.length - 5) +
            (Number(tenThousandsDigit) + 1) +
            "0000"
        )
      );

      if (Number(tenThousandsDigit) + 1 === 10) {
        possiblePayments.push(
          Number(Number(priceStr.slice(0, priceStr.length - 5)) + 1) + "00000"
        );
      } else {
        if (!tenThousandsDigit) {
          possiblePayments.push(100000);
        } else {
          possiblePayments.push(
            Number(
              priceStr.slice(0, priceStr.length - 5) +
                (Number(tenThousandsDigit) + 1) +
                "0000"
            )
          );
        }
      }
    }
  }

  if (tenThousandsDigit) {
    if (tenThousandsDigit > 0 && tenThousandsDigit < 5) {
      console.log(
        "10,000의 자리-1",
        // Number(
        //   priceStr.slice(0, priceStr.length - 4) +
        //     (Number(tenThousandsDigit) + 1) +
        //     "000"
        // ),
        Number(priceStr.slice(0, priceStr.length - 5) + "50000")
      );
      // possiblePayments.push(
      //   Number(
      //     priceStr.slice(0, priceStr.length - 4) +
      //       (Number(tenThousandsDigit) + 1) +
      //       "000"
      //   )
      // );
      possiblePayments.push(
        Number(priceStr.slice(0, priceStr.length - 5) + "50000")
      );
    } else if (tenThousandsDigit >= 5 && tenThousandsDigit <= 9) {
      console.log("10,000의 자리-2");

      if (hundredThousandsDigit === 1) {
        possiblePayments.push(200000);
      }
    }
  }

  if (hundredThousandsDigit == 1) {
    console.log("100,000자리-1", 200000);
    possiblePayments.push(200000);
  } else if (hundredThousandsDigit == 2) {
    console.log("100,000자리-2", 250000);
    possiblePayments.push(250000);
  }

  console.log("10만자리", hundredThousandsDigit);

  if (!hundredThousandsDigit) {
    if (tenThousandsDigit < 5) possiblePayments.push(50000);
    else possiblePayments.push(100000);
  }

  console.log(possiblePayments);

  const randomIndex = Math.floor(Math.random() * possiblePayments.length);
  return possiblePayments[randomIndex];
}

function App() {
  const minPrice = 1000;
  const maxPrice = 250000;

  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    const randomPrice = generateRandomPrice(minPrice, maxPrice);
    const randomPayment = getPossiblePayments(randomPrice);
    setPrice(randomPrice);
    setPayment(randomPayment);
  }, []);

  const [showChange, setShowChange] = useState(false);
  const onClick = () => {
    setShowChange(true);
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      {price > 0 && (
        <>
          <button onClick={refresh}>새로고침</button>
          <p>
            상품 가격: <strong>{price.toLocaleString()}</strong>원
          </p>
          <p>
            지불한 금액: <strong>{payment.toLocaleString()}</strong>원
          </p>
          <br />
          <p>
            거스름돈은 ? <button onClick={onClick}>정답 보기</button>
          </p>
        </>
      )}

      {showChange && <p>{(payment - price).toLocaleString()}원</p>}
    </>
  );
}

export default App;
