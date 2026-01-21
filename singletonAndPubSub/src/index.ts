import { startLogger } from "./logger";
import GameManager from "./store";
import PubSubManager from "./pubSubManager";

// startLogger();
// setInterval(() => GameManager.getInstance().addGame(Math.random().toString(), "Alice", "Bob"), 5000);

setInterval(() => PubSubManager.getInstance().userSubscribe(Math.random().toString(), "AAPL"), 5000);
