export const toPriceFormat = (rawValue: string, mask = "*** *** *** ***") => {

  //var matches = test.match(/^[0-9]{1,6}(\\.\\d{1,2})?$/);

  if (!rawValue) {
    return "";
  }

  rawValue = rawValue.toString();

  let value = rawValue.split(".")[0].replace(/\D/g, "");//parseInt(rawValue).toString();
  //.match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";

  let newValue = "";
  let cursorValue = value.length - 1;

  for (let cursorMask = mask.length - 1; cursorMask >= 0; cursorMask--) {

    if (!value[cursorValue]) {
      break;
    }

    if (mask[cursorMask] != '*') {
      newValue += mask[cursorMask];
      if (mask[cursorMask] == value[cursorValue]) {
        cursorValue--;
      }

    } else {
      newValue += value[cursorValue];
      cursorValue--;
    }

  }

  let revertValue = "";
  for (let i = newValue.length - 1; i >= 0; i--) {
    revertValue += newValue[i];
  }

  return revertValue;
}

export const toFloat = (rawValue: string | number) => {
  let value = rawValue;

  if (typeof rawValue == "string") {
    value = rawValue.replace(/[^\d.,]/g, '');
    value = value.replace(',','.');
  }
  return value;
}

export const toInteger = (rawValue: string | number) => {
  if (typeof rawValue == "string") {
    return parseInt(rawValue);
  }

  return rawValue;
}