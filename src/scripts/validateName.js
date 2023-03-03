export default function validateName(string, list) {
  const parsedString = string.trim();
  let data = "";
  let error = "";

  if (parsedString.length > 0) {
    const found = list.find(recs => recs.name.toUpperCase() === parsedString.toUpperCase());
    if (found) {
      data = "";
      error = "Duplicate Product name";
    }
    else {
      data = parsedString;
      error = "";
    }
  } else {
    data = "";
    error = "The product name must not be empty";
  }

  return { data: data, error: error };
}
