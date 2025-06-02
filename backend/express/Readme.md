# Node.js Express Server Setup Guide

## Prerequisites

- Node.js (v18.x or higher recommended)
- npm or yarn package manager
- Basic understanding of TypeScript and Express.js

## Project Initialization

### 1. Create Project Structure

```bash
mkdir your-project-name
cd your-project-name
npm init -y
```

### 2. Install Production Dependencies

```bash
npm install express body-parser cors dotenv helmet morgan jsonwebtoken multer uuid axios
```

### 3. Install AWS SDK (Optional)

If integrating with AWS services:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
```

### 4. Install Development Dependencies

```bash
npm install -D rimraf concurrently nodemon shx ts-node typescript @types/cors @types/morgan @types/node @types/jsonwebtoken @types/multer @types/uuid
```

### 5. Initialize TypeScript Configuration

```bash
npx tsc --init
```

## Dependencies Reference

### Production Dependencies

| Package      | Version | Purpose                                       | Documentation                                                                |
| ------------ | ------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| express      | ^4.18.x | Fast, unopinionated web framework for Node.js | [npmjs.com/package/express](https://www.npmjs.com/package/express)           |
| body-parser  | ^1.20.x | Parse incoming request bodies in middleware   | [npmjs.com/package/body-parser](https://www.npmjs.com/package/body-parser)   |
| cors         | ^2.8.x  | Enable Cross-Origin Resource Sharing (CORS)   | [npmjs.com/package/cors](https://www.npmjs.com/package/cors)                 |
| dotenv       | ^16.3.x | Load environment variables from .env file     | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)             |
| helmet       | ^7.1.x  | Secure Express apps by setting HTTP headers   | [npmjs.com/package/helmet](https://www.npmjs.com/package/helmet)             |
| morgan       | ^1.10.x | HTTP request logger middleware                | [npmjs.com/package/morgan](https://www.npmjs.com/package/morgan)             |
| jsonwebtoken | ^9.0.x  | JSON Web Token implementation                 | [npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| multer       | ^1.4.x  | Middleware for handling multipart/form-data   | [npmjs.com/package/multer](https://www.npmjs.com/package/multer)             |
| uuid         | ^9.0.x  | Generate RFC-compliant UUIDs                  | [npmjs.com/package/uuid](https://www.npmjs.com/package/uuid)                 |
| axios        | ^1.6.x  | Promise-based HTTP client                     | [npmjs.com/package/axios](https://www.npmjs.com/package/axios)               |

### AWS SDK Dependencies (Optional)

| Package              | Version | Purpose                      | Documentation                                                                                |
| -------------------- | ------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| @aws-sdk/client-s3   | ^3.x    | AWS SDK v3 S3 client         | [npmjs.com/package/@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3)     |
| @aws-sdk/lib-storage | ^3.x    | AWS SDK v3 storage utilities | [npmjs.com/package/@aws-sdk/lib-storage](https://www.npmjs.com/package/@aws-sdk/lib-storage) |

### Development Dependencies

| Package      | Version | Purpose                                           | Documentation                                                                |
| ------------ | ------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| typescript   | ^5.2.x  | TypeScript compiler and language support          | [npmjs.com/package/typescript](https://www.npmjs.com/package/typescript)     |
| ts-node      | ^10.9.x | TypeScript execution environment for Node.js      | [npmjs.com/package/ts-node](https://www.npmjs.com/package/ts-node)           |
| nodemon      | ^3.0.x  | Automatically restart application on file changes | [npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)           |
| concurrently | ^8.2.x  | Run multiple commands concurrently                | [npmjs.com/package/concurrently](https://www.npmjs.com/package/concurrently) |
| rimraf       | ^5.0.x  | Cross-platform rm -rf utility                     | [npmjs.com/package/rimraf](https://www.npmjs.com/package/rimraf)             |
| shx          | ^0.3.x  | Portable shell commands for npm scripts           | [npmjs.com/package/shx](https://www.npmjs.com/package/shx)                   |

### TypeScript Type Definitions

| Package             | Version | Purpose                           | Documentation                                                                              |
| ------------------- | ------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| @types/node         | ^20.x   | Type definitions for Node.js      | [npmjs.com/package/@types/node](https://www.npmjs.com/package/@types/node)                 |
| @types/cors         | ^2.8.x  | Type definitions for cors         | [npmjs.com/package/@types/cors](https://www.npmjs.com/package/@types/cors)                 |
| @types/morgan       | ^1.9.x  | Type definitions for morgan       | [npmjs.com/package/@types/morgan](https://www.npmjs.com/package/@types/morgan)             |
| @types/jsonwebtoken | ^9.0.x  | Type definitions for jsonwebtoken | [npmjs.com/package/@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken) |
| @types/multer       | ^1.4.x  | Type definitions for multer       | [npmjs.com/package/@types/multer](https://www.npmjs.com/package/@types/multer)             |
| @types/uuid         | ^9.0.x  | Type definitions for uuid         | [npmjs.com/package/@types/uuid](https://www.npmjs.com/package/@types/uuid)                 |

## TypeScript Configuration

After running `npx tsc --init`, modify the generated `tsconfig.json` with recommended settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "rimraf dist && npx tsc",
    "start": "npm run build && node dist/index.js",
    "dev": "npm run build && concurrently \"npx tsc -w \" \"nodemon --exec ts-node src/index.ts\" ",
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Project Structure

```
project-root/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── index.ts
├── dist/
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

## Environment Variables

Create a `.env` file in your project root:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-secret-key
DATABASE_URL=your-database-url
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
```

## Next Steps

1. Create your main server file (`src/index.ts`)
2. Set up middleware configuration
3. Define routes and controllers
4. Implement error handling
5. Configure database connections
6. Add authentication and authorization
7. Set up logging and monitoring

## Security Considerations

- Always use `helmet` for security headers
- Implement proper CORS policies
- Use environment variables for sensitive data
- Validate and sanitize all inputs
- Implement rate limiting
- Use HTTPS in production
