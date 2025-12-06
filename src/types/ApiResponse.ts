//not the actual reponse but how the response will be typed and show
import { Message } from "@/model/User";
export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean; 
    messages?: Array<Message>;
}