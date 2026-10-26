import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faCheck,
  faXmark,
  faStar,
  faHeart,
  faUser,
  faPlay,
  faPause,
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faMagnifyingGlass,
  faGear,
  faBell,
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faClock,
  faCalendar,
  faCompass,
  faLocationDot,
  faShip,
  faAnchor,
  faBook,
  faFileLines,
  faCamera,
  faVideo,
  faMicrophone,
  faVolumeHigh,
  faQuoteLeft,
  faQuoteRight,
  faChartLine,
  faBolt,
  faFire,
  faLightbulb,
  faCode,
  faTerminal,
  faLock,
  faUnlock,
  faShield,
  faGlobe,
  faEye,
  faBookmark,
  faFlag,
  faMoneyBillWave,
  faDollarSign,
  faCoins,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faYoutube,
  faTwitter,
  faFacebook,
  faTiktok,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

// Lookup dictionary for convenient string-based icon usage
const ICON_MAP: Record<string, IconDefinition> = {
  // Common UI
  check: faCheck,
  close: faXmark,
  xmark: faXmark,
  star: faStar,
  heart: faHeart,
  user: faUser,
  play: faPlay,
  pause: faPause,
  search: faMagnifyingGlass,
  settings: faGear,
  gear: faGear,
  bell: faBell,
  clock: faClock,
  calendar: faCalendar,
  lock: faLock,
  unlock: faUnlock,
  shield: faShield,
  globe: faGlobe,
  eye: faEye,
  bookmark: faBookmark,
  flag: faFlag,

  // Status & Feedback
  'circle-check': faCircleCheck,
  'circle-exclamation': faCircleExclamation,
  'circle-info': faCircleInfo,
  info: faCircleInfo,

  // Arrows & Navigation
  'arrow-right': faArrowRight,
  'arrow-left': faArrowLeft,
  'arrow-up': faArrowUp,
  'arrow-down': faArrowDown,
  compass: faCompass,
  location: faLocationDot,
  'location-dot': faLocationDot,

  // Maritime & Discovery (Darwin theme)
  ship: faShip,
  anchor: faAnchor,
  book: faBook,
  file: faFileLines,

  // Media
  camera: faCamera,
  video: faVideo,
  mic: faMicrophone,
  microphone: faMicrophone,
  volume: faVolumeHigh,
  'quote-left': faQuoteLeft,
  'quote-right': faQuoteRight,

  // Highlights & Code
  chart: faChartLine,
  bolt: faBolt,
  fire: faFire,
  lightbulb: faLightbulb,
  code: faCode,
  terminal: faTerminal,
  money: faMoneyBillWave,
  'money-bill': faMoneyBillWave,
  dollar: faDollarSign,
  coins: faCoins,
  'sack-dollar': faSackDollar,

  // Brands
  github: faGithub,
  youtube: faYoutube,
  twitter: faTwitter,
  facebook: faFacebook,
  tiktok: faTiktok,
  instagram: faInstagram,
};

export interface FaIconProps {
  /** Icon name (e.g. 'check', 'star', 'arrow-right', 'ship') or an IconDefinition */
  icon: string | IconDefinition;
  /** Size in pixels or FontAwesome size ('1x', '2x', '3x', etc.) */
  size?: number | 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x';
  /** Icon color (defaults to currentColor) */
  color?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Custom className */
  className?: string;
  /** Optional spin animation */
  spin?: boolean;
}

export const FaIcon: React.FC<FaIconProps> = ({
  icon,
  size = 24,
  color = 'currentColor',
  style = {},
  className,
  spin = false,
}) => {
  let resolvedIcon: IconDefinition = faCircleInfo;

  if (typeof icon === 'string') {
    const key = icon.toLowerCase().trim().replace(/^fa-/, '');
    resolvedIcon = ICON_MAP[key] || faCircleInfo;
  } else if (icon) {
    resolvedIcon = icon;
  }

  const isNumericSize = typeof size === 'number';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isNumericSize ? size : undefined,
        color,
        lineHeight: 1,
        ...style,
      }}
      className={className}
    >
      <FontAwesomeIcon
        icon={resolvedIcon}
        size={isNumericSize ? undefined : size}
        spin={spin}
      />
    </span>
  );
};

export default FaIcon;
