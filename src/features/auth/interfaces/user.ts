export interface ILoggedUser {
	id:               string;
	email:            string;
	username:         string;
	userType:         string;
	status:           string;
	profile:          Profile;
	balance:          Balance;
	referredById:     string;
	referralCode:     string;
}

export interface Balance {
	points:  number;
	credits: number;
}

export interface Profile {
	displayName: string;
	avatarUri:   string;
	country:     string;
}