module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'speed-index',
      'largest-contentful-paint',
      'interactive',
      'total-blocking-time',
      'cumulative-layout-shift',
      'first-meaningful-paint',
      'max-potential-fid',
      'server-response-time',
      'render-blocking-resources',
      'uses-responsive-images',
      'offscreen-images',
      'unminified-css',
      'unminified-javascript',
      'unused-css-rules',
      'unused-javascript',
      'uses-optimized-images',
      'uses-webp-images',
      'uses-text-compression',
      'uses-rel-preconnect',
      'uses-rel-preload',
      'efficient-animated-content',
      'duplicated-javascript',
      'legacy-javascript',
      'dom-size',
      'critical-request-chains',
      'user-timings',
      'bootup-time',
      'mainthread-work-breakdown',
      'font-display',
      'resource-summary',
      'third-party-summary',
      'network-requests',
      'network-rtt',
      'network-server-latency',
      'main-thread-tasks',
      'diagnostics',
      'metrics',
      'performance-budget',
      'timing-budget',
      'lcp-lazy-loaded',
      'uses-passive-event-listeners',
      'no-document-write',
      'long-tasks',
      'non-composited-animations',
      'unsized-images',
      'viewport'
    ],
    skipAudits: [
      'uses-http2',
      'uses-long-cache-ttl',
      'redirects',
      'uses-http2',
      'modern-image-formats'
    ],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse',
    maxWaitForFcp: 15000,
    maxWaitForLoad: 35000
  }
};
