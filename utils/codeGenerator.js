export const codeGenerator = () => {
    let alphanumeric = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789"

    let code = new Array();

    for (let i = 0; i < 8; i++){
        let index = Math.floor(Math.random() * alphanumeric.length);
        code.push(alphanumeric.charAt(index))
    }

    code = code.join("");

    return code;
}