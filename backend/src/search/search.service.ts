import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private httpService: HttpService) {}

  async search(query: string): Promise<any> {
    try {
      const url = `https://site.web.api.espn.com/apis/common/v3/search`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: { query, limit: 10, mode: 'prefix' },
        }),
      );
      return response.data;
    } catch {
      return this.getMockSearchResults(query);
    }
  }

  private getMockSearchResults(query: string) {
    return {
      query,
      results: [
        {
          type: 'team',
          id: '1',
          name: `${query} Eagles`,
          sport: 'NFL',
          image: 'https://picsum.photos/50/50?random=1',
        },
        {
          type: 'player',
          id: '2',
          name: `${query} Johnson`,
          sport: 'NBA',
          position: 'SG',
          image: 'https://picsum.photos/50/50?random=2',
        },
        {
          type: 'article',
          id: '3',
          title: `Latest news about ${query}`,
          sport: 'NFL',
          published: new Date().toISOString(),
        },
      ],
    };
  }
}
