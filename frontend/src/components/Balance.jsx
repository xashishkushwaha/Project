import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + token, // Corrected token usage
              "Content-Type": "application/json", // Set the content type
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [token]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/app/v1/user/name",
          {
            headers: {
              Authorization: "Bearer " + token, // Corrected token usage
              "Content-Type": "application/json", // Set the content type
            },
          }
        );
        setfirstName(response.data.firstName);
        setlastName(response.data.lastName);
        console.log(lastName);

    } catch (error) {
        console.error("Error fetching Name:", error);
      }
    };

    fetchName();
  }, [token]);

  const formatToIndianSystem = (num) => {
    const [integerPart, decimalPart] = num.toString().split('.');

    const lastThreeDigits = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);

    const formattedIntegerPart = otherDigits 
        ? `${otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${lastThreeDigits}` 
        : lastThreeDigits;

    const formattedDecimalPart = decimalPart ? `.${decimalPart.slice(0, 2)}` : '';

    return formattedIntegerPart + formattedDecimalPart;
};
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    <div className="flex items-center space-x-4 mb-4">
        <div className="flex flex-col items-center justify-center bg-green-500 text-white w-16 h-16 rounded-full">
            <span className="text-2xl font-bold">{firstName[0]}{lastName[0]}</span>
        </div>
        <div className="text-center">
            <div className="text-2xl font-semibold text-gray-800">
                {firstName} {lastName}
            </div>
            <div className="text-sm text-gray-500">Account Holder</div>
        </div>
    </div>
    <div className="w-full border-t border-gray-200 my-4"></div>
    <div className="flex justify-between items-center w-full">
        <div className="text-xl font-bold text-gray-700">Your Balance:</div>
        <div className="text-2xl font-bold text-green-600">
            Rs {formatToIndianSystem(balance)}
        </div>
    </div>
</div>

  );
};
