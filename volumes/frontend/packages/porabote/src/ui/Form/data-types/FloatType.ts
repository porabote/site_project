const FloatType = (rawValue) => {

  let value = rawValue;

  if (typeof rawValue == "string") {
    value = rawValue.replace(/[^\d.,]/g, '');
    value = value.replace(',','.');
  }
  return value;
}

export default FloatType;
