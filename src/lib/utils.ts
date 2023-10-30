
export function splitNumberByThree(number: number) {
    let result = "";
    const string = number.toString();

    for (let idx = string.length - 1, secondIdx = 0; idx >= 0; --idx, ++secondIdx) {
        if (secondIdx % 3 == 0 && idx != string.length - 1) {
            result = "," + result;
        }

        result = string[idx] + result;
    }

    return result;
}
