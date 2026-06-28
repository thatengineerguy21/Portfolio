/**
 * Comprehensive, enterprise-grade examples showcasing the versatility of WorkflowGraph.
 * Covers REST request flow, Microservices, AI Agent workflow, Queue processing, and Authentication flow.
 */

// 1. REST Request Flow
export const restRequestFlow = {
  nodes: [
    {
      id: 'client',
      label: 'Client Browser',
      type: 'http-client',
      status: 'success',
      metadata: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', protocol: 'HTTPS / TLS 1.3', ip: '192.168.1.104' },
    },
    {
      id: 'dns',
      label: 'Cloudflare DNS',
      type: 'gateway',
      status: 'success',
      metadata: { recordType: 'CNAME', resolvedIp: '104.18.32.12', latencyMs: 12 },
    },
    {
      id: 'lb',
      label: 'NGINX Load Balancer',
      type: 'gateway',
      status: 'success',
      metadata: { algorithm: 'Round Robin', activeConn: 1420, sslHandshakeMs: 8 },
    },
    {
      id: 'api-gateway',
      label: 'API Gateway (Kong)',
      type: 'gateway',
      status: 'success',
      metadata: { route: '/api/v1/users', rateLimitRemaining: 994, authenticated: true },
    },
    {
      id: 'service-auth',
      label: 'Auth Middleware',
      type: 'auth',
      status: 'success',
      groupId: 'backend-services',
      metadata: { jwkSource: 'Auth0', tokenValid: true, scopes: ['read:users', 'write:users'] },
    },
    {
      id: 'service-app',
      label: 'Node.js Express API',
      type: 'service',
      status: 'running',
      groupId: 'backend-services',
      metadata: { controller: 'UserController.getUserProfile', queryParams: { id: 'usr_98124' }, memoryUsageMb: 245 },
    },
    {
      id: 'cache-redis',
      label: 'Redis Cluster Cache',
      type: 'database',
      status: 'success',
      groupId: 'data-tier',
      metadata: { cacheHit: false, key: 'cache:usr_98124', evictionPolicy: 'allkeys-lru' },
    },
    {
      id: 'db-postgres',
      label: 'PostgreSQL Primary DB',
      type: 'database',
      status: 'success',
      groupId: 'data-tier',
      metadata: { query: 'SELECT * FROM users WHERE id = $1', executionTimeMs: 4.2, rowsReturned: 1 },
    }
  ],
  edges: [
    { from: 'client', to: 'dns', label: '1. Resolve Domain', animated: true },
    { from: 'dns', to: 'lb', label: '2. Route IP', animated: true },
    { from: 'lb', to: 'api-gateway', label: '3. Forward Request', animated: true },
    { from: 'api-gateway', to: 'service-auth', label: '4. Verify JWT', animated: true },
    { from: 'service-auth', to: 'service-app', label: '5. Invoke Controller', animated: true },
    { from: 'service-app', to: 'cache-redis', label: '6. Check Cache', animated: false },
    { from: 'cache-redis', to: 'db-postgres', label: '7. Cache Miss / Query DB', animated: true }
  ]
};

