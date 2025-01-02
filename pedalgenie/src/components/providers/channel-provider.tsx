'use client';

import { ReactChannelIO } from 'react-channel-plugin';

type ChannelProviderProps = {
  children: React.ReactNode;
};

export function ChannelProvider({ children }: ChannelProviderProps) {
  //   const NEXT_PUBLIC_CHANNEL_PLUGIN_KEY = process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY || '';

  return (
    <ReactChannelIO pluginKey={'b82ad4b8-a7bf-4fd2-a1c3-2cfe0a636620'} language="ko" autoBoot>
      {children}
    </ReactChannelIO>
  );
}
