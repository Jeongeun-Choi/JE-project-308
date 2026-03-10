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


export const boardWrapper = style({
  flex: 1,
  overflow: 'hidden',
});
