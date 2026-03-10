import { Octokit } from '@octokit/rest';

/**
 * 유저의 GitHub access token으로 Octokit 인스턴스를 생성합니다.
 * token은 session.provider_token에서만 가져와야 합니다 — DB 저장 금지.
 */
export function createOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken });
}
