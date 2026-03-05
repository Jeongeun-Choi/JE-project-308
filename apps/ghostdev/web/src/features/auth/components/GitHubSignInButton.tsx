'use client';

import { useState } from 'react';
import { signInWithGitHub } from '../services/auth.service';

export function GitHubSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    try {
      await signInWithGitHub();
    } catch (error) {
      console.error('GitHub 로그인 실패:', error);
      setIsLoading(false);
    }
    // 성공 시 Supabase가 redirect하므로 setIsLoading(false) 불필요
  }

  return (
    <button onClick={handleSignIn} disabled={isLoading}>
      {isLoading ? '로그인 중...' : 'GitHub으로 시작하기'}
    </button>
  );
}
