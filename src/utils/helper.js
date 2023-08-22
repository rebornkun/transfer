const symbols = [
  {
    name: "GBP",
    sym: "£",
  },
  {
    name: "EUR",
    sym: "€",
  },
  {
    name: "USD",
    sym: "$",
  },
  {
    name: "TRY",
    sym: "₺",
  },
  {
    name: "NOK",
    sym: "kr",
  },
  {
    name: "SEK",
    sym: "kr",
  },
  {
    name: "RON",
    sym: "lei",
  },
  {
    name: "PLN",
    sym: "zł",
  },
  {
    name: "HUF",
    sym: "Ft",
  },
  {
    name: "DKK",
    sym: "Kr",
  },
  {
    name: "CZK",
    sym: "Kč",
  },
];

export const convertToSymbol = (Cur) => {
  let sym = symbols.filter((data) => {
    return data.name === Cur;
  });
  if (sym.length >= 1) {
    return sym[0].sym;
  }
  return Cur;
};
