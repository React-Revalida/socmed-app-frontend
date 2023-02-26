import chatHttp from "./chat-http"
export const getMutualFollows = async () => {
    return await chatHttp.post("/mutual-followed");
}