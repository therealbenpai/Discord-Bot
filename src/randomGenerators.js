function randomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const modifiers = [
            Math.floor(Math.random() * 2), // Letter = 0, Number = 1
            Math.floor(Math.random() * 2) // Lowercase = 0, Uppercase = 1
        ]
        if (modifiers[0] === 0) {
            const val = String.fromCharCode(Math.floor(Math.random() * 26) + (modifiers[1] === 0 ? 97 : 65));
            result += val;
        } else {
            const val = Math.floor(Math.random() * 10);
            result += val;
        }
    }
    return result;
}

module.exports = {
    randomString
}