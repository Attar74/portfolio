const blogs = [
  {
    id: 'nestjs-foundation-setup',
    title: 'Building the Foundation of a NestJS Application',
    description:
      'The most important stage that most developers skip. Learn how to build a production-ready foundation with proper structure, clean architecture, and essential infrastructure from day one.',
    content: `# 🧱 Stage 01 — Building the Foundation of a NestJS Application

When starting any serious backend project, the biggest mistake developers make is **rushing into features**.

I didn't.

In this stage, I focused on building a solid, production-ready foundation using NestJS — because everything that comes later depends on it.

## 🎯 The Goal

Before writing a single business feature, I wanted to answer:

**"Is my app ready for production from day one?"**

So the goal of Stage 01 was simple:

✅ Proper structure  
✅ Clean architecture  
✅ Production-ready setup

## ⚙️ What I Built

Instead of jumping into APIs, I focused on the core infrastructure.

### 1. Project Setup

A clean NestJS project with TypeScript:

\`\`\`bash
npm i -g @nestjs/cli
nest new enterprise-workflow-engine
cd enterprise-workflow-engine
\`\`\`

**What this gives you:**

- Proper configuration (tsconfig, nest-cli)
- Clear folder structure
- Scalable architecture from the start

👉 **This avoids messy refactoring later.**

### 2. Database Layer (Prisma + PostgreSQL)

I integrated Prisma ORM with PostgreSQL.

**Why?**

✅ Type-safe queries  
✅ Excellent developer experience  
✅ Easy migrations

**Install dependencies:**

\`\`\`bash
npm install @prisma/client @prisma/adapter-pg pg
npm install -D prisma
npx prisma init
\`\`\`

**Also implemented:**

- Connection lifecycle handling
- Global access via a module

**Create Prisma Service:**

\`\`\`typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);
    
    super({ 
      adapter, 
      log: ['query', 'error', 'warn'] 
    });
    
  # 3. Configuration Management (Critical 🔥)

This is one of the **most important decisions**.

I added:

- \`.env\` + \`.env.example\`
- Validation using \`class-validator\`

👉 **The app fails at startup if config is wrong.**

**Why this matters:**

✅ No hidden runtime bugs  
✅ No "it works on my machine" issues  
✅ Production-ready from day one

**Create validation schema
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
\`\`\`

## 3. Configuration Management

Type-safe, validated configuration prevents runtime errors.

**Create validation schema (src/config/environment.validation.ts):**

\`\`\`typescript
import { IsEnum, IsNumber, IsString, Min, Max } from 'class-validator';
import { plainToClass } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(1000)
  @Max(65535)
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
# 4. Custom Logger

Instead of \`console.log\`, I built a **structured logger**:

✅ Log levels (error, warn, debug…)  
✅ Context-aware logs  
✅ JSON output in production

👉 **This is essential for:**

- Debugging
- Monitoring
- Production systems

**Create logger service
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
\`\`\`

## 4. Custom Logger Service

Production apps need structured logging for easy debugging and monitoring.

**Create logger service (src/common/logger/custom-logger.service.ts):**

\`\`\`typescript
import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    this.printMessage('LOG', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.printMessage('ERROR', message, context, trace);
  }

  warn(message: string, context?: string) {
    this.printMessage('WARN', message, context);
  }

  private printMessage(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    
    console.log(
      JSON.stringify({
        timestamp,
  # 5. Global Error Handling

I implemented exception filters to:

✅ Standardize error responses  
✅ Hide internal details  
✅ Map database errors properly

👉 **Result:**

- Clean API responses
- Better security
- Consistent error format

**Create exception filter
    );
  }
}
\`\`\`

## 5. Global Exception Handling

Consistent error responses make APIs easier to consume.

**Create exception filter (src/common/filters/all-exceptions.filter.ts):**

\`\`\`typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

  # 6. Health Check Endpoints

Added endpoints like:

- \`GET /health\`
- \`GET /health/ready\`

👉 **Why?**

✅ Used by load balancers  
✅ Required in Kubernetes  
✅ Helps detect system failures early
      path: request.url,
      message,
    });
  }
}
\`\`\`

## 6. Health Check Endpoints

Essential for load balancers and Kubernetes probes.

\`\`\`typescript
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  # 7. Clean Application Bootstrap

In \`main.ts\`, I configured:

✅ Global validation  
✅ Global error filters  
✅ API prefix (\`/api/v1\`)  
✅ CORS

👉 **This keeps everything centralized and predictable.**

\`\`\`typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
\`\`\`

## 🧠 Key Concepts Behind This Stage

This stage wasn't just about setup — it was about **engineering discipline**.

### 1. Dependency Injection

Instead of creating dependencies manually:

\`\`\`typescript
constructor(private prisma: PrismaService) {}
\`\`\`

👉 NestJS injects everything automatically.

**Benefits:**

✅ Loose coupling  
✅ Easy testing  
✅ Clean architecture

### 2. Fail Fast Principle

Instead of:

❌ Failing during runtime  
✅ **Fail immediately on startup**

Example: Missing DB URL → app won't start

### 3. Separation of Concerns

Each part has a clear responsibility:

- **Controllers** → handle requests
- **Services** → business logic
- **Modules** → structure

### 4. Production Mindset from Day 1

Most devs add these later. **That's a mistake.**

I built from day one:

✅ Logging  
✅ Error handling  
✅ Validation  
✅ Monitoring

## ⚠️ Common Mistakes I Avoided

From experience, these are dangerous:

❌ Using \`console.log\` in production  
❌ Skipping environment validation  
❌ Mixing logic everywhere  
❌ Not handling exceptions globally  
❌ Tight coupling between components

## 🧩 Why This Stage Matters

This stage doesn't look "exciting"…

**But it's the most important stage.**

Because:

✅ Every future feature depends on it  
✅ Fixing it later is expensive  
✅ It defines your system quality

## 🚀 What's Next?

In **Stage 02**, I'll start building:

- Authentication system
- JWT login
- User management
- Authorization basics

## 🏁 Final Thought

**"A strong foundation is invisible… until it fails."**

Most developers skip this stage.

Senior engineers don't.

**GitHub**:or easy parsing
3. **Global error handling**: Consistent error responses
4. **Type safety everywhere**: Prisma + TypeScript = fewer bugs
5. **Health checks**: Essential for production deployments

## What's Next?

In the next post, we'll build a JWT authentication system with password hashing and token generation.

**GitHub**: Check out the full code at [enterprise-workflow-engine](https://github.com/Attar74/enterprise-workflow-engine)`,
    date: '2025-12-05',
    author: 'Attar',
    tags: ['NestJS', 'TypeScript', 'Prisma', 'Backend', 'Architecture'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '12 min read',
  },
  {
    id: 'nestjs-jwt-authentication',
    title: 'Building a Secure Authentication System in NestJS',
    description:
      'After the foundation, the first real feature is always: "Who is allowed to access the system?" Learn how to build JWT authentication with bcrypt password hashing and production-grade security.',
    content: `# 🔐 Stage 02 — Building a Secure Authentication System in NestJS

After setting up the foundation in Stage 01, the first real feature is always:

**"Who is allowed to access the system?"**

This is where most security vulnerabilities begin.

So I didn't rush it.

## 🧠 Why Authentication First?

Without authentication:

❌ Anyone can access your data  
❌ No user separation  
❌ No permissions system possible  
❌ Security nightmare

With proper authentication:

✅ Only verified users get access  
✅ Foundation for authorization  
✅ Audit trail of actions  
✅ Production-ready security

## ⚙️ What I Built

Instead of using a library that does "magic", I built it from scratch to understand every piece:

✅ User registration  
✅ Login system  
✅ JWT token generation  
✅ Password hashing with bcrypt  
✅ Input validation using DTOs  
✅ Passport.js integration

## 🔑 Key Concepts

Before diving into code, let's understand the core concepts.

### 1. JWT Authentication Flow

\`\`\`
User logs in → Server verifies credentials → Issues JWT token
User sends token with requests → Server verifies token → Grants access
\`\`\`

**Why JWT?**

✅ Stateless (no session storage)  
✅ Scalable across servers  
✅ Contains user information  
✅ Industry standard

### 2. Password Security

**Rule #1:** Passwords are NEVER stored as plain text.

Instead:

✅ Hashed using bcrypt  
✅ Compared securely during login  
✅ 10 salt rounds (2^10 iterations)

### 3. Clean Architecture

**Thin Controller:**

\`\`\`typescript
return this.authService.login(dto);
\`\`\`

**Thick Service:**

- Handles validation
- Checks user existence
- Generates tokens
- All business logic

## 📝 Implementation

### Step 1: User Registration

**Create Registration DTO:**

\`\`\`typescript
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
\`\`\`

**AuthService - Registration Logic:**

\`\`\`typescript
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password with bcrypt (10 salt rounds)
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = await this.generateToken(user.id, user.email);

    return {
      user,
      accessToken: token,
    };
  }
}
\`\`\`

## 🔒 Password Security Deep Dive

**Why bcrypt?**

✅ **Slow by design** → Prevents brute-force  
✅ **Built-in salt** → Each password gets unique hash  
✅ **Future-proof** → Can increase cost factor

**Example:**

\`\`\`typescript
// Same password, different hashes
const hash1 = await bcrypt.hash('password123', 10);
// $2b$10$N9qo8uLO/WgS7VQXM1tHDeP...

const hash2 = await bcrypt.hash('password123', 10);
// $2b$10$K5qp9vMR/XhT8WRYP2uIEfQ...  <- Different!

// Verification (timing-safe)
const isValid = await bcrypt.compare('password123', hash1);
// true
\`\`\`

### Step 3: Login Implementation

**Login DTO:**

\`\`\`typescript
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
\`\`\`

**Login Logic:**

\`\`\`typescript
async login(loginDto: LoginDto) {
  // Find user
  const user = await this.prisma.user.findUnique({
    where: { email: loginDto.email },
  });

  // Generic error (don't reveal if email exists)
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // Check if account is active
  if (!user.isActive) {
    throw new UnauthorizedException('Account is disabled');
  }

  // Generate token
  const token = await this.generateToken(user.id, user.email);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    accessToken: token,
  };
}
\`\`\`

🚨 **Important Security Rule:**

Never reveal specific errors like:

❌ "Email not found"  
❌ "Wrong password"

Always return:

✅ "Invalid credentials"

**Why?** Prevents user enumeration attacks.

### Step 4: JWT Token Generation

\`\`\`typescript
**Token Structure:**

\`\`\`
header.payload.signature
\`\`\`

- **Header:** Token type and algorithm (HS256)
- **Payload:** Claims (sub, email, iat, exp)
- **Signature:** HMAC ensures integrity

### Step 5: Passport JWT Strategy

**Why Passport?**

✅ Industry standard  
✅ Multiple auth strategies  
✅ NestJS integration  
✅ Battle-tested

**Create JWT Strategy
    email,
  };

  return this.jwtService.signAsync(payload, {
    secret: this.configService.get('JWT_SECRET'),
    expiresIn: '15m',  // Short-lived for security
  } as any);
}
\`\`\`

## 5. Passport JWT Strategy

**Create JWT Strategy (src/auth/strategies/jwt.strategy.ts):**

\`\`\`typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Token is valid, now check if user still exists
    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;  // Attached to request.user
  }
}
\`\`\`

## 6. Protecting Routes

**Create JWT Guard:**

\`\`\`typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
\`\`\`

**Use in Controllers:**

\`\`\`typescript
@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;  // Populated by JwtStrategy
  }
}
\`\`\`

## 🧪 Testing

**Register a user:**

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "alice@example.com",
    "password": "password123",
    "name": "Alice"
  }'
\`\`\`

**Login:**

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
\`\`\`

**Access protected route:**

\`\`\`bash
curl -X GET http://localhost:3000/api/v1/profile \\
  -H "Authorization: Bearer <your-token>"
\`\`\`

## 🔐 Security Best Practices I Followed

1. **Never store plain-text passwords** → Always hash
2. **Generic error messages** → Don't reveal if email exists
3. **Short-lived tokens** → 15 minutes for access tokens
4. **Validate on every request** → Check user still exists
5. **HTTPS only in production** → Prevent token interception
6. **Strong password requirements** → Minimum 8 characters

## ⚠️ Common Security Mistakes I Avoided

❌ Storing passwords in plain text  
❌ Revealing "Email not found" vs "Wrong password"  
❌ Long-lived tokens (30 days)  
❌ Not checking if user is still active  
❌ Weak password requirements  
❌ Missing input validation

## 🏁 Result

A secure, production-ready authentication system:

✅ **Stateless** → Scales horizontally  
✅ **Scalable** → Works across multiple servers  
✅ **Secure** → Industry best practices  
✅ **Easy to extend** → Foundation for authorization

## 🚀 What's Next?

In **Stage 03**, I'll build:

- Refresh tokens (long-lived sessions)
- Token rotation (security)
- Logout functionality
- Custom decorators

## 💭 Final Thought

**"Authentication is not just about logging in. It's about trust."**

Most developers treat it as a checkbox.

Senior engineers build it as a fortress.

**GitHub**: [enterprise-workflow-engine](https://github.com/Attar74/enterprise-workflow-engine)`,
    date: '2025-12-18',
    author: 'Attar',
    tags: ['NestJS', 'JWT', 'Authentication', 'Security', 'Passport.js'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '10 min read',
  },
  {
    id: 'nestjs-refresh-tokens',
    title: 'Refresh Tokens & Session Management in NestJS',
    description:
      'JWT tokens expire quickly. So how do users stay logged in? Learn token rotation, secure logout, and session management with refresh tokens stored in the database.',
    content: `# 🔄 Refresh Tokens & Session Management in NestJS

## 🧠 The Problem

JWT tokens expire quickly (15 minutes).

**So how do users stay logged in?**

Asking users to re-login every 15 minutes = terrible UX.

But long-lived tokens = security risk.

**What's the solution?**

## ✅ The Solution

**Refresh Tokens** — stored in the database for secure session management.

## ⚙️ What I Built

✅ **RefreshToken model** — Database-backed tokens  
✅ **Token rotation** — Security pattern that detects attacks  
✅ **Logout (single device)** — End one session  
✅ **Logout (all devices)** — Nuclear option  
✅ **JwtAuthGuard** — Protect routes  
✅ **@CurrentUser() decorator** — Clean code

## 🔑 Key Insight

**Two types of tokens:**

- **Access token** → Short-lived (15 minutes), stateless
- **Refresh token** → Long-lived (7 days), stored in DB

**Why store refresh tokens in DB?**

✅ Can revoke immediately (logout)  
✅ Track active sessions  
✅ Implement token rotation  
✅ Logout from all devices

**Why NOT store access tokens?**

❌ High-frequency queries (every API call)  
❌ Defeats JWT's stateless benefit  
✅ They expire quickly anyway (15min)

## 📦 Implementation

### Step 1: Database Schema

\`\`\`prisma
model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  expiresAt DateTime
  isRevoked Boolean  @default(false)
  revokedAt DateTime?
  
  userAgent String?
  ipAddress String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, token, expiresAt])
  @@map("refresh_tokens")
}
\`\`\`

**Why store refresh tokens but not access tokens?**

| Token Type | Stored? | Why? |
|------------|---------|------|
| **Access Token** | ❌ No | Short-lived (15m), stateless, high-frequency |
| **Refresh Token** | ✅ Yes | Long-lived (7d), need revocation, infrequent use |

## 2. Token Generation

\`\`\`typescript
async generateAccessToken(userId: string, email: string): Promise<string> {
  const payload = { sub: userId, email };
  
  return this.jwtService.signAsync(payload, {
    secret: this.configService.get('JWT_SECRET'),
    expiresIn: '15m',  // Short-lived
  } as any);
}

async generateRefreshToken(userId: string): Promise<string> {
  const payload = { sub: userId, type: 'refresh' };
  
  const refreshToken = await this.jwtService.signAsync(payload, {
    secret: this.configService.get('JWT_REFRESH_SECRET'),
    expiresIn: '7d',  // Long-lived
  } as any);

  // Store in database
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await this.prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt,
    },
  });

  return refreshToken;
}
\`\`\`

## 3. Token Rotation (Security Critical!)

**Without Rotation** ❌:

\`\`\`
1. User logs in → Gets refresh token
2. Attacker steals refresh token
3. Attacker uses token → Gets access token ✅
4. Legitimate user uses token → Gets access token ✅
5. Both can access FOREVER → No detection! 🚨
\`\`\`

**With Rotation** ✅:

\`\`\`
1. User logs in → Gets refresh token
2. Attacker steals refresh token
3. Attacker uses token → Gets NEW tokens, old revoked
4. Legitimate user tries old token → REJECTED
5. System detects reuse → SECURITY ALERT! 🚨
\`\`\`

**Implementation:**

\`\`\`typescript
async refreshAccessToken(refreshToken: string) {
  try {
    // 1. Verify token signature
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    } as any);

    // 2. Check token exists in database
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // 3. Check if revoked
    if (storedToken.isRevoked) {
      // Token reuse detected! Possible attack!
      await this.logoutAll(storedToken.userId);
      throw new UnauthorizedException('Token reuse detected');
    }

    // 4. Check expiration
    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // 5. REVOKE OLD TOKEN (rotation)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
      },
    });

    // 6. Generate NEW tokens
    const newAccessToken = await this.generateAccessToken(
      storedToken.user.id,
      storedToken.user.email,
    );
    const newRefreshToken = await this.generateRefreshToken(
      storedToken.user.id,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    throw new UnauthorizedException('Invalid refresh token');
  }
}
\`\`\`

## 4. Logout Implementation

**Single Device Logout:**

\`\`\`typescript
async logout(refreshToken: string) {
  const storedToken = await this.prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken) {
    throw new NotFoundException('Token not found');
  }

  await this.prisma.refreshToken.update({
    where: { id: storedToken.id },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
    },
  });

  return { message: 'Logged out successfully' };
}
\`\`\`

**Logout All Devices:**

\`\`\`typescript
async logoutAll(userId: string) {
  const count = await this.prisma.refreshToken.count({
    where: {
      userId,
      isRevoked: false,
    },
  });

  await this.prisma.refreshToken.updateMany({
    where: {
      userId,
      isRevoked: false,
    },
    data: {
      isRevoked: true,
      revokedAt: new Date(),
    },
  });

  return {
    message: \`Logged out from all devices (\${count} sessions)\`,
  };
}
\`\`\`

## 5. Custom @CurrentUser Decorator

**Before:**

\`\`\`typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  return req.user;  // Verbose, no type safety
}
\`\`\`

**After:**

\`\`\`typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: User) {
  return user;  // Clean, type-safe!
}
\`\`\`

**Implementation:**

\`\`\`typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
\`\`\`

**Advanced Usage:**

\`\`\`typescript
// Get full user
@Get('profile')
getProfile(@CurrentUser() user: User) { }

// Get specific field
@Get('email')
getEmail(@CurrentUser('email') email: string) { }

@Delete('account')
deleteAccount(@CurrentUser('id') userId: string) { }
\`\`\`

## 6. API Endpoints

\`\`\`typescript
@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Returns both tokens
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(
      refreshTokenDto.refreshToken,
    );
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.logout(refreshTokenDto.refreshToken);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  async logoutAll(@CurrentUser('id') userId: string) {
    return this.authService.logoutAll(userId);
  }
}
\`\`\`

## Testing Flow

\`\`\`bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"alice@example.com","password":"password123"}'

# Response:
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG..."
}

# 2. Wait 15 minutes (access token expires)

# 3. Refresh tokens
curl -X POST http://localhost:3000/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{"refreshToken":"eyJhbG..."}'

# Response: New tokens
{
  "accessToken": "eyJNew...",
  "refreshToken": "eyJNew..."
}

# 4. Logout
curl -X POST http://localhost:3000/auth/logout \\
  -H "Authorization: Bearer <access-token>" \\
  -d '{"refreshToken":"eyJNew..."}'
\`\`\`

## 🔥 Security Upgrade: Token Rotation

**The killer feature:**

\`\`\`
Old token → revoked
New token → issued
\`\`\`

**Why this matters:**

Token reuse = Attack detected! 🚨

## 🏁 Result

**Secure session management:**

✅ Secure sessions with rotation  
✅ Device tracking  
✅ Full logout control  
✅ Attack detection (token reuse)  
✅ Audit trail of all sessions

## 🚀 What's Next?

In the next post, I'll build **Role-Based Access Control (RBAC)** to control what authenticated users can actually do.

## 💭 Final Thought

**"Security isn't just about who gets in. It's about who stays in — and for how long."**

Most developers stop at login.

Senior engineers build session management.

**GitHub**: [enterprise-workflow-engine](https://github.com/Attar74/enterprise-workflow-engine)`,
    date: '2026-01-08',
    author: 'Attar',
    tags: ['NestJS', 'JWT', 'Refresh Tokens', 'Security', 'Authentication'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '11 min read',
  },
  {
    id: 'nestjs-rbac-authorization',
    title: 'Building Role-Based Access Control (RBAC) in NestJS',
    description:
      'Implement a comprehensive RBAC system with a 5-tier role hierarchy, fixed permissions, and authorization guards for fine-grained access control.',
    content: `# Building Role-Based Access Control (RBAC) in NestJS

## Introduction

Authentication tells you **who the user is**. Authorization tells you **what they can do**. Let's build a production-grade RBAC system.

## What We'll Build

- ✅ 5-tier role hierarchy
- ✅ Fixed permission sets per role
- ✅ @Roles() decorator
- ✅ @RequirePermissions() decorator
- ✅ RolesGuard and PermissionsGuard
- ✅ Complete Users module with RBAC

## 1. Role Hierarchy

\`\`\`prisma
enum UserRole {
  SUPER_ADMIN  // Level 5 - Full system access
  ADMIN        // Level 4 - Organization management
  MANAGER      // Level 3 - Team/project management
  MEMBER       // Level 2 - Standard user
  GUEST        // Level 1 - Read-only access
}
\`\`\`

**Role Levels:**

\`\`\`typescript
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  SUPER_ADMIN: 5,
  ADMIN: 4,
  MANAGER: 3,
  MEMBER: 2,
  GUEST: 1,
};
\`\`\`

## 2. Permission System

**Permission Format:** \`<resource>:<action>\`

\`\`\`typescript
export const PERMISSIONS = {
  ALL: '*',  // Wildcard for SUPER_ADMIN
  
  // Users
  USERS_READ: 'users:read',
  USERS_CREATE: 'users:create',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
  
  // Projects
  PROJECTS_READ: 'projects:read',
  PROJECTS_CREATE: 'projects:create',
  PROJECTS_UPDATE: 'projects:update',
  PROJECTS_DELETE: 'projects:delete',
  
  // Tasks
  TASKS_READ: 'tasks:read',
  TASKS_CREATE: 'tasks:create',
  TASKS_UPDATE: 'tasks:update',
  TASKS_DELETE: 'tasks:delete',
} as const;
\`\`\`

## 3. Role-Permission Mapping

\`\`\`typescript
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: ['*'],  // All permissions
  
  ADMIN: [
    'users:read',
    'users:create',
    'users:update',
    'users:delete',
    'projects:read',
    'projects:create',
    'projects:update',
    'projects:delete',
    'tasks:read',
    'tasks:create',
    'tasks:update',
    'tasks:delete',
  ],
  
  MANAGER: [
    'users:read',
    'projects:read',
    'projects:create',
    'projects:update',
    'tasks:read',
    'tasks:create',
    'tasks:update',
    'tasks:delete',
  ],
  
  MEMBER: [
    'projects:read',
    'tasks:read',
    'tasks:create',
    'tasks:update',
  ],
  
  GUEST: [
    'projects:read',
    'tasks:read',
  ],
};
\`\`\`

## 4. @Roles() Decorator

\`\`\`typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => 
  SetMetadata(ROLES_KEY, roles);
\`\`\`

**Usage:**

\`\`\`typescript
@Controller('users')
export class UsersController {
  // Only SUPER_ADMIN and ADMIN can access
  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
\`\`\`

## 5. RolesGuard

\`\`\`typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No decorator = allow all authenticated users
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Check role hierarchy
    const userLevel = ROLE_HIERARCHY[user.role];
    const hasAccess = requiredRoles.some(
      (role) => userLevel >= ROLE_HIERARCHY[role]
    );

    if (!hasAccess) {
      throw new ForbiddenException(
        \`Access denied: Requires one of roles [\${requiredRoles.join(', ')}]\`
      );
    }

    return true;
  }
}
\`\`\`

**How it works:**

\`\`\`
Route requires: MANAGER (level 3)

✅ SUPER_ADMIN (5 >= 3) → Access granted
✅ ADMIN (4 >= 3) → Access granted
✅ MANAGER (3 >= 3) → Access granted
❌ MEMBER (2 < 3) → Access denied
❌ GUEST (1 < 3) → Access denied
\`\`\`

## 6. @RequirePermissions() Decorator

\`\`\`typescript
export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
\`\`\`

**Usage:**

\`\`\`typescript
@Get()
@RequirePermissions(PERMISSIONS.USERS_READ)
getAllUsers() {
  return this.usersService.findAll();
}

@Delete(':id')
@RequirePermissions(PERMISSIONS.USERS_DELETE)
deleteUser(@Param('id') id: string) {
  return this.usersService.remove(id);
}
\`\`\`

## 7. PermissionsGuard

\`\`\`typescript
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Get user's permissions from role
    const userPermissions = ROLE_PERMISSIONS[user.role];

    // SUPER_ADMIN has wildcard
    if (userPermissions.includes('*')) {
      return true;
    }

    // Check if user has ALL required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        \`Access denied: Requires permissions [\${requiredPermissions.join(', ')}]\`
      );
    }

    return true;
  }
}
\`\`\`

## 8. Complete Controller Example

\`\`\`typescript
@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Any authenticated user
  @Get('me')
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  // Requires users:read permission
  @Get()
  @RequirePermissions(PERMISSIONS.USERS_READ)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @RequirePermissions(PERMISSIONS.USERS_READ)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Requires users:update permission
  @Patch(':id')
  @RequirePermissions(PERMISSIONS.USERS_UPDATE)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // SUPER_ADMIN only (users:delete permission)
  @Delete(':id')
  @RequirePermissions(PERMISSIONS.USERS_DELETE)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
\`\`\`

## 9. Testing Authorization

\`\`\`bash
# Login as MEMBER
TOKEN_MEMBER=$(curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"member@example.com","password":"password"}' \\
  | jq -r '.accessToken')

# Try to delete user (should fail)
curl -X DELETE http://localhost:3000/users/some-id \\
  -H "Authorization: Bearer $TOKEN_MEMBER"

# Response: 403 Forbidden
{
  "statusCode": 403,
  "message": "Access denied: Requires permissions [users:delete]"
}

# Login as ADMIN
TOKEN_ADMIN=$(curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@example.com","password":"password"}' \\
  | jq -r '.accessToken')

# Delete user (should succeed)
curl -X DELETE http://localhost:3000/users/some-id \\
  -H "Authorization: Bearer $TOKEN_ADMIN"

# Response: 200 OK
{
  "message": "User deleted successfully"
}
\`\`\`

## Permission vs Role Check Comparison

| Scenario | @Roles() | @RequirePermissions() |
|----------|----------|----------------------|
| **Clarity** | Less clear | Self-documenting |
| **Flexibility** | Coarse-grained | Fine-grained |
| **Example** | \`@Roles(UserRole.ADMIN)\` | \`@RequirePermissions('users:delete')\` |
| **When to use** | Simple role checks | Explicit action requirements |

**Recommendation:** Prefer \`@RequirePermissions()\` for better semantics.

## Key Takeaways

1. **Fixed permissions per role**: Simple, predictable
2. **Role hierarchy**: Higher roles inherit access
3. **Permission-based guards**: Fine-grained control
4. **Decorator composition**: Guards stack naturally
5. **Clear error messages**: Tell users why access denied

## What's Next?

Next, we'll implement multi-tenancy with organizations, allowing users to belong to multiple workspaces with different roles in each.`,
    date: '2026-01-22',
    author: 'Attar',
    tags: ['NestJS', 'RBAC', 'Authorization', 'Security', 'Permissions'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '13 min read',
  },
  {
    id: 'nestjs-multi-tenancy-organizations',
    title: 'Multi-Tenancy Architecture with Organizations in NestJS',
    description:
      'Build a production-grade multi-tenancy system where users can create and belong to multiple organizations with organization-scoped roles and permissions.',
    content: `# Multi-Tenancy Architecture with Organizations in NestJS

## What is Multi-Tenancy?

**Multi-tenancy** is a software architecture where a single application serves multiple tenants (organizations) with complete data isolation.

**Examples:**
- **Slack**: Different workspaces
- **Linear**: Different teams  
- **GitHub**: Different organizations
- **Jira**: Different project spaces

## Architecture Pattern: Shared Database

We'll use the **shared database pattern** where all organizations share one database, isolated by \`organizationId\`.

\`\`\`
┌─────────────────────────────────────────────────────┐
│              PostgreSQL Database                     │
├─────────────────────────────────────────────────────┤
│  Organizations Table                                 │
│  ├─ Organization A (id: org-a)                      │
│  ├─ Organization B (id: org-b)                      │
│  └─ Organization C (id: org-c)                      │
│                                                      │
│  Projects Table (has organizationId)                │
│  ├─ Project 1 → Organization A                      │
│  ├─ Project 2 → Organization A                      │
│  └─ Project 3 → Organization B                      │
│                                                      │
│  OrganizationMembers (junction table)               │
│  ├─ Alice → Org A (ADMIN)                          │
│  ├─ Alice → Org B (MEMBER)                         │
│  └─ Bob → Org A (MEMBER)                           │
└─────────────────────────────────────────────────────┘
\`\`\`

## 1. Database Schema

\`\`\`prisma
model Organization {
  id          String   @id @default(uuid())
  name        String
  slug        String   // URL-friendly (acme-corp)
  description String?
  logoUrl     String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     OrganizationMember[]
  projects    Project[]
  
  @@unique([slug])
  @@map("organizations")
}

model OrganizationMember {
  userId         String
  organizationId String
  role           UserRole  // Organization-scoped role
  joinedAt       DateTime  @default(now())

  user         User         @relation(fields: [userId])
  organization Organization @relation(fields: [organizationId])

  @@id([userId, organizationId])
  @@index([userId])
  @@index([organizationId])
  @@map("organization_members")
}
\`\`\`

**Key Design:**
- **Composite primary key** (\`userId\`, \`organizationId\`) prevents duplicate memberships
- **Slug** for clean URLs: \`/orgs/acme-corp/projects\`
- **Organization-scoped roles**: User can be ADMIN in Org A, MEMBER in Org B

## 2. Create Organization

\`\`\`typescript
async create(
  createOrganizationDto: CreateOrganizationDto,
  creatorId: string
) {
  return this.prisma.$transaction(async (tx) => {
    // Create organization
    const organization = await tx.organization.create({
      data: {
        name: createOrganizationDto.name,
        slug: createOrganizationDto.slug,
        description: createOrganizationDto.description,
        logoUrl: createOrganizationDto.logoUrl,
      },
    });

    // Add creator as SUPER_ADMIN
    await tx.organizationMember.create({
      data: {
        userId: creatorId,
        organizationId: organization.id,
        role: UserRole.SUPER_ADMIN,
      },
    });

    return organization;
  });
}
\`\`\`

**Why transaction?**
- Ensures creator is always added as admin
- Prevents orphaned organizations (org without any members)
- All-or-nothing operation

## 3. OrganizationGuard

\`\`\`typescript
@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orgId = request.params.orgId || request.body.organizationId;

    if (!orgId) {
      throw new BadRequestException('Organization ID is required');
    }

    // Load organization with membership check
    const organization = await this.prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    if (!organization.isActive) {
      throw new ForbiddenException('Organization is inactive');
    }

    if (organization.members.length === 0) {
      throw new ForbiddenException('You are not a member of this organization');
    }

    // Attach to request for use in controllers
    request.organization = {
      ...organization,
      currentUserRole: organization.members[0].role,
    };

    return true;
  }
}
\`\`\`

## 4. @CurrentOrganization Decorator

\`\`\`typescript
export const CurrentOrganization = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const organization = request.organization;

    return data ? organization?.[data] : organization;
  },
);
\`\`\`

**Usage:**

\`\`\`typescript
@Get(':orgId/projects')
@UseGuards(JwtAuthGuard, OrganizationGuard)
getProjects(
  @CurrentOrganization() org: Organization,
  @CurrentOrganization('currentUserRole') role: UserRole,
) {
  console.log('Org:', org.name);
  console.log('User role in this org:', role);
  return this.projectsService.findAll(org.id);
}
\`\`\`

## 5. Invitation System

\`\`\`prisma
enum InvitationStatus {
  PENDING
  ACCEPTED
  EXPIRED
  REVOKED
}

model Invitation {
  id             String           @id @default(uuid())
  email          String
  token          String           @unique
  role           UserRole
  status         InvitationStatus @default(PENDING)
  expiresAt      DateTime
  organizationId String
  inviterId      String
  
  organization Organization @relation(fields: [organizationId])
  inviter      User         @relation(fields: [inviterId])
  
  createdAt DateTime @default(now())
  
  @@index([organizationId, status])
  @@map("invitations")
}
\`\`\`

**Invite Member:**

\`\`\`typescript
async inviteMember(
  organizationId: string,
  inviteDto: InviteMemberDto,
  inviterId: string,
) {
  // Check if already a member
  const existingMember = await this.prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: inviteDto.userId,
        organizationId,
      },
    },
  });

  if (existingMember) {
    throw new ConflictException('User is already a member');
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);  // 7 days

  // Create invitation
  const invitation = await this.prisma.invitation.create({
    data: {
      email: inviteDto.email,
      token,
      role: inviteDto.role,
      organizationId,
      inviterId,
      expiresAt,
    },
  });

  // Send email (pseudo-code)
  await this.emailService.send({
    to: inviteDto.email,
    subject: 'You've been invited!',
    body: \`Click here: /invitations/accept?token=\${token}\`,
  });

  return invitation;
}
\`\`\`

**Accept Invitation:**

\`\`\`typescript
async acceptInvitation(token: string, userId: string) {
  const invitation = await this.prisma.invitation.findUnique({
    where: { token },
    include: { organization: true },
  });

  if (!invitation || invitation.status !== 'PENDING') {
    throw new BadRequestException('Invalid or expired invitation');
  }

  if (invitation.expiresAt < new Date()) {
    await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: InvitationStatus.EXPIRED },
    });
    throw new BadRequestException('Invitation has expired');
  }

  // Add to organization
  await this.prisma.$transaction([
    this.prisma.organizationMember.create({
      data: {
        userId,
        organizationId: invitation.organizationId,
        role: invitation.role,
      },
    }),
    this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: InvitationStatus.ACCEPTED },
    }),
  ]);

  return { message: 'Successfully joined organization' };
}
\`\`\`

## 6. Data Isolation Strategy

**Every query MUST filter by organizationId:**

\`\`\`typescript
// ✅ CORRECT
const projects = await this.prisma.project.findMany({
  where: {
    organizationId: orgId,  // Always filter!
    isActive: true,
  },
});

// ❌ WRONG - Data leak!
const projects = await this.prisma.project.findMany({
  where: {
    isActive: true,  // Missing orgId filter!
  },
});
\`\`\`

## 7. API Endpoints

\`\`\`typescript
@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  // Create organization (any user)
  @Post()
  create(
    @Body() dto: CreateOrganizationDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.orgsService.create(dto, userId);
  }

  // List user's organizations
  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.orgsService.findAll(userId);
  }

  // Get specific organization
  @Get(':orgId')
  @UseGuards(OrganizationGuard)
  findOne(@CurrentOrganization() org: Organization) {
    return org;
  }

  // Update organization (ADMIN+)
  @Patch(':orgId')
  @UseGuards(OrganizationGuard)
  update(
    @Param('orgId') orgId: string,
    @Body() dto: UpdateOrganizationDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.orgsService.update(orgId, dto, userId);
  }

  // Invite member (ADMIN+)
  @Post(':orgId/members/invite')
  @UseGuards(OrganizationGuard)
  inviteMember(
    @Param('orgId') orgId: string,
    @Body() dto: InviteMemberDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.orgsService.inviteMember(orgId, dto, userId);
  }
}
\`\`\`

## 8. Testing

\`\`\`bash
# Login as Alice
TOKEN=$(curl -X POST http://localhost:3000/auth/login \\
  -d '{"email":"alice@example.com","password":"password"}' | jq -r '.accessToken')

# Create organization
ORG=$(curl -X POST http://localhost:3000/organizations \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"name":"TechCorp","slug":"techcorp"}')

ORG_ID=$(echo $ORG | jq -r '.id')

# List Alice's organizations
curl -X GET http://localhost:3000/organizations \\
  -H "Authorization: Bearer $TOKEN"

# Get organization details
curl -X GET http://localhost:3000/organizations/$ORG_ID \\
  -H "Authorization: Bearer $TOKEN"
\`\`\`

## Key Takeaways

1. **Shared database pattern**: Simple, cost-effective
2. **Organization-scoped roles**: User can have different roles per org
3. **Data isolation**: Always filter by organizationId
4. **Guards stack**: JwtAuthGuard → OrganizationGuard
5. **Invitation system**: Secure token-based invites

## What's Next?

Next, we'll build the Projects module within organizations, implementing project-level RBAC and nested multi-tenancy.`,
    date: '2026-02-03',
    author: 'Attar',
    tags: [
      'NestJS',
      'Multi-Tenancy',
      'Organizations',
      'Architecture',
      'Database',
    ],
    imageUrl: '/images/workflow-engine.png',
    readTime: '14 min read',
  },
  {
    id: 'nestjs-projects-tasks-modules',
    title: 'Building Projects and Tasks Modules with Nested RBAC',
    description:
      'Implement project and task management with three-level hierarchy (Organizations → Projects → Tasks), dual authorization, and powerful filtering.',
    content: `# Building Projects and Tasks Modules with Nested RBAC

## Three-Level Hierarchy

\`\`\`
Organizations (Tenant)
└── Projects (Work Container)
    └── Tasks (Work Items)
\`\`\`

**Real-world examples:**
- **GitHub**: Organizations → Repositories → Issues
- **Jira**: Organizations → Projects → Tickets
- **Linear**: Workspaces → Teams → Issues

## 1. Projects Database Schema

\`\`\`prisma
enum ProjectStatus {
  PLANNING
  IN_PROGRESS
  ON_HOLD
  COMPLETED
  ARCHIVED
}

model Project {
  id             String        @id @default(uuid())
  name           String
  slug           String
  description    String?
  status         ProjectStatus @default(PLANNING)
  isPublic       Boolean       @default(false)
  isActive       Boolean       @default(true)
  
  organizationId String
  organization   Organization  @relation(fields: [organizationId])
  
  members        ProjectMember[]
  tasks          Task[]
  
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@unique([organizationId, slug])
  @@index([organizationId])
  @@map("projects")
}

model ProjectMember {
  userId    String
  projectId String
  role      UserRole  // Project-scoped role
  joinedAt  DateTime  @default(now())

  user    User    @relation(fields: [userId])
  project Project @relation(fields: [projectId])

  @@id([userId, projectId])
  @@index([projectId])
  @@map("project_members")
}
\`\`\`

## 2. Tasks Database Schema

\`\`\`prisma
enum TaskStatus {
  TODO
  IN_PROGRESS
  IN_REVIEW
  DONE
  CANCELLED
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model Task {
  id          String       @id @default(uuid())
  title       String
  description String?
  status      TaskStatus   @default(TODO)
  priority    TaskPriority @default(MEDIUM)
  
  projectId      String
  organizationId String  // Denormalized for performance
  creatorId      String
  assigneeId     String?
  
  dueDate     DateTime?
  startedAt   DateTime?
  completedAt DateTime?
  
  project     Project      @relation(fields: [projectId])
  creator     User         @relation("TasksCreated", fields: [creatorId])
  assignee    User?        @relation("TasksAssigned", fields: [assigneeId])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([projectId])
  @@index([organizationId])
  @@index([assigneeId])
  @@index([status])
  @@map("tasks")
}
\`\`\`

**Why denormalize organizationId?**
- Organization-wide queries are common (dashboards, reports)
- Without: Requires JOIN through projects table
- With: Direct query on indexed field
- **Performance gain**: 2-3x faster

## 3. Dual Authorization

\`\`\`typescript
Request Flow:
┌──────────────────────────────────────────────────────┐
│ 1. JwtAuthGuard → Verifies token                     │
└──────────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────┐
│ 2. OrganizationGuard → Verify org membership         │
└──────────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────┐
│ 3. ProjectGuard → Verify project membership          │
│    - Org admins bypass project membership check      │
└──────────────────────────────────────────────────────┘
\`\`\`

**ProjectGuard Implementation:**

\`\`\`typescript
@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const organization = request.organization;
    const projectId = request.params.projectId;

    if (!projectId) {
      throw new BadRequestException('Project ID is required');
    }

    // Load project
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: {
          where: { userId: user.id },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Verify project belongs to organization
    if (project.organizationId !== organization.id) {
      throw new ForbiddenException('Project does not belong to this organization');
    }

    // Org admins can access any project
    const isOrgAdmin = ['SUPER_ADMIN', 'ADMIN'].includes(
      organization.currentUserRole,
    );

    if (!isOrgAdmin && project.members.length === 0) {
      throw new ForbiddenException('You are not a member of this project');
    }

    // Attach to request
    request.project = {
      ...project,
      currentUserRole: project.members[0]?.role || organization.currentUserRole,
    };

    return true;
  }
}
\`\`\`

## 4. Create Task with Auto-Assignment

\`\`\`typescript
async create(
  projectId: string,
  creatorId: string,
  createTaskDto: CreateTaskDto,
) {
  // Validate project exists
  const project = await this.prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new NotFoundException('Project not found');
  }

  // Validate assignee (if provided)
  if (createTaskDto.assigneeId) {
    await this.validateProjectMember(projectId, createTaskDto.assigneeId);
  }

  // Create task
  const task = await this.prisma.task.create({
    data: {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status || TaskStatus.TODO,
      priority: createTaskDto.priority || TaskPriority.MEDIUM,
      projectId,
      organizationId: project.organizationId,  // Denormalized
      creatorId,
      assigneeId: createTaskDto.assigneeId,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  return task;
}
\`\`\`

## 5. Task Status Workflow

\`\`\`typescript
Valid Transitions:
TODO → IN_PROGRESS → IN_REVIEW → DONE
  ↓         ↓            ↓
CANCELLED ← ← ← ← ← ← ← ←
\`\`\`

**Enforce with Service Logic:**

\`\`\`typescript
async updateStatus(taskId: string, status: TaskStatus, userId: string) {
  const task = await this.findOne(taskId, userId);

  // Validate transition
  const validTransitions: Record<TaskStatus, TaskStatus[]> = {
    [TaskStatus.TODO]: [TaskStatus.IN_PROGRESS, TaskStatus.CANCELLED],
    [TaskStatus.IN_PROGRESS]: [TaskStatus.IN_REVIEW, TaskStatus.TODO, TaskStatus.CANCELLED],
    [TaskStatus.IN_REVIEW]: [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.CANCELLED],
    [TaskStatus.DONE]: [TaskStatus.IN_REVIEW],
    [TaskStatus.CANCELLED]: [TaskStatus.TODO],
  };

  if (!validTransitions[task.status].includes(status)) {
    throw new BadRequestException(
      \`Cannot transition from \${task.status} to \${status}\`
    );
  }

  // Business rules
  if (status === TaskStatus.IN_PROGRESS && !task.assigneeId) {
    throw new BadRequestException('Task must be assigned before starting work');
  }

  // Auto-set timestamps
  const updateData: any = { status };
  
  if (status === TaskStatus.IN_PROGRESS && !task.startedAt) {
    updateData.startedAt = new Date();
  }
  
  if (status === TaskStatus.DONE) {
    updateData.completedAt = new Date();
  }

  return this.prisma.task.update({
    where: { id: taskId },
    data: updateData,
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
  });
}
\`\`\`

## 6. Powerful Filtering

\`\`\`typescript
export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @IsOptional()
  @IsBoolean()
  assignedToMe?: boolean;  // Shortcut filter

  @IsOptional()
  @IsBoolean()
  createdByMe?: boolean;  // Shortcut filter

  @IsOptional()
  @IsString()
  search?: string;  // Full-text search

  @IsOptional()
  @IsDateString()
  dueBefore?: string;

  @IsOptional()
  @IsDateString()
  dueAfter?: string;

  @IsOptional()
  @IsIn(['newest', 'oldest', 'priority', 'dueDate'])
  sortBy?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  take?: number;
}
\`\`\`

**Implementation:**

\`\`\`typescript
async findAll(
  projectId: string,
  userId: string,
  filters: FilterTasksDto = {},
) {
  const where: any = { projectId };

  // Status filter
  if (filters.status) {
    where.status = filters.status;
  }

  // Priority filter
  if (filters.priority) {
    where.priority = filters.priority;
  }

  // Assignee filters
  if (filters.assignedToMe) {
    where.assigneeId = userId;
  } else if (filters.assigneeId) {
    where.assigneeId = filters.assigneeId;
  }

  // Creator filter
  if (filters.createdByMe) {
    where.creatorId = userId;
  }

  // Search
  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  // Date range
  if (filters.dueBefore || filters.dueAfter) {
    where.dueDate = {};
    if (filters.dueBefore) where.dueDate.lte = new Date(filters.dueBefore);
    if (filters.dueAfter) where.dueDate.gte = new Date(filters.dueAfter);
  }

  // Sorting
  let orderBy: any = { createdAt: 'desc' };
  if (filters.sortBy === 'oldest') orderBy = { createdAt: 'asc' };
  if (filters.sortBy === 'priority') orderBy = { priority: 'desc' };
  if (filters.sortBy === 'dueDate') orderBy = { dueDate: 'asc' };

  // Query
  const tasks = await this.prisma.task.findMany({
    where,
    orderBy,
    skip: filters.skip || 0,
    take: filters.take || 20,
    include: {
      creator: { select: { id: true, name: true } },
      assignee: { select: { id: true, name: true } },
    },
  });

  return { data: tasks };
}
\`\`\`

## 7. API Usage Examples

\`\`\`bash
# Create task
POST /organizations/{orgId}/projects/{projectId}/tasks
{
  "title": "Fix login bug",
  "description": "Users can't log in with Google",
  "priority": "HIGH",
  "assigneeId": "user-id",
  "dueDate": "2026-04-30T23:59:59.000Z"
}

# Filter tasks
GET /organizations/{orgId}/projects/{projectId}/tasks?
  status=IN_PROGRESS&
  priority=HIGH&
  assignedToMe=true&
  sortBy=dueDate

# Search tasks
GET /organizations/{orgId}/projects/{projectId}/tasks?
  search=login&
  status=TODO

# Update status
PATCH /organizations/{orgId}/projects/{projectId}/tasks/{taskId}/status
{
  "status": "IN_PROGRESS"
}

# Assign task
PATCH /organizations/{orgId}/projects/{projectId}/tasks/{taskId}/assign
{
  "assigneeId": "user-id"
}
\`\`\`

## Key Takeaways

1. **Three-level hierarchy**: Organizations → Projects → Tasks
2. **Denormalization**: organizationId in tasks for performance
3. **Dual authorization**: Both org AND project membership checked
4. **Status workflow**: State machine prevents invalid transitions
5. **Powerful filtering**: Search, multiple filters, pagination
6. **Automatic timestamps**: startedAt, completedAt managed by service

## What's Next?

In the next article, we'll implement a commenting system with threading, mentions, and soft deletes.`,
    date: '2026-02-19',
    author: 'Attar',
    tags: ['NestJS', 'Projects', 'Tasks', 'CRUD', 'Filtering'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '15 min read',
  },
  {
    id: 'nestjs-comments-system',
    title: 'Building a Commenting System with Threading and Mentions',
    description:
      'Implement a comprehensive commenting system with polymorphic comments, nested replies, @mentions, soft deletes, and advanced filtering.',
    content: `# Building a Commenting System with Threading and Mentions

## Introduction

Comments enable async collaboration and context preservation. Let's build a production-grade commenting system with threading and mentions.

## What We'll Build

- ✅ Polymorphic comments (Task OR Project)
- ✅ Nested threading with configurable depth
- ✅ @username mentions with validation
- ✅ Soft deletes (preserve conversation context)
- ✅ 15-minute edit time limit
- ✅ Advanced filtering and search

## 1. Database Schema

\`\`\`prisma
enum CommentableType {
  TASK
  PROJECT
}

model Comment {
  id          String          @id @default(uuid())
  content     String
  type        CommentableType
  
  // Polymorphic relation (ONE of these is set)
  taskId      String?
  projectId   String?
  
  authorId    String
  parentId    String?  // For threading
  
  deletedAt   DateTime?
  editedAt    DateTime?
  
  task        Task?     @relation(fields: [taskId])
  project     Project?  @relation(fields: [projectId])
  author      User      @relation(fields: [authorId])
  parent      Comment?  @relation("CommentReplies", fields: [parentId])
  replies     Comment[] @relation("CommentReplies")
  mentions    User[]    @relation("CommentMentions")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([taskId, createdAt])
  @@index([projectId, createdAt])
  @@index([authorId])
  @@index([parentId])
  @@map("comments")
}
\`\`\`

**Key Design:**
- **Polymorphic**: taskId XOR projectId (exactly one)
- **Self-relation**: parent/replies for threading
- **Soft delete**: deletedAt preserves conversation
- **Many-to-many**: mentions junction table

## 2. Mention Parsing

\`\`\`typescript
private parseMentions(content: string): string[] {
  const mentionRegex = /@(\\w+)/g;
  const matches = content.match(mentionRegex);
  
  if (!matches) return [];
  
  // Extract username without @
  return [...new Set(matches.map(m => m.slice(1)))];
}

private async validateMentions(
  usernames: string[],
  organizationId: string,
): Promise<string[]> {
  if (usernames.length === 0) return [];

  // Find users in organization
  const users = await this.prisma.user.findMany({
    where: {
      username: { in: usernames },
      organizationMemberships: {
        some: { organizationId },
      },
    },
    select: { id: true },
  });

  return users.map(u => u.id);
}
\`\`\`

**Example:**

\`\`\`typescript
content = "Great work @alice! Can you review @bob's changes?"

parseMentions(content)
// Output: ['alice', 'bob']

validateMentions(['alice', 'bob'], orgId)
// Output: ['user-id-1', 'user-id-2']
// (Only if they're org members)
\`\`\`

## 3. Create Comment with Mentions

\`\`\`typescript
async create(createCommentDto: CreateCommentDto, user: User) {
  const { content, type, taskId, projectId, parentId } = createCommentDto;

  // Validate polymorphic constraint
  if ((taskId && projectId) || (!taskId && !projectId)) {
    throw new BadRequestException(
      'Comment must belong to either a task or a project, not both'
    );
  }

  // Type must match ID
  if (type === CommentableType.TASK && !taskId) {
    throw new BadRequestException('taskId required for TASK comment');
  }
  if (type === CommentableType.PROJECT && !projectId) {
    throw new BadRequestException('projectId required for PROJECT comment');
  }

  // Get organizationId
  let organizationId: string;
  if (taskId) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      select: { organizationId: true },
    });
    organizationId = task.organizationId;
  } else {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { organizationId: true },
    });
    organizationId = project.organizationId;
  }

  // Validate parent comment (if reply)
  if (parentId) {
    const parent = await this.prisma.comment.findUnique({
      where: { id: parentId },
    });

    if (!parent) {
      throw new NotFoundException('Parent comment not found');
    }

    if (parent.taskId !== taskId || parent.projectId !== projectId) {
      throw new BadRequestException(
        'Reply must belong to same resource as parent'
      );
    }
  }

  // Parse and validate mentions
  const mentionUsernames = this.parseMentions(content);
  const mentionUserIds = await this.validateMentions(
    mentionUsernames,
    organizationId,
  );

  // Create comment
  const comment = await this.prisma.comment.create({
    data: {
      content,
      type,
      taskId,
      projectId,
      parentId,
      authorId: user.id,
      mentions: {
        connect: mentionUserIds.map(id => ({ id })),
      },
    },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      mentions: {
        select: { id: true, name: true, username: true },
      },
    },
  });

  return comment;
}
\`\`\`

## 4. Threading with Recursive Loading

\`\`\`typescript
async getReplies(
  commentId: string,
  user: User,
  options: {
    skip?: number;
    take?: number;
    depth?: number;
    includeDeleted?: boolean;
  } = {},
) {
  const { skip = 0, take = 20, depth = 3, includeDeleted = false } = options;

  const comment = await this.findOne(commentId, user);

  const replies = await this.loadRepliesRecursive(
    commentId,
    depth,
    includeDeleted,
  );

  return {
    comment,
    replies: replies.slice(skip, skip + take),
    total: replies.length,
  };
}

private async loadRepliesRecursive(
  parentId: string,
  depth: number,
  includeDeleted: boolean,
): Promise<Comment[]> {
  if (depth === 0) return [];

  const replies = await this.prisma.comment.findMany({
    where: {
      parentId,
      ...(includeDeleted ? {} : { deletedAt: null }),
    },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      mentions: {
        select: { id: true, name: true, username: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  // Load nested replies
  for (const reply of replies) {
    reply.replies = await this.loadRepliesRecursive(
      reply.id,
      depth - 1,
      includeDeleted,
    );
  }

  return replies;
}
\`\`\`

**Example Response:**

\`\`\`json
{
  "comment": {
    "id": "comment-1",
    "content": "What do you think?",
    "author": { "name": "Alice" }
  },
  "replies": [
    {
      "id": "comment-2",
      "content": "Looks good!",
      "author": { "name": "Bob" },
      "replies": [
        {
          "id": "comment-3",
          "content": "Agreed",
          "author": { "name": "Carol" },
          "replies": []
        }
      ]
    }
  ]
}
\`\`\`

## 5. Edit with Time Limit

\`\`\`typescript
async update(
  id: string,
  updateCommentDto: UpdateCommentDto,
  user: User,
) {
  const comment = await this.prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new NotFoundException('Comment not found');
  }

  // Only author can edit
  if (comment.authorId !== user.id) {
    throw new ForbiddenException('You can only edit your own comments');
  }

  // Check if deleted
  if (comment.deletedAt) {
    throw new BadRequestException('Cannot edit deleted comment');
  }

  // 15-minute edit window
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  if (comment.createdAt < fifteenMinutesAgo) {
    throw new ForbiddenException(
      'Comments can only be edited within 15 minutes of creation'
    );
  }

  // Get organizationId
  const organizationId = await this.getCommentOrganizationId(comment);

  // Parse new mentions
  const mentionUsernames = this.parseMentions(updateCommentDto.content);
  const mentionUserIds = await this.validateMentions(
    mentionUsernames,
    organizationId,
  );

  // Update comment
  const updated = await this.prisma.comment.update({
    where: { id },
    data: {
      content: updateCommentDto.content,
      editedAt: new Date(),
      mentions: {
        set: mentionUserIds.map(id => ({ id })),
      },
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      mentions: { select: { id: true, name: true, username: true } },
    },
  });

  return updated;
}
\`\`\`

## 6. Soft Delete

\`\`\`typescript
async remove(id: string, user: User) {
  const comment = await this.prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new NotFoundException('Comment not found');
  }

  const organizationId = await this.getCommentOrganizationId(comment);

  // Check if org admin
  const membership = await this.prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId,
      },
    },
  });

  const isAdmin = ['SUPER_ADMIN', 'ADMIN'].includes(membership?.role);

  // Author or admin can delete
  if (comment.authorId !== user.id && !isAdmin) {
    throw new ForbiddenException(
      'You can only delete your own comments unless you are an admin'
    );
  }

  // Soft delete
  await this.prisma.comment.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return { message: 'Comment deleted successfully' };
}
\`\`\`

**Why Soft Delete?**

\`\`\`
Without soft delete:
Thread:
├── [DELETED - Gap in conversation] ❌
└── Reply: "I agree with @user" ← Lost context

With soft delete:
Thread:
├── [Comment deleted] ✅
└── Reply: "I agree with @user" ← Context preserved
\`\`\`

## 7. Advanced Filtering

\`\`\`typescript
async findAll(
  taskId: string | undefined,
  projectId: string | undefined,
  user: User,
  filters: FilterCommentsDto = {},
) {
  const where: any = {
    deletedAt: null,  // Exclude deleted by default
    parentId: null,   // Top-level only
  };

  if (taskId) where.taskId = taskId;
  if (projectId) where.projectId = projectId;

  // Search
  if (filters.search) {
    where.content = {
      contains: filters.search,
      mode: 'insensitive',
    };
  }

  // Filter by author
  if (filters.authorId) {
    where.authorId = filters.authorId;
  }

  // Filter by mentioned user
  if (filters.mentionedUserId) {
    where.mentions = {
      some: { id: filters.mentionedUserId },
    };
  }

  // Date range
  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
    if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
  }

  // Sorting
  let orderBy: any = { createdAt: 'desc' };
  if (filters.sortBy === CommentSortBy.OLDEST) {
    orderBy = { createdAt: 'asc' };
  } else if (filters.sortBy === CommentSortBy.MOST_REPLIES) {
    // Complex - count replies
    orderBy = { replies: { _count: 'desc' } };
  }

  const comments = await this.prisma.comment.findMany({
    where,
    orderBy,
    skip: filters.skip || 0,
    take: filters.take || 20,
    include: {
      author: { select: { id: true, name: true } },
      mentions: { select: { id: true, name: true, username: true } },
      _count: { select: { replies: true } },
    },
  });

  return { data: comments };
}
\`\`\`

## 8. API Usage

\`\`\`bash
# Create comment
POST /comments
{
  "content": "Great work @alice!",
  "type": "TASK",
  "taskId": "task-id"
}

# Reply to comment
POST /comments
{
  "content": "Thanks @bob!",
  "type": "TASK",
  "taskId": "task-id",
  "parentId": "comment-id"
}

# Get comment with replies (3 levels deep)
GET /comments/:id/replies?depth=3

# Filter comments
GET /comments?
  taskId=task-id&
  search=bug&
  authorId=user-id&
  sortBy=newest

# Edit comment (within 15 minutes)
PATCH /comments/:id
{
  "content": "Updated content"
}

# Delete comment (soft delete)
DELETE /comments/:id
\`\`\`

## Key Takeaways

1. **Polymorphic design**: Comments on tasks OR projects
2. **Threading**: Self-relation with recursive loading
3. **Mentions**: Parse @username, validate org membership
4. **Soft delete**: Preserve conversation context
5. **Edit time limit**: 15-minute window for edits
6. **Advanced filtering**: Search, author, mentions, date range

## What's Next?

In the next article, we'll implement real-time notifications using WebSockets to notify users when mentioned or replied to.`,
    date: '2026-03-07',
    author: 'Attar',
    tags: ['NestJS', 'Comments', 'Threading', 'Mentions', 'Soft Delete'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '14 min read',
  },
  {
    id: 'nestjs-realtime-notifications',
    title: 'Real-time Notifications with WebSockets in NestJS',
    description:
      'Build a production-grade real-time notification system using Socket.io, enabling instant notifications for comments, tasks, and projects.',
    content: `# Real-time Notifications with WebSockets in NestJS

## Why Real-time Notifications?

**Polling (Traditional)** ❌:
\`\`\`
Client: "Any new notifications?" (every 5 seconds)
Server: "No"
Client: "Any new notifications?"
Server: "No"
Client: "Any new notifications?"
Server: "Yes, 1 new!"

Result: Wasteful, 5-second delay
\`\`\`

**WebSockets (Real-time)** ✅:
\`\`\`
Client: [Connected]
Server: [Push] "New mention!"
Client: [Receives instantly]

Result: Efficient, instant delivery
\`\`\`

## What We'll Build

- ✅ WebSocket gateway with Socket.io
- ✅ JWT authentication for connections
- ✅ User-specific rooms for targeted notifications
- ✅ Multi-device support
- ✅ Notification types: mentions, replies, assignments, status changes
- ✅ Integration with Comments, Tasks, and Projects modules

## 1. Database Schema

\`\`\`prisma
enum NotificationType {
  TASK_ASSIGNED
  TASK_STATUS_CHANGED
  COMMENT_MENTION
  COMMENT_REPLY
  PROJECT_ADDED
  PROJECT_ROLE_CHANGED
}

model Notification {
  id          String             @id @default(uuid())
  type        NotificationType
  message     String
  
  recipientId String
  actorId     String?  // Who triggered the notification
  
  // Polymorphic references
  taskId      String?
  commentId   String?
  projectId   String?
  
  readAt      DateTime?
  
  recipient   User     @relation("NotificationsReceived", fields: [recipientId])
  actor       User?    @relation("NotificationsTriggered", fields: [actorId])
  task        Task?    @relation(fields: [taskId])
  comment     Comment? @relation(fields: [commentId])
  project     Project? @relation(fields: [projectId])
  
  createdAt DateTime @default(now())

  @@index([recipientId, readAt])
  @@index([recipientId, createdAt])
  @@map("notifications")
}
\`\`\`

## 2. WebSocket Gateway

\`\`\`typescript
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  namespace: '/notifications',
  cors: { origin: '*' },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, Set<string>>();

  constructor(
    private jwtService: JwtService,
    private notificationsService: NotificationsService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      // Extract JWT from handshake
      const token = client.handshake.auth.token;

      if (!token) {
        client.disconnect();
        return;
      }

      // Verify JWT
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub;

      // Join user's personal room
      client.join(\`user-\${userId}\`);

      // Track connection
      if (!this.connectedUsers.has(userId)) {
        this.connectedUsers.set(userId, new Set());
      }
      this.connectedUsers.get(userId).add(client.id);

      // Send unread count
      const unreadCount = await this.notificationsService.getUnreadCount(userId);
      client.emit('unread_count', { unreadCount });

      console.log(\`User \${userId} connected (socket: \${client.id})\`);
    } catch (error) {
      console.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Remove from tracking
    for (const [userId, sockets] of this.connectedUsers.entries()) {
      if (sockets.has(client.id)) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.connectedUsers.delete(userId);
        }
        console.log(\`User \${userId} disconnected (socket: \${client.id})\`);
        break;
      }
    }
  }

  @SubscribeMessage('mark_as_read')
  async handleMarkAsRead(
    client: Socket,
    payload: { notificationId: string },
  ) {
    const token = client.handshake.auth.token;
    const decoded = await this.jwtService.verifyAsync(token);
    const userId = decoded.sub;

    await this.notificationsService.markAsRead(payload.notificationId, userId);

    client.emit('notification_marked_read', {
      notificationId: payload.notificationId,
    });
  }

  @SubscribeMessage('get_unread_count')
  async handleGetUnreadCount(client: Socket) {
    const token = client.handshake.auth.token;
    const decoded = await this.jwtService.verifyAsync(token);
    const userId = decoded.sub;

    const unreadCount = await this.notificationsService.getUnreadCount(userId);
    client.emit('unread_count', { unreadCount });
  }

  // Called by NotificationsService
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(\`user-\${userId}\`).emit('notification', notification);
  }

  // Update unread count for user
  updateUnreadCount(userId: string, count: number) {
    this.server.to(\`user-\${userId}\`).emit('unread_count', { unreadCount: count });
  }
}
\`\`\`

**Key Concepts:**

1. **Namespace**: \`/notifications\` isolates notification traffic
2. **Rooms**: Each user joins \`user-{userId}\` room
3. **Multi-device**: Multiple sockets can be in same room
4. **JWT Auth**: Token verified on connection

## 3. NotificationsService

\`\`\`typescript
@Injectable()
export class NotificationsService {
  private gateway: NotificationsGateway;

  constructor(private prisma: PrismaService) {}

  setGateway(gateway: NotificationsGateway) {
    this.gateway = gateway;
  }

  async create(createNotificationDto: CreateNotificationDto) {
    const { recipientId, actorId, type, message, taskId, commentId, projectId } =
      createNotificationDto;

    // Don't notify users of their own actions
    if (recipientId === actorId) {
      return null;
    }

    // Create notification
    const notification = await this.prisma.notification.create({
      data: {
        type,
        message,
        recipientId,
        actorId,
        taskId,
        commentId,
        projectId,
      },
      include: {
        actor: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // Send via WebSocket
    if (this.gateway) {
      this.gateway.sendNotificationToUser(recipientId, notification);
      
      // Update unread count
      const unreadCount = await this.getUnreadCount(recipientId);
      this.gateway.updateUnreadCount(recipientId, unreadCount);
    }

    return notification;
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        recipientId: userId,
        readAt: null,
      },
    });
  }

  async markAsRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification || notification.recipientId !== userId) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async findAll(
    userId: string,
    filters: FilterNotificationsDto = {},
  ) {
    const where: any = { recipientId: userId };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.unreadOnly) {
      where.readAt = null;
    }

    const notifications = await this.prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: filters.skip || 0,
      take: filters.take || 20,
      include: {
        actor: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return { data: notifications };
  }
}
\`\`\`

## 4. Integration with Comments

\`\`\`typescript
// In CommentsService.create()

async create(createCommentDto: CreateCommentDto, user: User) {
  // ... create comment code ...

  // Notify mentioned users
  for (const mentionedUserId of mentionUserIds) {
    await this.notificationsService.create({
      type: NotificationType.COMMENT_MENTION,
      message: \`\${user.name} mentioned you in a comment\`,
      recipientId: mentionedUserId,
      actorId: user.id,
      commentId: comment.id,
      taskId: comment.taskId,
      projectId: comment.projectId,
    });
  }

  // Notify parent comment author (if reply)
  if (parentId) {
    const parent = await this.prisma.comment.findUnique({
      where: { id: parentId },
    });

    if (parent.authorId !== user.id) {
      await this.notificationsService.create({
        type: NotificationType.COMMENT_REPLY,
        message: \`\${user.name} replied to your comment\`,
        recipientId: parent.authorId,
        actorId: user.id,
        commentId: comment.id,
        taskId: comment.taskId,
        projectId: comment.projectId,
      });
    }
  }

  return comment;
}
\`\`\`

## 5. Integration with Tasks

\`\`\`typescript
// In TasksService.update()

async update(taskId: string, updateTaskDto: UpdateTaskDto, userId: string) {
  const task = await this.findOne(taskId, userId);

  // ... update logic ...

  // Notify assignee if changed
  if (updateTaskDto.assigneeId && updateTaskDto.assigneeId !== task.assigneeId) {
    await this.notificationsService.create({
      type: NotificationType.TASK_ASSIGNED,
      message: \`You were assigned to task "\${task.title}"\`,
      recipientId: updateTaskDto.assigneeId,
      actorId: userId,
      taskId: task.id,
    });
  }

  // Notify assignee of status change
  if (updateTaskDto.status && task.assigneeId && task.assigneeId !== userId) {
    await this.notificationsService.create({
      type: NotificationType.TASK_STATUS_CHANGED,
      message: \`Task "\${task.title}" status changed to \${updateTaskDto.status}\`,
      recipientId: task.assigneeId,
      actorId: userId,
      taskId: task.id,
    });
  }

  return updatedTask;
}
\`\`\`

## 6. Frontend Integration

\`\`\`typescript
import { io, Socket } from 'socket.io-client';

// Initialize connection
const token = localStorage.getItem('accessToken');

const socket = io('http://localhost:3000/notifications', {
  auth: { token },
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
});

// Connection events
socket.on('connect', () => {
  console.log('✅ Connected to notifications');
});

socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected:', reason);
});

// Receive notifications
socket.on('notification', (notification) => {
  console.log('📬 New notification:', notification);
  
  // Show toast
  toast.info(notification.message);
  
  // Update UI
  addNotificationToList(notification);
});

// Update badge
socket.on('unread_count', ({ unreadCount }) => {
  updateBadge(unreadCount);
});

// Mark as read
function markAsRead(notificationId: string) {
  socket.emit('mark_as_read', { notificationId });
}

// Get current unread count
function refreshUnreadCount() {
  socket.emit('get_unread_count');
}
\`\`\`

## 7. Complete Flow Example

**Alice mentions Bob in a comment:**

\`\`\`
T+0ms:    Alice submits comment: "Great work @bob!"
T+10ms:   CommentsService.create() executes
T+30ms:   Mention parser finds '@bob'
T+40ms:   Comment saved to database
T+60ms:   NotificationsService.create() called
T+80ms:   Notification saved to database
T+90ms:   Gateway.sendNotificationToUser(bob.id)
T+100ms:  Socket.io sends to room 'user-bob-456'
T+110ms:  Bob's browser receives 'notification' event
T+120ms:  Toast appears: "Alice mentioned you"
T+130ms:  Badge updates: 3 → 4
T+140ms:  Notification added to Bob's inbox

Total: 140ms (vs 5000ms average with polling)
\`\`\`

## Key Takeaways

1. **WebSockets**: Real-time, bi-directional communication
2. **Socket.io**: Production-ready library with reconnection
3. **JWT Auth**: Secure WebSocket connections
4. **User rooms**: Targeted notifications per user
5. **Multi-device**: Multiple connections supported
6. **Event-driven**: Service emits, gateway pushes

## What's Next?

In the final article, we'll implement file upload and attachments for tasks, comments, and projects with local storage and cloud-ready architecture.`,
    date: '2026-03-14',
    author: 'Attar',
    tags: ['NestJS', 'WebSockets', 'Socket.io', 'Real-time', 'Notifications'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '13 min read',
  },
  {
    id: 'nestjs-file-upload-attachments',
    title: 'File Upload & Attachments System in NestJS',
    description:
      'Build a production-ready file upload system with local storage, cloud-ready architecture, file validation, and organization-scoped access control.',
    content: `# File Upload & Attachments System in NestJS

## Introduction

File attachments are essential for collaboration. Let's build a production-grade file upload system that's local-storage first but cloud-ready.

## What We'll Build

- ✅ File upload with validation
- ✅ Local filesystem storage
- ✅ Storage abstraction layer (cloud-ready)
- ✅ Polymorphic attachments (Task, Comment, Project)
- ✅ Access control (organization-scoped)
- ✅ Soft delete strategy
- ✅ Download with proper content-type

## 1. Database Schema

\`\`\`prisma
model Attachment {
  id             String   @id @default(uuid())
  filename       String   // Original filename
  storedFilename String   // UUID-based filename on disk
  filepath       String   // Relative path
  mimeType       String
  size           Int      // Bytes
  
  uploaderId     String
  organizationId String
  
  // Polymorphic references
  taskId      String?
  commentId   String?
  projectId   String?
  
  deletedAt   DateTime?
  
  uploader     User         @relation(fields: [uploaderId])
  organization Organization @relation(fields: [organizationId])
  task         Task?        @relation(fields: [taskId])
  comment      Comment?     @relation(fields: [commentId])
  project      Project?     @relation(fields: [projectId])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([uploaderId])
  @@index([organizationId])
  @@index([taskId])
  @@map("attachments")
}
\`\`\`

## 2. Storage Abstraction Layer

**Why abstraction?**
- Start with local storage (zero dependencies)
- Migrate to S3/CloudFlare later with minimal code changes
- Single interface, multiple implementations

**Interface (storage.interface.ts):**

\`\`\`typescript
export interface IStorageService {
  uploadFile(file: Express.Multer.File, path: string): Promise<string>;
  getFile(filepath: string): Promise<Buffer>;
  deleteFile(filepath: string): Promise<void>;
  fileExists(filepath: string): Promise<boolean>;
}
\`\`\`

**Local Implementation (local-storage.service.ts):**

\`\`\`typescript
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly uploadDir = './uploads';

  async uploadFile(file: Express.Multer.File, filepath: string): Promise<string> {
    const fullPath = path.join(this.uploadDir, filepath);
    const dir = path.dirname(fullPath);

    // Ensure directory exists
    await fs.mkdir(dir, { recursive: true });

    // Write file
    await fs.writeFile(fullPath, file.buffer);

    return filepath;
  }

  async getFile(filepath: string): Promise<Buffer> {
    const fullPath = path.join(this.uploadDir, filepath);
    return await fs.readFile(fullPath);
  }

  async deleteFile(filepath: string): Promise<void> {
    const fullPath = path.join(this.uploadDir, filepath);
    await fs.unlink(fullPath);
  }

  async fileExists(filepath: string): Promise<boolean> {
    const fullPath = path.join(this.uploadDir, filepath);
    try {
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }
}
\`\`\`

## 3. File Validation

\`\`\`typescript
const ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
  
  // Archives
  'application/zip',
  'application/x-rar-compressed',
  'application/gzip',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

private validateFile(file: Express.Multer.File) {
  // Check size
  if (file.size > MAX_FILE_SIZE) {
    throw new BadRequestException(
      \`File too large. Max size is \${MAX_FILE_SIZE / 1024 / 1024}MB\`
    );
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new BadRequestException(
      \`File type not allowed: \${file.mimetype}\`
    );
  }

  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.docx', '.xlsx', '.txt', '.zip'];
  
  if (!allowedExts.includes(ext)) {
    throw new BadRequestException(\`File extension not allowed: \${ext}\`);
  }
}
\`\`\`

## 4. Upload File

\`\`\`typescript
async uploadFile(
  file: Express.Multer.File,
  uploadDto: UploadFileDto,
  uploaderId: string,
) {
  // Validate file
  this.validateFile(file);

  // Verify organization membership
  const membership = await this.prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: uploaderId,
        organizationId: uploadDto.organizationId,
      },
    },
  });

  if (!membership) {
    throw new ForbiddenException('You are not a member of this organization');
  }

  // Verify entity exists and belongs to organization
  await this.verifyEntityOwnership(uploadDto);

  // Generate storage path
  const ext = path.extname(file.originalname);
  const storedFilename = \`\${uuidv4()}\${ext}\`;
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  const filepath = \`\${uploadDto.organizationId}/\${year}/\${month}/\${uploadDto.entityType.toLowerCase()}/\${storedFilename}\`;

  // Upload to storage
  await this.storageService.uploadFile(file, filepath);

  // Create database record
  const attachment = await this.prisma.attachment.create({
    data: {
      filename: file.originalname,
      storedFilename,
      filepath,
      mimeType: file.mimetype,
      size: file.size,
      uploaderId,
      organizationId: uploadDto.organizationId,
      taskId: uploadDto.entityType === 'TASK' ? uploadDto.entityId : null,
      commentId: uploadDto.entityType === 'COMMENT' ? uploadDto.entityId : null,
      projectId: uploadDto.entityType === 'PROJECT' ? uploadDto.entityId : null,
    },
    include: {
      uploader: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return attachment;
}
\`\`\`

## 5. Download File

\`\`\`typescript
async downloadFile(id: string, userId: string) {
  const attachment = await this.prisma.attachment.findUnique({
    where: { id },
  });

  if (!attachment || attachment.deletedAt) {
    throw new NotFoundException('Attachment not found');
  }

  // Verify access (organization membership)
  const membership = await this.prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId: attachment.organizationId,
      },
    },
  });

  if (!membership) {
    throw new ForbiddenException('Access denied');
  }

  // Get file from storage
  const fileBuffer = await this.storageService.getFile(attachment.filepath);

  return {
    buffer: fileBuffer,
    filename: attachment.filename,
    mimeType: attachment.mimeType,
  };
}
\`\`\`

## 6. Controller with Multer

\`\`\`typescript
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadFileDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.filesService.uploadFile(file, uploadDto, userId);
  }

  @Get(':id')
  async getAttachment(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.filesService.getAttachment(id, userId);
  }

  @Get(':id/download')
  async downloadFile(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { buffer, filename, mimeType } = await this.filesService.downloadFile(
      id,
      userId,
    );

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': \`attachment; filename="\${filename}"\`,
    });

    return new StreamableFile(buffer);
  }

  @Delete(':id')
  async deleteAttachment(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.filesService.deleteAttachment(id, userId);
  }
}
\`\`\`

## 7. Frontend Upload Example

\`\`\`typescript
async function uploadFile(
  file: File,
  entityType: 'TASK' | 'COMMENT' | 'PROJECT',
  entityId: string,
  organizationId: string,
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('entityType', entityType);
  formData.append('entityId', entityId);
  formData.append('organizationId', organizationId);

  const response = await fetch('http://localhost:3000/api/v1/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
    },
    body: formData,
  });

  const attachment = await response.json();
  return attachment;
}

// Usage
const file = document.querySelector('input[type="file"]').files[0];
const attachment = await uploadFile(file, 'TASK', taskId, orgId);

console.log('Uploaded:', attachment);
// {
//   id: '...',
//   filename: 'document.pdf',
//   size: 1234567,
//   downloadUrl: '/api/v1/files/xxx/download'
// }
\`\`\`

## 8. Migration to Cloud Storage

**When you're ready for S3:**

\`\`\`typescript
// Create s3-storage.service.ts
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3StorageService implements IStorageService {
  private s3: S3Client;
  private bucket = 'my-app-uploads';

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: path,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
    return path;
  }

  async getFile(filepath: string): Promise<Buffer> {
    const response = await this.s3.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: filepath,
      })
    );
    return Buffer.from(await response.Body.transformToByteArray());
  }

  // ... other methods
}

// In files.module.ts, swap providers:
providers: [
  FilesService,
  S3StorageService,  // <- Change from LocalStorageService
]
\`\`\`

## Security Measures

1. **File Type Whitelist**: Only allowed MIME types
2. **Size Limits**: 10MB max (configurable)
3. **Double Validation**: MIME type + extension
4. **UUID Filenames**: Prevent guessing/collisions
5. **Organization Scoping**: Access control per org
6. **Soft Delete**: Recovery window before hard delete

## Key Takeaways

1. **Storage abstraction**: Easy cloud migration
2. **Local-first**: Zero dependencies for development
3. **Polymorphic attachments**: Tasks, comments, projects
4. **Validation**: MIME type, extension, size
5. **Organization-scoped**: Multi-tenant access control
6. **Soft delete**: Recovery and audit trail

## Wrapping Up

We've built a complete enterprise workflow engine with:
- Authentication & authorization
- Multi-tenancy with organizations
- Projects and tasks management
- Commenting with threading
- Real-time notifications
- File attachments

**Check out the full code:** [enterprise-workflow-engine](https://github.com/Attar74/enterprise-workflow-engine)`,
    date: '2026-03-25',
    author: 'Attar',
    tags: ['NestJS', 'File Upload', 'Storage', 'Multer', 'S3'],
    imageUrl: '/images/workflow-engine.png',
    readTime: '14 min read',
  },
];

export default blogs;
