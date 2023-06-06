import User from "../Models/User";

export interface TokenResponseDto {
    accessToken: string;
    refreshToken: string;
    user:Partial<User>
}