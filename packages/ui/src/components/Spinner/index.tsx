import { spinnerStyle } from './styles.css';

export const Spinner = ({
  color = '#ffa07a',
  size = 48,
}: {
  color?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={spinnerStyle}
  >
    {/* 포크 날 (Tines) */}
    <path
      d="M42 25V38M50 22V38M58 25V38"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* 포크 어깨 (Shoulder) */}
    <path
      d="M42 38C42 45 58 45 58 38"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* 포크 손잡이 (Stem) */}
    <path
      d="M50 41.5V75"
      stroke={color}
      strokeWidth="5.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* 손잡이 끝 장식 (Knob) */}
    <circle cx="50" cy="78" r="4.5" fill={color} stroke="none" />
  </svg>
);
