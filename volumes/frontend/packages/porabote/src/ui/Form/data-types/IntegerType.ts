const IntegerType = (rawValue) => {

  let value = rawValue;

  if (typeof rawValue == "string") {
    value = rawValue.replace(/\D/g, '');
  }
  return value;
}

export default IntegerType;