// 2. Microservices Communication Flow
export const microservicesFlow = {
  nodes: [
    {
      id: 'order-service',
      label: 'Order Service',
      type: 'microservice',
      status: 'success',
      metadata: { eventPublished: 'OrderCreatedEvent', payload: { orderId: 'ord_7731', amount: 249.99, userId: 'usr_12' } },
    },
    {
      id: 'event-bus',
      label: 'Kafka Event Bus',
      type: 'queue',
      status: 'running',
      metadata: { topic: 'orders.events', partition: 3, offset: 104892, replicationFactor: 3 },
    },
    {
      id: 'inventory-service',
      label: 'Inventory Service',
      type: 'microservice',
      status: 'success',
      groupId: 'downstream-consumers',
      metadata: { action: 'Deduct Stock', sku: 'PROD-MACBOOK-M3', remainingStock: 44 },
    },
    {
      id: 'payment-service',
      label: 'Payment Service (Stripe)',
      type: 'microservice',
      status: 'running',
      groupId: 'downstream-consumers',
      metadata: { action: 'Process Charge', paymentIntentId: 'pi_3MtwBwLkdIwHu7ix28a', status: 'Requires Confirmation' },
    },
    {
      id: 'notification-service',
      label: 'Notification Service',
      type: 'microservice',
      status: 'idle',
      groupId: 'downstream-consumers',
      metadata: { action: 'Send Email', templateId: 'order_confirmation', queued: true },
    },
    {
      id: 'analytics-service',
      label: 'BI & Analytics Ingestion',
      type: 'microservice',
      status: 'success',
      groupId: 'data-warehouse',
      metadata: { storage: 'ClickHouse', batchSize: 500, metricsUpdated: ['gmv_total', 'realtime_orders'] },
    }
  ],
  edges: [
    { from: 'order-service', to: 'event-bus', label: 'Publish OrderCreated', animated: true },
    { from: 'event-bus', to: 'inventory-service', label: 'Consume Event', animated: true },
    { from: 'event-bus', to: 'payment-service', label: 'Consume Event', animated: true },
    { from: 'event-bus', to: 'notification-service', label: 'Consume Event', animated: false },
    { from: 'event-bus', to: 'analytics-service', label: 'Stream Metrics', animated: true }
  ]
};

// 3. AI Agent Workflow
export const aiAgentFlow = {
  nodes: [
    {
      id: 'user-prompt',
      label: 'User Request Prompt',
      type: 'agent-input',
      status: 'success',
      metadata: { prompt: 'Analyze Apple Q3 earnings report and compare with Microsoft', tokens: 14, priority: 'high' },
    },
    {
      id: 'orchestrator',
      label: 'Agent Squad Orchestrator',
      type: 'agent',
      status: 'running',
      metadata: { activeSubagents: 2, model: 'Gemini 1.5 Pro', temperature: 0.2, planningStrategy: 'ReAct' },
    },
    {
      id: 'search-tool',
      label: 'Exa Web Search MCP',
      type: 'agent-tool',
      status: 'success',
      groupId: 'mcp-servers',
      metadata: { query: 'Apple Q3 2025 earnings report release highlights', resultsCount: 10, searchType: 'neural' },
    },
    {
      id: 'finance-tool',
      label: 'Alpha Vantage MCP',
      type: 'agent-tool',
      status: 'success',
      groupId: 'mcp-servers',
      metadata: { symbols: ['AAPL', 'MSFT'], metrics: ['quarterlyEarnings', 'peRatio', 'revenueGrowth'] },
    },
    {
      id: 'vector-db',
      label: 'Pinecone Vector DB',
      type: 'database',
      status: 'success',
      groupId: 'memory-layer',
      metadata: { namespace: 'earnings_reports', topK: 5, similarityScore: 0.923 },
    },
    {
      id: 'evaluator',
      label: 'Fact Check Evaluator',
      type: 'agent',
      status: 'running',
      metadata: { assertionsChecked: 14, halluciationScore: 0.01, passed: true },
    },
    {
      id: 'report-generator',
      label: 'Artifact Synthesizer',
      type: 'agent-output',
      status: 'idle',
      metadata: { artifactName: 'aapl_msft_q3_comparison.md', format: 'markdown', tablesIncluded: 3 },
    }
  ],
  edges: [
    { from: 'user-prompt', to: 'orchestrator', label: 'Submit Prompt', animated: true },
    { from: 'orchestrator', to: 'search-tool', label: 'Call Search Tool', animated: true },
    { from: 'orchestrator', to: 'finance-tool', label: 'Fetch Financials', animated: true },
    { from: 'orchestrator', to: 'vector-db', label: 'RAG Knowledge Lookup', animated: true },
    { from: 'search-tool', to: 'evaluator', label: 'Return Web Context', animated: true },
    { from: 'finance-tool', to: 'evaluator', label: 'Return Market Data', animated: true },
    { from: 'vector-db', to: 'evaluator', label: 'Return Embedded Docs', animated: true },
    { from: 'evaluator', to: 'report-generator', label: 'Generate Final Artifact', animated: false }
  ]
};

