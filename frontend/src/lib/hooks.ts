'use client';

/**
 * Custom hooks that encapsulate data-fetching logic.
 * Components import hooks, not raw query boilerplate.
 */

import { useQuery } from '@tanstack/react-query';
import { teacherSportsApi, newsApi, scoresApi, sportsApi } from '@/lib/api';
import {
  TeacherSportItem,
  TeacherEventItem,
  TeacherCommentItem,
  SportDetailItem,
} from '@/types';
import { SCORES_REFETCH_INTERVAL_MS } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Sports
// ---------------------------------------------------------------------------

/** All sports from the teacher API. Falls back to empty array on error. */
export function useAllSports() {
  return useQuery<TeacherSportItem[]>({
    queryKey: ['all-sports'],
    queryFn: async (): Promise<TeacherSportItem[]> => {
      const res = await teacherSportsApi.getAllSports();
      return Array.isArray(res.data) ? res.data : [];
    },
  });
}

/** Sports filtered to a given category slug. */
export function useSportsByCategory(categorySlug: string) {
  return useQuery<TeacherSportItem[]>({
    queryKey: ['sports-by-category', categorySlug],
    queryFn: async (): Promise<TeacherSportItem[]> => {
      const res = await teacherSportsApi.getAllSports();
      const all: TeacherSportItem[] = Array.isArray(res.data) ? res.data : [];
      return all.filter(
        (s) => s.category?.name?.toLowerCase() === categorySlug,
      );
    },
  });
}

/** Single sport/event detail by UUID — tries sports first, then events. */
export function useSportDetail(uuid: string) {
  return useQuery<SportDetailItem | null>({
    queryKey: ['sport-detail', uuid],
    queryFn: async (): Promise<SportDetailItem | null> => {
      try {
        const res = await teacherSportsApi.getSportByUuid(uuid);
        if (res.data?.uuid) return res.data;
      } catch {
        // fall through to events
      }
      try {
        const res = await teacherSportsApi.getEventByUuid(uuid);
        return res.data ?? null;
      } catch {
        return null;
      }
    },
  });
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

/** All events from the teacher API. Falls back to empty array on error. */
export function useAllEvents() {
  return useQuery<TeacherEventItem[]>({
    queryKey: ['all-events'],
    queryFn: async (): Promise<TeacherEventItem[]> => {
      const res = await teacherSportsApi.getEvents();
      return Array.isArray(res.data) ? res.data : [];
    },
  });
}

/** Events filtered to a given category slug. */
export function useEventsByCategory(categorySlug: string) {
  return useQuery<TeacherEventItem[]>({
    queryKey: ['events-by-category', categorySlug],
    queryFn: async (): Promise<TeacherEventItem[]> => {
      const res = await teacherSportsApi.getEvents();
      const all: TeacherEventItem[] = Array.isArray(res.data) ? res.data : [];
      return all.filter(
        (e) =>
          e.category?.name?.toLowerCase() === categorySlug ||
          e.categoryName?.toLowerCase() === categorySlug,
      );
    },
  });
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export function useComments(uuid: string) {
  return useQuery<TeacherCommentItem[]>({
    queryKey: ['comments', uuid],
    queryFn: async (): Promise<TeacherCommentItem[]> => {
      const res = await teacherSportsApi.getComments(uuid);
      return Array.isArray(res.data) ? res.data : [];
    },
  });
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export function useTopHeadlines(limit = 10) {
  return useQuery({
    queryKey: ['top-headlines', limit],
    queryFn: () => newsApi.getTopHeadlines(limit).then((r) => r.data),
    retry: false,
  });
}

// ---------------------------------------------------------------------------
// Scores & Standings
// ---------------------------------------------------------------------------

/** Live scores with automatic 30-second refresh. */
export function useLiveScores() {
  return useQuery({
    queryKey: ['live-scores'],
    queryFn: () => scoresApi.getLive().then((r) => r.data),
    refetchInterval: SCORES_REFETCH_INTERVAL_MS,
    retry: false,
  });
}

export function useStandings(sport: string) {
  return useQuery({
    queryKey: ['standings', sport],
    queryFn: () => sportsApi.getStandings('football', sport).then((r) => r.data),
    retry: false,
  });
}
