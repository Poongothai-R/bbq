export default function validatePrice(number,list) {
  const parseNumber = Number(number.trim());
  let data = "";
  let error = "";

  if (parseNumber > 0) {
    data = parseNumber;
  } else {
    data = "";
    error = "The price must cost more than 0";
  }

  return { data: data, error: error };
}
