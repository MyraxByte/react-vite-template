export interface ILoginResult {
    accessToken: string;
    refreshToken: string;
	expiresAt: number;
	tokenType: string;
}