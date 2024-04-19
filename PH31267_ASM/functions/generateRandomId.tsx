const generateRandomId = (characters: string): string => {
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (let i = 0; i < 5; i++) {
        result += Math.floor(Math.random() * 10)
    }
    return result;
};

export default generateRandomId;
