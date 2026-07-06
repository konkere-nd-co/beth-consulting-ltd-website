"use client";
import React, { useEffect, useState } from 'react';
import { fallbackConfig } from '../config';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  offerKey: 'operationalClarityAudit' | 'focusedSystemBuild' | 'operationalResetPackage';
  children?: React.ReactNode;
}

export function OfferButton({ offerKey, children, ...props }: Props) {
  const [href, setHref] = useState<string>('');

  useEffect(() => {
    const cfg = (typeof window !== 'undefined' && (window as any).BCL_CONFIG) ? (window as any).BCL_CONFIG : fallbackConfig;
    const url = (cfg.offers && cfg.offers[offerKey]) ? cfg.offers[offerKey] : cfg.selarStore;
    if (url) {
      setHref(url);
    }
  }, [offerKey]);

  const defaultUrl = (fallbackConfig.offers && fallbackConfig.offers[offerKey]) ? fallbackConfig.offers[offerKey] : fallbackConfig.selarStore;
  const displayHref = href || defaultUrl;

  return (
    <a href={displayHref} target="_blank" rel="noopener" {...props}>
      {children}
    </a>
  );
}
