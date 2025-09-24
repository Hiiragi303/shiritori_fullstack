# shiritori_fullstack

## 今日のつまずきポイント＆気づき(8/27)
### CORSエラー(Failed to fetch / 405)
- **問題**: フロント(5500)とバック(3000)のオリジン違いでCORSエラー
- **解決策**: npmでcorsがあるからそれで許可してあげる
- **tips**: Express v5ではワイルドカードが厳しいらしく**path-to-regexp**に引っかかるから正規表現で書いた方がいい。<br>ただ、全部許可より列挙してOriginを絞るのが良さげ

## 今日のつまずきポイント&気づき(9/15)
### SpeechInputクラスについて
#### rec周り
- **rec.continuous**って？
    - false
    一回喋ったら認識が終わる
    - true
    ずっとマイクを聞き続けて、何度も結果を出してくれる
- **rec.interimResults**って？
    - false
    確定した結果だけ出る(遅い)
    - true
    認識途中でも今こう聞こえてると途中経過を出してくれる
#### イベントハンドラ
- **rec.onresult**
認識結果が出たときに呼ばれる関数
eの中に結果が入る
e.resultsが配列になっていて、その中に音声認識の候補が詰まっている
ループして文字列を取り出す
#### 用意した関数
- **_onResult**と**onResult**
    - _onResult
    クラスの中で用意されている変数
    初期は何もしない
    - onResult
    外から関数を渡して_onResultを上書きするためのメソッド

## 今日の気付きなど(9/24)
### express.Router()って？
小さなサブアプリを作る仕組み
普通のappは全部appに積み上げるやり方
express.Router()を使うと専用のルーターを作って最後にapp.use()で組み込める

### module.exportsについて
Node.jsのデフォルトはCommonJS方式でmodule.exportsを使う
普通のJSはES Module方式だからexport/import