// 4. Queue Processing Pipeline
export const queueProcessingFlow = {
  nodes: [
    {
      id: 'webhook-ingest',
      label: 'Webhook Ingestion Endpoint',
      type: 'gateway',
      status: 'success',
      metadata: { endpoint: '/webhooks/stripe', method: 'POST', reqSizeKb: 12 },
    },
    {
      id: 'sqs-queue',
      label: 'AWS SQS Job Queue',
      type: 'queue',
      status: 'success',
      metadata: { queueUrl: 'https://sqs.us-east-1.amazonaws.com/123/stripe-events', approxMessages: 24, visibilityTimeoutSec: 60 },
    },
    {
      id: 'worker-1',
      label: 'Background Worker A',
      type: 'worker',
      status: 'running',
      groupId: 'worker-pool',
      metadata: { job: 'UpdateSubscriptionStatus', attempt: 1, memoryLimitMb: 512, cpuUtilization: '45%' },
    },
    {
      id: 'worker-2',
      label: 'Background Worker B',
      type: 'worker',
      status: 'failed',
      groupId: 'worker-pool',
      metadata: { job: 'GenerateInvoicePDF', attempt: 3, error: 'FontFamilyNotFoundException', fatal: true },
    },
    {
      id: 'dlq',
      label: 'Dead Letter Queue (DLQ)',
      type: 'queue',
      status: 'failed',
      metadata: { retryThresholdExceeded: true, storedMutedFailures: 4, alarmStatus: 'Triggered' },
    },
    {
      id: 's3-bucket',
      label: 'AWS S3 Storage',
      type: 'database',
      status: 'success',
      metadata: { bucket: 'prod-invoice-pdfs', encryption: 'SSE-S3', acl: 'private' },
    }
  ],
  edges: [
    { from: 'webhook-ingest', to: 'sqs-queue', label: 'Enqueue Job', animated: true },
    { from: 'sqs-queue', to: 'worker-1', label: 'Poll Message', animated: true },
    { from: 'sqs-queue', to: 'worker-2', label: 'Poll Message', animated: true },
    { from: 'worker-1', to: 's3-bucket', label: 'Upload PDF Success', animated: true },
    { from: 'worker-2', to: 'dlq', label: 'Exceeded Retries (DLQ)', animated: false }
  ]
};

// 5. Authentication & Authorization Flow
export const authFlow = {
  nodes: [
    {
      id: 'user',
      label: 'Client Initializer',
      type: 'http-client',
      status: 'success',
      metadata: { action: 'Log In', provider: 'Auth0 / Okta' },
    },
    {
      id: 'login-redirect',
      label: 'Login Page Redirect',
      type: 'gateway',
      status: 'success',
      metadata: { responseType: 'code', scope: 'openid profile email', state: 'xyz_8812' },
    },
    {
      id: 'idp',
      label: 'Identity Provider (IdP)',
      type: 'auth',
      status: 'success',
      groupId: 'external-auth',
      metadata: { status: 'User Authenticated', mfaChallengePassed: true, riskScore: 'Low' },
    },
    {
      id: 'token-exchange',
      label: 'Backchannel Token Exchange',
      type: 'auth',
      status: 'success',
      metadata: { endpoint: '/oauth/token', grantType: 'authorization_code', clientAuth: 'mtls' },
    },
    {
      id: 'jwt-mint',
      label: 'JWT Generator / Signer',
      type: 'auth',
      status: 'success',
      groupId: 'external-auth',
      metadata: { algorithm: 'RS256', expirationSec: 3600, issuer: 'https://auth.enterprise.com' },
    },
    {
      id: 'session-store',
      label: 'Session Storage (Redis)',
      type: 'database',
      status: 'success',
      metadata: { sessionId: 'sess_abc123', ttlSeconds: 86400, secureCookieSet: true },
    }
  ],
  edges: [
    { from: 'user', to: 'login-redirect', label: 'Request Secure Route', animated: true },
    { from: 'login-redirect', to: 'idp', label: 'Prompt Creds & MFA', animated: true },
    { from: 'idp', to: 'token-exchange', label: 'Redirect Auth Code', animated: true },
    { from: 'token-exchange', to: 'jwt-mint', label: 'Validate Code & Secret', animated: true },
    { from: 'jwt-mint', to: 'session-store', label: 'Mint Tokens & Establish Session', animated: true }
  ]
};
