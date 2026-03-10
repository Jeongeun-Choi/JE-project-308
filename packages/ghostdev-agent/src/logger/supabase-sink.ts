import { createClient } from '@supabase/supabase-js';
import type { AgentLogger } from '../types.js';

export class SupabaseLogger implements AgentLogger {
  private client;
  private runId: string;
  private sequence = 0;

  constructor(runId: string, supabaseUrl: string, serviceKey: string) {
    this.runId = runId;
    // service_key는 RLS 우회 — 에이전트에서만 사용
    this.client = createClient(supabaseUrl, serviceKey);
  }

  private async write(
    level: string,
    message: string,
    metadata?: unknown,
  ): Promise<void> {
    const seq = ++this.sequence;
    console.log(`[${level}] ${message}`); // GitHub Actions 로그에도 출력

    await this.client.from('ghostdev_run_logs').insert({
      run_id: this.runId,
      level,
      message,
      metadata: metadata ? JSON.stringify(metadata) : null,
      sequence: seq,
    });
  }

  info(message: string, metadata?: unknown) {
    return this.write('INFO', message, metadata);
  }

  toolCall(toolName: string, args: unknown) {
    return this.write('TOOL_CALL', `🔧 ${toolName}`, args);
  }

  toolResult(toolName: string, result: unknown) {
    return this.write('TOOL_RESULT', `✅ ${toolName} 완료`, result);
  }

  error(message: string, metadata?: unknown) {
    return this.write('ERROR', message, metadata);
  }

  success(message: string) {
    return this.write('SUCCESS', message);
  }
}
