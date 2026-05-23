export interface PlayerProfile {
  playerId: string;
  name: string;
  lastSeen: number;
  deviceInfo?: DeviceInfo;
}

export interface DeviceInfo {
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };

  os: {
    name?: string;
    version?: string;
  };

  device: {
    vendor?: string;
    model?: string;
    type?: string;
  };

  cpu: {
    architecture?: string;
  };

  userAgent: string;
  language: string;
  platform: string;
  cookieEnabled: boolean;

  screen: {
    width: number;
    height: number;
    colorDepth: number;
  };

  viewport: {
    width: number;
    height: number;
  };

  timezone: string;
}