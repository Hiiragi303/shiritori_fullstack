import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8 font-sans max-w-xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">しりとり</h1>

      {/* セッション */}
      <section>
        <h2 className="text-xl font-semibold">セッション</h2>
        <button
          id="new-session"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          新規セッション作成
        </button>
        <div>
          sessionId: {" "}
          <span id="sid" className="text-gray-500">
            (未生成)
          </span>
        </div>
      </section>

      {/* ターン */}
      <section>
        <h2 className="text-xl font-semibold">ターン</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="word"
            placeholder="ことば"
            className="border rounded px-2 py-1 flex-1"
          />
          <button
            id="send"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            送信
          </button>
        </div>
        <span id="turn-caution" className="text-red-500"></span>
      </section>

      {/* 音声入力 */}
      <section>
        <h2 className="text-xl font-semibold">音声入力</h2>
        <div className="flex gap-2">
          <button
            id="start-speech"
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            開始
          </button>
          <button
            id="stop-speech"
            disabled
            className="px-3 py-1 bg-gray-400 text-white rounded"
          >
            停止
          </button>
        </div>
        <div className="text-gray-600">
          状態: <span id="speech-status">idle</span>
        </div>
        <div>
          途中: {" "}
          <span id="speech-interim" className="text-gray-500"></span>
        </div>
        <div>確定: <span id="speech-final"></span></div>
      </section>

      {/* 履歴 */}
      <section>
        <h2 className="text-xl font-semibold">履歴</h2>
        <ul id="history" className="list-disc pl-5"></ul>
        <div id="message" className="text-red-600 font-bold"></div>
      </section>
    </main>
  );
}
