"use client";
import React, { useEffect, useState } from 'react';
import { fallbackConfig, BCLConfigKey } from '../config';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  cfgKey: BCLConfigKey;
  showText?: boolean;
  children?: React.ReactNode;
}

export function ConfigLink({ cfgKey, showText, children, ...props }: Props) {
  const [href, setHref] = useState<string>('');
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const cfg = (typeof window !== 'undefined' && (window as any).BCL_CONFIG) ? (window as any).BCL_CONFIG : fallbackConfig;
    const val = cfg[cfgKey] || '';
    if (val) {
      setHref(cfgKey === 'email' ? `mailto:${val}` : val);
      if (showText) {
        setText(val);
      }
    }
  }, [cfgKey, showText]);

  const defaultVal = fallbackConfig[cfgKey] || '';
  const displayHref = href || (cfgKey === 'email' ? `mailto:${defaultVal}` : defaultVal);
  const displayText = showText ? (text || defaultVal) : children;

  return (
    <a href={displayHref} {...props}>
      {displayText}
    </a>
  );
}
