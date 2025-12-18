import { ComponentType, SVGProps } from 'react';

declare module '@/components/ui/AppIcon' {
  // List all possible icon names used in the project
  type IconName =
    // From Header component
    | 'ArrowRightOnRectangleIcon'
    | 'Bars3Icon'
    | 'ChartBarIcon'
    | 'ChevronDownIcon'
    | 'DocumentTextIcon'
    | 'InformationCircleIcon'
    | 'UserIcon'
    | 'WalletIcon'
    | 'XMarkIcon'
    // From ContactSection component
    | 'SparklesIcon'
    | 'UserPlusIcon'
    | 'ArrowRightIcon'
    | 'PhoneIcon'
    | 'EnvelopeIcon'
    | 'MapPinIcon';

  interface AppIconProps extends SVGProps<SVGSVGElement> {
    name: IconName;
    size?: number;
    className?: string;
  }

  const AppIcon: React.FC<AppIconProps>;
  export default AppIcon;
}
