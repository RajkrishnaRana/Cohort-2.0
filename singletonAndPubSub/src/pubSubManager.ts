import { createClient, RedisClientType } from "redis";

class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<string, string[] | undefined>;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PubSubManager();
        }
        return this.instance;
    }

    userSubscribe(userId: string, stock: string) {
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        this.subscriptions.get(stock)?.push(userId);

        if (this.subscriptions.get(stock)?.length === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribe to Redis channel `, stock);
        }
    }

    unSubscribe(userId: string, stock: string) {
        this.subscriptions.set(
            stock,
            this.subscriptions.get(stock)?.filter((sub) => sub !== userId),
        );

        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`Unsubscribe from Redis channel `, stock);
        }
    }

    private handleMessage(stock: string, message: string) {
        console.log(`Message recieved on channel ${stock} : ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log("Sending message to the user ", sub);
        });
    }

    // Cleanup on instance distruction
    async disconnect() {
        await this.redisClient.quit();
    }
}

export default PubSubManager;
