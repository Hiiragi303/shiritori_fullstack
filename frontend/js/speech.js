export class SpeechInput {
    constructor({ lang = 'ja-JP' } = {}) {
        const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Rec) throw new Error('このブラウザは音声認識には未対応です');

        this.rec = new Rec();
        this.rec.lang = lang;
        this.rec.continuous = false;  // 一発話で終了
        this.rec.interimResults = true;  // 途中経過も出す

        // 内部用のコールバック
        this._onInterim = () => { };
        this._onFinal = () => { };
        this._onState = () => { };

        this.rec.onstart = () => this._onState('listening');
        this.rec.onend = () => this._onState("idle");

        // イベントハンドラ
        this.rec.onresult = (e) => {
            const { resultIndex, results } = e; // オブジェクトの分割代入
            let interim = '';
            let final = '';
            for (let i = resultIndex; i < results.length; i++) {
                const res = results[i];  // かたまり
                const [best] = res; // 配列の分割代入
                const txt = best.transcript;
                if (res.isFinal) final += txt; // 確定分をfinalに
                else interim += txt; // 途中分をinterimに
            }
            if (interim) this._onInterim(interim);
            if (final) this._onFinal(final.trim());
        };
    }

    onInterim(fn) { this._onInterim = fn; return this; }
    onFinal(fn) { this._onFinal = fn; return this; }
    onState(fn) { this._onState = fn; return this; }

    start() { this.rec.start(); }
    stop() { this.rec.stop(); }
}