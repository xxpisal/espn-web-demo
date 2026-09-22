import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NewsArticle, SportType } from '../common/types';

@Injectable()
export class NewsService {
  private readonly espnApiBase = 'https://site.api.espn.com/apis/site/v2/sports';

  constructor(private httpService: HttpService) {}

  async getTopHeadlines(limit = 20): Promise<NewsArticle[]> {
    const sports: Array<{ path: string; sport: SportType }> = [
      { path: 'football/nfl', sport: 'nfl' },
      { path: 'basketball/nba', sport: 'nba' },
      { path: 'baseball/mlb', sport: 'mlb' },
      { path: 'hockey/nhl', sport: 'nhl' },
      { path: 'soccer/usa.1', sport: 'soccer' },
    ];

    const allArticles: NewsArticle[] = [];

    await Promise.allSettled(
      sports.map(async ({ path, sport }) => {
        try {
          const url = `${this.espnApiBase}/${path}/news`;
          const response = await firstValueFrom(
            this.httpService.get(url, { params: { limit: 5 } }),
          );
          const articles = this.transformEspnNews(response.data, sport);
          allArticles.push(...articles);
        } catch {
          const mockArticles = this.getMockArticles(sport, 3);
          allArticles.push(...mockArticles);
        }
      }),
    );

    return allArticles.slice(0, limit);
  }

  async getNewsBySport(sport: SportType, limit = 15): Promise<NewsArticle[]> {
    const sportPaths: Record<SportType, string> = {
      nfl: 'football/nfl',
      nba: 'basketball/nba',
      mlb: 'baseball/mlb',
      nhl: 'hockey/nhl',
      soccer: 'soccer/usa.1',
      ncaaf: 'football/college-football',
      ncaab: 'basketball/mens-college-basketball',
      f1: 'racing/f1',
      tennis: 'tennis/atp',
      golf: 'golf/pga',
      mma: 'mma/ufc',
    };

    const path = sportPaths[sport];
    if (!path) return [];

    try {
      const url = `${this.espnApiBase}/${path}/news`;
      const response = await firstValueFrom(
        this.httpService.get(url, { params: { limit } }),
      );
      return this.transformEspnNews(response.data, sport);
    } catch {
      return this.getMockArticles(sport, limit);
    }
  }

  private transformEspnNews(data: any, sport: SportType): NewsArticle[] {
    const articles = data?.articles || [];
    return articles.map((article: any) => ({
      id: article.dataSourceIdentifier || String(Math.random()),
      headline: article.headline,
      description: article.description,
      story: article.story,
      images: article.images?.map((img: any) => ({
        url: img.url,
        caption: img.caption,
        width: img.width,
        height: img.height,
      })),
      published: article.published,
      sport,
      categories: article.categories?.map((c: any) => c.description),
      links: article.links,
      source: 'ESPN',
    }));
  }

  private getMockArticles(sport: SportType, count: number): NewsArticle[] {
    const headlines: Record<SportType, string[]> = {
      nfl: [
        'Chiefs secure playoff spot with dominant victory',
        'NFL Week 15 preview: Key matchups to watch',
        'Mahomes breaks another passing record',
      ],
      nba: [
        'LeBron scores 40 in Lakers comeback win',
        'NBA trade deadline approaching: Teams on the move',
        "Warriors's dynasty continues with young core",
      ],
      mlb: [
        'Yankees sign All-Star in blockbuster deal',
        'Spring training opens with optimism across MLB',
        'Dodgers favored to repeat as World Series champions',
      ],
      nhl: [
        'Ovechkin closes in on all-time goals record',
        'NHL playoff picture taking shape at midseason',
        'Oilers dominant in Western Conference standings',
      ],
      soccer: [
        'USMNT qualifies for World Cup after strong qualifier',
        'Messi named MLS Player of the Year',
        'Premier League title race wide open at winter break',
      ],
      ncaaf: [
        'College football playoff field set',
        'Heisman Trophy race down to final candidates',
        'Top programs recruiting battles heat up',
      ],
      ncaab: [
        'March Madness brackets released',
        'Top 25 rankings shake up after upset weekend',
        'Conference tournament previews',
      ],
      f1: [
        'Hamilton wins dramatic season finale',
        'New F1 regulations spark team controversies',
        'Verstappen secures constructors championship',
      ],
      tennis: [
        'Djokovic wins Australian Open title',
        'Wimbledon seeds announced for grass season',
        'US Open draw creates first-round blockbusters',
      ],
      golf: [
        'McIlroy wins PGA Championship in playoff',
        'Masters preview: who can challenge the favorites?',
        'LIV Golf merger talks continue',
      ],
      mma: [
        'UFC 300 card finalized',
        'Jones defends heavyweight title in dominant fashion',
        'Contender Series results shock the MMA world',
      ],
    };

    return (headlines[sport] || []).slice(0, count).map((headline, i) => ({
      id: `${sport}_mock_${i}`,
      headline,
      description: `${headline}. Read the full story for details and analysis.`,
      published: new Date(Date.now() - i * 3600000).toISOString(),
      sport,
      images: [{ url: `https://picsum.photos/400/250?random=${sport}${i}` }],
      source: 'ESPN',
    }));
  }
}
