import EventEmitter from 'events';

export class TxListener extends EventEmitter {
    isListening: boolean;

    constructor() {
        super();
        this.isListening = false;
    }

    startListening() {
        if (this.isListening) {
            console.log("Already listening for transactions.");
            return;
        }

        this.isListening = true;
        console.log("Started listening for transactions...");

        // ここでトランザクションの監視を開始する
        // 例: ブロックチェーンAPIを使用して新しいトランザクションを監視
        this.mockListening();
    }

    stopListening() {
        if (!this.isListening) {
            console.log("Not currently listening for transactions.");
            return;
        }

        this.isListening = false;
        console.log("Stopped listening for transactions.");

        // ここで監視を停止する処理を実装
    }

    // このメソッドは実際の実装では、実際のブロックチェーンイベントを監視します
    mockListening() {
        setInterval(() => {
            if (this.isListening) {
                // ターゲットとなるトランザクションを模擬的に生成
                const mockTx = {
                    id: Math.random().toString(36).substr(2, 9),
                    // その他の必要なトランザクション情報
                };

                // 'targetFound' イベントを発火
                this.emit('targetFound', mockTx);
            }
        }, 5000); // 5秒ごとにチェック（実際の実装ではこの間隔は適切に調整する）
    }
}
