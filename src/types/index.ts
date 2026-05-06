export interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	status: 'active' | 'inactive';
	joinedAt: string;
}
