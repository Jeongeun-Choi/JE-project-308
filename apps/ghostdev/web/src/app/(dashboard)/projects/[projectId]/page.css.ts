import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/tokens.css';

export const pageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const pageHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space.lg} ${vars.space.xl}`,
  borderBottom: `1px solid ${vars.color.cardBorder}`,
});

export const breadcrumb = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  fontSize: '12px',
  color: vars.color.textDim,
  letterSpacing: '0.05em',
  marginBottom: vars.space.sm,
});

export const pageTitle = style({
  fontSize: '28px',
  fontWeight: 700,
  color: vars.color.text,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
});

export const initTaskButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  backgroundColor: vars.color.magenta,
  color: vars.color.bg,
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  cursor: 'pointer',
  transform: 'skewX(-8deg)',
  border: 'none',
  transition: 'opacity 0.15s',
  ':hover': {
    opacity: 0.85,
  },
});

export const initTaskInner = style({
  transform: 'skewX(8deg)',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.xs,
});

export const boardWrapper = style({
  flex: 1,
  overflow: 'hidden',
});
