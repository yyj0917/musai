'use client';

import { ReactChannelIO } from 'react-channel-plugin';

type ChannelProviderProps = {
  children: React.ReactNode;
};

export function ChannelProvider({ children }: ChannelProviderProps) {
  return (
    <ReactChannelIO
      pluginKey={'b82ad4b8-a7bf-4fd2-a1c3-2cfe0a636620'}
      language="ko"
      autoBoot
      customLauncherSelector=".custom-channeltalk"
      hideChannelButtonOnBoot={true}>
      {children}
    </ReactChannelIO>
  );
}
