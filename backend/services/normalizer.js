const kuromoji = require("kuromoji");

let tokenizer;

function initTokenizer() {
    return new Promise((resolve, reject) => {
        kuromoji.builder({ dicPath: "node_modules/kuromoji/dict" }).build((err, built) => {
            if (err) throw err;
            tokenizer = built;
            console.log("kuromoji tokenizer ready");
            resolve();
        });
    });
}

function normalizeWord(word) {
    if (!tokenizer) return word;
    const tokens = tokenizer.tokenize(word);
    return tokens.map(t => t.reading || t.surface_form).join("");
}

module.exports = { initTokenizer, normalizeWord };