import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
function Converter() {
  const defaultFirstSelelctValue = "Bitcoin";
  const defaultSecondSelelctValue = "Ether";

  const [crytoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelelctValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondSelelctValue);
  const [result, setResult] = useState("0");

  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
  const names = [
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const JsonData = await response.json();

    const data = JsonData.rates;

    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        lable: item[1].name,
        rate: item[1].value,
      };
    });
    setCryptoList(tempArray);
  }
  useEffect(() => {
    if (crytoList.length == 0) return;

    const firstRate = crytoList.find((item) => {
      return item.value === firstSelect;
    }).rate;

    const secondRate = crytoList.find((item) => {
      return item.value === secondSelect;
    }).rate;

    const resultValue = (inputValue * secondRate) / firstRate;
    setResult(resultValue.toFixed(4));
  }, [inputValue, firstSelect, secondSelect]);
  return (
    <div className="container">
      <Card className="crypto-card" title={<h1>Crypto Converter</h1>}>
        <Form size="large">
          <Form.Item>
            <Input onChange={(event) => setInputValue(event.target.value)} />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            style={{ width: "120px" }}
            defaultValue={defaultFirstSelelctValue}
            options={crytoList}
            onChange={(value) => setFirstSelect(value)}
          />
          <Select
            style={{ width: "120px" }}
            defaultValue={defaultSecondSelelctValue}
            options={crytoList}
            onChange={(value) => setSecondSelect(value)}
          />
        </div>
        <p>
          {inputValue} {firstSelect} is equal to {result} {secondSelect}
        </p>
      </Card>
    </div>
  );
}

export default Converter;
