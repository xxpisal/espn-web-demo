import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  favoriteSports: string[];
  favoriteTeams: string[];
  createdAt: Date;
}

// In-memory store for demo - replace with TypeORM in production
const users: User[] = [];

@Injectable()
export class UsersService {
  async findByEmail(email: string): Promise<User | undefined> {
    return users.find((u) => u.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return users.find((u) => u.id === id);
  }

  async create(data: Partial<User>): Promise<User> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: data.email,
      username: data.username,
      password: data.password,
      avatar: data.avatar,
      favoriteSports: data.favoriteSports || [],
      favoriteTeams: data.favoriteTeams || [],
      createdAt: new Date(),
    };
    users.push(user);
    return user;
  }

  async updateFavorites(
    userId: string,
    favoriteSports: string[],
    favoriteTeams: string[],
  ): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    user.favoriteSports = favoriteSports;
    user.favoriteTeams = favoriteTeams;
    return user;
  }
}
