import { GitHubSignInButton } from '@/features/auth/components/GitHubSignInButton';

export default function SignInPage() {
  return (
    <main>
      <h1>GhostDev</h1>
      <p>내가 업무에 집중하는 동안, AI는 내 사이드 프로젝트를 빌드합니다.</p>
      <GitHubSignInButton />
    </main>
  );
}
